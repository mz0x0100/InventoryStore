import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import { ProductType } from "../routes/layouts/Products";
import { useCategoriesApiCalls } from "../utils/apicalls/categories";
import { useSuppliersApiCalls } from "../utils/apicalls/supplier";

const ProductForm: React.FC<{
  item?: ProductType;
  action: "add" | "update";
  onSave: (item: ProductType, action: "add" | "update") => void;
  onCancel: () => void;
}> = (props) => {
  const categoriesApi = useCategoriesApiCalls();
  const suppliersApi = useSuppliersApiCalls();

  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProductType | undefined>(props.item);

  useEffect(() => {
    if (!itemsLoaded) {
      categoriesApi.loadItems(setCategories);
      suppliersApi.loadItems(setSuppliers);
      setItemsLoaded(true);
    }
  });

  useEffect(() => {
    setFormData(props.item);
  }, [props.item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const fields = [
    { label: "Name:", name: "name", type: "text" },
    {
      label: "Category",
      name: "category",
      type: "select",
      options: categories.map((category) => ({
        value: category.name,
        label: category.name,
      })),
    },
    { label: "Quantity:", name: "quantity", type: "number" },
    {
      label: "Supplier:",
      name: "supplier",
      type: "select",
      options: suppliers.map((supplier) => ({
        value: supplier.name,
        label: supplier.name,
      })),
    },
    { label: "Price", name: "price", type: "number" },
    { label: "Purchase date:", name: "purchase_date", type: "date" },
    { label: "Location", name: "location", type: "text" },
    { label: "Min stock level", name: "min_stock_level", type: "number" },
    { label: "Usage:", name: "usage", type: "text" },
  ];

  return (
    <ItemForm
      item={formData}
      action={props.action}
      onSave={props.onSave}
      onCancel={props.onCancel}
      fields={fields}
    />
  );
};

export default ProductForm;
