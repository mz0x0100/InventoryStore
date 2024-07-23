import React from "react";
import { ProfileItem, StaffItemProps } from "../StaffUserData";
import { Text } from "../../../components/Text";
import InputForm from "../../../components/form/InputForm";

const StaffBankDatails: React.FC<StaffItemProps> = ({
  getState,
  handleChange,
}) => {
  return (
    <>
      <ProfileItem>
        <Text>Bank name:</Text>
        <InputForm
          type="text"
          defaultValue={getState("bank")}
          onChange={(e) => handleChange("bank", e.target.value)}
          placeholder="Bank name"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Account number:</Text>
        <InputForm
          type="number"
          defaultValue={getState("account_number")}
          onChange={(e) => handleChange("account_number", e.target.value)}
          placeholder="Account number"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>BVN</Text>
        <InputForm
          type="number"
          defaultValue={getState("bvn")}
          placeholder="BVK"
          onChange={(e) => handleChange("bvn", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>NIN:</Text>
        <InputForm
          type="number"
          defaultValue={getState("nin")}
          placeholder="NIN"
          onChange={(e) => handleChange("nin", e.target.value)}
        />
      </ProfileItem>
    </>
  );
};

export default StaffBankDatails;
