import { FormMetaDataType } from "../FormUtils";
import useAxiosApiCall from "../axios_instance";

export const useLoadTemplateList = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadTemplatesList = async (
    setResponseData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      await axiosApiCall
        .get("forms/templates_list")
        .then((response) => {
          setResponseData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return loadTemplatesList;
};

export const useUpdateApiFormTemplate = () => {
  const axiosApiCall = useAxiosApiCall();

  const updateApiFormTemplate = async (data: any) => {
    try {
      await axiosApiCall({
        url: "forms/update_template",
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return updateApiFormTemplate;
};

export const useLoadApiFormTemplate = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadApiFormTemplate = async (
    form_id: string,
    setLoadedFormTemplate: (data: any) => void,
    setFormMetaData: (v: FormMetaDataType) => void
  ) => {
    try {
      await axiosApiCall({
        url: "forms/load_template",
        method: "POST",
        data: JSON.stringify({ form_id: form_id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const data = response.data;
          setLoadedFormTemplate(data.payload);
          setFormMetaData({
            templateName: data.template_name,
            formTitle: data.title,
            formDescription: data.description,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return loadApiFormTemplate;
};

export const useCreateFormRecord = () => {
  const axiosApiCall = useAxiosApiCall();

  const createFormRecord = async (
    formId: string,
    setFormToken: (v: string) => void
  ) => {
    try {
      await axiosApiCall({
        url: "/forms/create_record",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          form_id: formId,
        },
      }).then((response) => {
        console.log(response.data);
        setFormToken(response.data.token);
      });
    } catch (error) {
      console.log("Error in createFormRecord: " + error);
    }
  };

  return createFormRecord;
};

export const useAddRecord = () => {
  const axiosApiCall = useAxiosApiCall();

  const addRecord = async (data: any, setResponseData: (v: string) => void) => {
    try {
      await axiosApiCall({
        url: "/forms/new_record",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }).then((response) => setResponseData(response.data));
    } catch (error) {
      console.log("Error in addRecord " + error);
    }
  };

  return addRecord;
};

export const useCreateApiForm = () => {
  const axiosApiCall = useAxiosApiCall();

  const createApiForm = async (
    setFormId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      await axiosApiCall
        .get("forms/new_template")
        .then((response) => {
          setFormId(response.data.form_id);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return createApiForm;
};
