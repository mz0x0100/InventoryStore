import useAxiosApiCall from "../axios_instance";

export const useLoadSchools = () => {
  const axiosApiCall = useAxiosApiCall();

  const loadSchools = async (setResponseData: (res: any) => void) => {
    try {
      await axiosApiCall({
        url: "/schools/load_schools",
        method: "GET",
      }).then((response) => {
        setResponseData(response.data.schools);
      });
    } catch (error) {
      console.log("Error in loadSchools " + error);
    }
  };

  return loadSchools;
};


export const useLoadSchool = () => {

  const axiosApiCall = useAxiosApiCall();

  const loadSchool = async (data: any, setResponseData: (res: any) => void) => {
    try {
      await axiosApiCall({
        url: "/schools/load_school",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      }).then((response) => {
        setResponseData(response.data);
      });
    } catch (error) {
      console.log("Error in loadSchool " + error);
    }
  };

  return loadSchool;
}

export const useLoadSchoolsStats = () => {

  const axiosApiCall = useAxiosApiCall();

  const loadSchoolsStats = async (lgas: Array<string>, setResponseData: (res: any) => void) => {
    try {
      await axiosApiCall({
        url: "/schools/stats",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({lgas: lgas})
      }).then((response) => {
        setResponseData(response.data.results);
      });
    } catch (error) {
      console.log("Error in loadSchoolsStats " + error);
    }
  };

  return loadSchoolsStats;
}