// src/components/SupplierManager.tsx
import React from "react";
import ItemManager from "./ItemManager";
import { useSuppliersApiCalls } from "../../utils/apicalls/supplier";
import SupplierForm from "../../components/SupplierForm";

export type SupplierType = {
  id: number;
  name: string;
  contact_info: string;
};
const Suppliers: React.FC = () => {
  return (
    <ItemManager
      itemType="Supplier"
      columns={["Id", "Name", "Contact Info"]}
      useApiCalls={useSuppliersApiCalls}
      FormComponent={SupplierForm}
    />
  );
};

export default Suppliers;
