import React from "react";
import ItemManager from "./ItemManager";
import { useProductsApiCalls } from "../../utils/apicalls/products";
import ProductForm from "../../components/ProductForm";

export type ProductType = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  supplier: string;
  price: number;
  purchase_date: string;
  location: string;
  min_stock_level: number;
  last_updated: string;
  usage: string;
  selected?: boolean;
};
const Products: React.FC = () => {
  const columns = [
    "Id",
    "Name",
    "Category",
    "Quantity",
    "Supplier",
    "Price",
    "Purchase Date",
    "Location",
    "Min Stock Level",
    "Last updated",
    "Usage",
  ];

  return (
    <ItemManager
      itemType="Products"
      columns={columns}
      useApiCalls={useProductsApiCalls}
      FormComponent={ProductForm}
    />
  );
};

export default Products;
