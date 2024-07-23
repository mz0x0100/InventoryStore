import React from "react";
import ItemForm from "./ItemForm";
import { SupplierType } from "../routes/layouts/Suppliers";

const SupplierForm: React.FC<{
  item?: SupplierType;
  action: "add" | "update";
  onSave: (item: SupplierType, action: "add" | "update") => void;
  onCancel: () => void;
}> = (props) => {
  const fields = [
    { label: "Name:", name: "name", type: "text" },
    { label: "Contact", name: "contact_info", type: "text" },
  ];

  return <ItemForm {...props} fields={fields} />;
};

export default SupplierForm;
