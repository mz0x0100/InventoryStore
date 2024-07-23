import { useEffect, useState } from "react";
import { Text } from "../../../components/Text";
import InputForm from "../../../components/form/InputForm";
import Select from "../../../components/form/Select";
import { ProfileItem, StaffItemProps } from "../StaffUserData";
import { dateExportApiFormat, dateImportApiFormat } from "../../../utils/utils";

const StaffBioData: React.FC<StaffItemProps> = ({ handleChange, getState }) => {
  const [dob, setDob] = useState("");

  useEffect(() => {
    console.log(getState("religion"));
    setDob(dateImportApiFormat(getState("dob")));
  }, []);
  return (
    <>
      <ProfileItem>
        <Text>Full name:</Text>
        <InputForm
          type="text"
          defaultValue={getState("full_name")}
          placeholder="Full name"
          onChange={(e) => handleChange("full_name", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>DOB:</Text>
        <InputForm
          type="date"
          defaultValue={dob}
          placeholder="DOB"
          onChange={(e) => {
            const nDate = e.target.value;
            handleChange("dob", dateExportApiFormat(nDate));
          }}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Gender:</Text>
        <Select
          defaultValue={getState("gender").toUpperCase()}
          className="w-full p-4 rounded-md"
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value={"MALE"}>MALE</option>
          <option value={"FEMALE"}>FEMALE</option>
        </Select>
      </ProfileItem>
      <ProfileItem>
        <Text>Religion:</Text>
        <Select
          defaultValue={getState("religion").toUpperCase()}
          className="w-full p-4 rounded-md"
          onChange={(e) => handleChange("religion", e.target.value)}
        >
          <option value={"ISLAM"}>ISLAM</option>
          <option value={"CHRISTIANITY"}>CHRISTIANITY</option>
          <option value={"OTHER"}>OTHER</option>
        </Select>
      </ProfileItem>
      <ProfileItem>
        <Text>Marital Status:</Text>
        <Select
          value={getState("marital_status").toUpperCase()}
          className="w-full p-4 rounded-md"
          onChange={(e) => handleChange("marital_status", e.target.value)}
        >
          <option value={"SINGLE"}>SINGLE</option>
          <option value={"MARRIED"}>MARRIED</option>
          <option value={"WIDOWED"}>WIDOWED</option>
        </Select>
      </ProfileItem>
    </>
  );
};

export default StaffBioData;
