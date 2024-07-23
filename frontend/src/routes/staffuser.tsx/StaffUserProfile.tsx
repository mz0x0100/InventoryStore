import React, { useEffect, useState } from "react";
import StaffUserLayout from "./StaffUserLayout";
import StaffUserData from "./StaffUserData";
import Staff, { StaffDataType } from "../../components/Staff";
import { useLoadStaffDashboard } from "../../utils/apicalls/staffs";
import { LoaderRegular } from "../../components/Loader";

const StaffUserProfile: React.FC = () => {
  const [staffData, setStaffData] = useState<StaffDataType>();
  const [loadedStaffData, setLoadedStaffData] = useState<any>();
  const loadStaffDashboard = useLoadStaffDashboard();

  useEffect(() => {
    if (loadedStaffData) {
      setStaffData(loadedStaffData);
      console.log(loadedStaffData);
    } else {
      loadStaffDashboard(setLoadedStaffData);
    }
  }, [loadedStaffData]);
  return (
    <StaffUserLayout active="profile">
      {loadedStaffData ? (
        <div className="p-4 md:p-6 xl:p-8">
          {staffData && <StaffUserData staff={staffData as StaffDataType} />}
        </div>
      ) : (
        <LoaderRegular text="Fetching data..." />
      )}
    </StaffUserLayout>
  );
};

export default StaffUserProfile;
