import React from "react";
import { ProfileItem, StaffItemProps } from "../StaffUserData";
import { Text } from "../../../components/Text";
import InputForm from "../../../components/form/InputForm";

const StaffNextOfKin: React.FC<StaffItemProps> = ({
  getState,
  handleChange,
}) => {
  return (
    <>
      <ProfileItem>
        <Text>Kin name:</Text>
        <InputForm
          type="text"
          defaultValue={getState("next_of_kin")}
          onChange={(e) => handleChange("next_of_kin", e.target.value)}
          placeholder="Kin name"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Relationship:</Text>
        <InputForm
          type="text"
          defaultValue={getState("relationship")}
          onChange={(e) => handleChange("relationship", e.target.value)}
          placeholder="Relationship"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Kin GSM:</Text>
        <InputForm
          type="number"
          defaultValue={getState("kin_gsm")}
          onChange={(e) => handleChange("kin_gsm", e.target.value)}
          placeholder="Kin GSM"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Kin address:</Text>
        <InputForm
          type="text"
          defaultValue={getState("kin_address")}
          onChange={(e) => handleChange("kin_address", e.target.value)}
          placeholder="Kin address"
        />
      </ProfileItem>
    </>
  );
};

export default StaffNextOfKin;
