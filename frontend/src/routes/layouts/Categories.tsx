// src/routes/layouts/Categories.tsx
import React from "react";
import ItemManager from "./ItemManager";
import { useCategoriesApiCalls } from "../../utils/apicalls/categories";
import CategoryForm from "../../components/CategoryForm";

export type CategoryType = {
  id: number;
  name: string;
  description: string;
};
const Categories: React.FC = () => {
  const columns = ["Id", "Name", "Description"];

  return (
    <ItemManager
      itemType="Categories"
      columns={columns}
      useApiCalls={useCategoriesApiCalls}
      FormComponent={CategoryForm}
    />
  );
};

export default Categories;
