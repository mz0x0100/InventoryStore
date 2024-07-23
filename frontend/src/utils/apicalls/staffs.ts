import useAxiosApiCall from "../axios_instance";

export const useLoadStaffs = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadStaffs = async (
  setResponseData: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    await axiosApiCall.get("staffs/get_staffs")
      .then((response) => {
        setResponseData(response.data.staffs);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

return loadStaffs;
};

export const useLoadStaff = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadStaff = async (
    id: number,
    setResponseData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      await axiosApiCall({
        url: "staffs/get_staff",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ id: id }),
      })
        .then((response) => response.data)
        .then((data) => {
          setResponseData(data.staff);
          console.log(data.staff);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return loadStaff;
};

export const useLoadStaffDashboard = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadStaffDashboard = async (
    setResponseData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      await axiosApiCall({
        url: "staff/dashboard"
      })
        .then((response) => response.data)
        .then((data) => {
          setResponseData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return loadStaffDashboard;
};

