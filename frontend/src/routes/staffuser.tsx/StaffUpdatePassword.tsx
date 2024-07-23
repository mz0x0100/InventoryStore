import React from "react";
import StaffUserLayout from "./StaffUserLayout";
import StaffUpdatePasswordLayout from "./StaffUpdatePasswordLayout";

const StaffUpdatePassword: React.FC = () => {
  return (
    <StaffUserLayout active="profile">
      <StaffUpdatePasswordLayout />
    </StaffUserLayout>
  );
};

export default StaffUpdatePassword;
