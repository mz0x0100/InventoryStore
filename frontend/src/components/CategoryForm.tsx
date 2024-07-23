import React from "react";
import ItemForm from "./ItemForm";
import { CategoryType } from "../routes/layouts/Categories";

const CategoryForm: React.FC<{
  item?: CategoryType;
  action: "add" | "update";
  onSave: (item: CategoryType, action: "add" | "update") => void;
  onCancel: () => void;
}> = (props) => {
  const fields = [
    { label: "Name:", name: "name", type: "text" },
    { label: "Description", name: "description", type: "text" },
  ];

  return <ItemForm {...props} fields={fields} />;
};

export default CategoryForm;
