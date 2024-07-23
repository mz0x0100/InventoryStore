import { SupplierType } from "../../routes/layouts/Suppliers";
import useAxiosApiCall from "../axios_instance";

export const useSuppliersApiCalls = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadSuppliers = async (
    setResponseData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      const response = await axiosApiCall.get("suppliers/list");
      setResponseData(response.data.suppliers);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSupplier = async (
    supplier: SupplierType,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "suppliers/update",
        method: "POST",
        data: JSON.stringify(supplier),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFeedback(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const addSupplier = async (
    supplier: SupplierType,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "suppliers/new",
        method: "POST",
        data: JSON.stringify(supplier),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFeedback(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSupplier = async (
    supplierId: number,
    setFeedback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const response = await axiosApiCall({
        url: "suppliers/delete",
        method: "DELETE",
        data: JSON.stringify({ id: supplierId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFeedback(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return { loadItems: loadSuppliers, addItem: addSupplier, updateItem: updateSupplier, deleteItem: deleteSupplier };
};
