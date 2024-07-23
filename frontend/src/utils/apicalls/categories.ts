import React from "react";
import useAxiosApiCall from "../axios_instance";
import { CategoryType } from "../../routes/layouts/Categories";


export const useCategoriesApiCalls = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadCategories = async (
    setResponseData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      const response = await axiosApiCall.get("categories/list");
      console.log(response.data.categories);
      setResponseData(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (
    category: CategoryType,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "categories/update",
        method: "POST",
        data: JSON.stringify(category),
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

  const addCategory = async (
    category: CategoryType,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "categories/new",
        method: "POST",
        data: JSON.stringify(category),
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

  const deleteCategory = async (
    categoryId: number,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "categories/delete",
        method: "DELETE",
        data: JSON.stringify({ id: categoryId }),
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

  return { loadItems: loadCategories, addItem: addCategory, updateItem: updateCategory, deleteItem: deleteCategory };
};
