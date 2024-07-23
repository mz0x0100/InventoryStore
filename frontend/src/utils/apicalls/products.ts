import React from "react";
import useAxiosApiCall from "../axios_instance";
import { ProductType } from "../../routes/layouts/Products";


export const useProductsApiCalls = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadProducts = async (
    setResponseData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      const response = await axiosApiCall.get("products/list");
      console.log(response.data.products);
      setResponseData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (
    product: ProductType,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "products/update",
        method: "POST",
        data: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.msg);
      setFeedback(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (
    product: ProductType,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "products/new",
        method: "POST",
        data: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.msg);
      setFeedback(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (
    productId: number,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "products/delete",
        method: "DELETE",
        data: JSON.stringify({ product_id: productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.msg);
      setFeedback(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return { loadItems: loadProducts, addItem: addProduct, updateItem: updateProduct, deleteItem: deleteProduct };
};
