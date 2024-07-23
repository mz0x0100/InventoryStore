import React from "react";
import { ProfileItem, StaffItemProps } from "../StaffUserData";
import { Text } from "../../../components/Text";
import InputForm from "../../../components/form/InputForm";
import Select from "../../../components/form/Select";
import { lgaList } from "../../layouts/StaffsData";

const StaffContactInfo: React.FC<StaffItemProps> = ({
  handleChange,
  getState,
}) => {
  return (
    <>
      <ProfileItem>
        <Text>GSM:</Text>
        <InputForm
          type="text"
          defaultValue={getState("gsm")}
          placeholder="Mobile number"
          onChange={(e) => handleChange("gsm", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Email address:</Text>
        <InputForm
          type="email"
          defaultValue={getState("email")}
          placeholder="Email address"
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>State of origin:</Text>
        <InputForm
          type="text"
          defaultValue={getState("state_of_origin")}
          placeholder="State of origin"
          onChange={(e) => handleChange("state_of_origin", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Hometown:</Text>
        <InputForm
          type="text"
          defaultValue={getState("hometown")}
          placeholder="Hometown"
          onChange={(e) => handleChange("hometown", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>LGA:</Text>
        <Select
          defaultValue={getState("lga")}
          onChange={(e) => handleChange("lga", e.target.value)}
        >
          {lgaList.map((lga, key) => (
            <option key={key} value={lga.name.toUpperCase()}>
              {lga.name.toUpperCase()}
            </option>
          ))}
        </Select>
      </ProfileItem>
      <ProfileItem>
        <Text>Address:</Text>
        <InputForm
          type="text"
          defaultValue={getState("address")}
          placeholder="Address"
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </ProfileItem>
    </>
  );
};

export default StaffContactInfo;
