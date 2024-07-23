// src/components/ItemManager.tsx
import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import TableHeader from "../../components/TableHeader";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";
import Icon from "../../components/Icon";
import Modal from "../../components/Modal";
import { PopupConfirmation } from "../../components/Popup";
import { PopupTimer } from "../../components/Popups";

interface ItemManagerProps<T> {
  itemType: string;
  columns: string[];
  useApiCalls: () => any;
  FormComponent: React.FC<{
    item?: T;
    action: "add" | "update";
    onSave: (item: T, action: "add" | "update") => void;
    onCancel: () => void;
  }>;
}

const ItemManager = <T,>({
  itemType,
  columns,
  useApiCalls,
  FormComponent,
}: ItemManagerProps<T>) => {
  const { loadItems, addItem, updateItem, deleteItem } = useApiCalls();
  const [items, setItems] = useState<T[]>();
  const [selectedItem, setSelectedItem] = useState<T>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [addItemFeedback, setAddItemFeedback] = useState<string | null>(null);
  const [deleteItemFeedback, setDeleteItemFeedback] = useState<string | null>(
    null
  );

  const handleItemClick = (item: T) => {
    const updatedItems = items?.map((itm) =>
      (itm as any).id === (item as any).id
        ? { ...itm, selected: !(itm as any).selected }
        : { ...itm, selected: false }
    );
    if (!(item as any).selected) setSelectedItem(item);
    else setSelectedItem(undefined);
    setItems(updatedItems);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveItem = (item: T, action: "add" | "update") => {
    if (action === "add") {
      console.log(item);
      addItem(
        item,
        setAddItemFeedback as React.Dispatch<React.SetStateAction<string>>
      );
    } else {
      updateItem(
        item,
        setAddItemFeedback as React.Dispatch<React.SetStateAction<string>>
      );
    }
  };

  const [itemForm, setItemForm] = useState<React.ReactNode>();
  const handleAddItem = () => {
    setModalTitle(`Add ${itemType}`);
    setIsModalOpen(true);
    setItemForm(
      <FormComponent
        action="add"
        onSave={handleSaveItem}
        onCancel={handleCloseModal}
      />
    );
  };

  const handleUpdateItem = () => {
    if (selectedItem != undefined) {
      setModalTitle(`Update ${itemType}`);
      setIsModalOpen(true);
      setItemForm(
        <FormComponent
          action="update"
          onSave={handleSaveItem}
          onCancel={handleCloseModal}
          item={selectedItem}
        />
      );
    }
  };

  const handleDelete = () => {
    if (selectedItem != undefined) {
      setShowConfirmation(true);
    }
  };

  useEffect(() => {
    // Load items when component mounts or when items are cleared
    if (!items) {
      loadItems(setItems);
    }
  }, [items]);

  useEffect(() => {
    if (feedback) {
      setShowFeedback(true);
    }
    // Reset feedback after display
    const timer = setTimeout(() => {
      setShowFeedback(false);
      setFeedback(null); // Clear feedback state
    }, 5000); // Show feedback for 5 seconds

    return () => clearTimeout(timer); // Clean up timer on component unmount or feedback change
  }, [feedback]);

  useEffect(() => {
    if (addItemFeedback || deleteItemFeedback) {
      setFeedback(addItemFeedback || deleteItemFeedback);
      setIsModalOpen(false);
      setAddItemFeedback(null); // Reset addItem feedback state
      setDeleteItemFeedback(null); // Reset deleteItem feedback state
      loadItems(setItems); // Reload items after adding or deleting
    }
  }, [addItemFeedback, deleteItemFeedback]);

  return (
    <div>
      {showConfirmation && (
        <PopupConfirmation
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            deleteItem(
              (selectedItem as any).id as number,
              setDeleteItemFeedback as React.Dispatch<
                React.SetStateAction<string>
              >
            );
            setShowConfirmation(false);
          }}
          message="Confirm operation"
          confirmText="Delete"
        />
      )}
      {showFeedback && (
        <PopupTimer
          timeout={5}
          onTimeout={() => setShowFeedback(false)}
          location="top"
          className="bg-green-200 p-2 rounded-md z-index-10"
        >
          {feedback}
        </PopupTimer>
      )}
      <Modal isOpen={isModalOpen} title={modalTitle} onClose={handleCloseModal}>
        {itemForm}
      </Modal>
      <div className="sticky h-[70px] shadow bg-transparent mb-8">
        <h1 className="text-[30px] px-4 py-4 font-weight-800 text-gray-500">
          Manage {itemType}
        </h1>
      </div>
      <div className="relative mb-6 h-[20px]">
        <div className="absolute inline right-6">
          <Icon
            className="fa-refresh ml-1 text-gray-800"
            title="Refresh"
            onClick={() => loadItems(setItems)}
          />
          <Icon
            className="fa-plus ml-1 text-green-400"
            title={`Add ${itemType}`}
            onClick={handleAddItem}
          />
          <Icon
            className="fa-edit ml-1 text-orange-400"
            title={`Edit ${itemType}`}
            onClick={handleUpdateItem}
          />
          <Icon
            className="fa-trash ml-1 text-red-400"
            title={`Delete ${itemType}`}
            onClick={handleDelete}
          />
        </div>
      </div>

      <div className="p-4 max-w-full overflow-x-auto">
        <Table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <TableHeader key={index}>{col}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <TableRow
                key={index}
                className={`${(item as any).selected && "bg-gray-100"}`}
                onClick={() => handleItemClick(item)}
              >
                {columns.map((col, colIndex) => (
                  <TableData key={colIndex}>
                    {(item as any)[col.toLowerCase().replace(" ", "_")]}
                  </TableData>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ItemManager;
