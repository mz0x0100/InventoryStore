import { HTMLProps, useState } from "react";
import { Text, TextMuted } from "./Text";
import InputForm from "./form/InputForm";
import { lgaList } from "../routes/layouts/StaffsData";
import Select from "./form/Select";

export type StaffDataType = {
  account_number: number;
  address: string;
  appointment_type: string;
  approval_status: string;
  approved_by: string;
  area_office: string;
  bank: number;
  bvn: number;
  cadre: string;
  cadre_class: string;
  date_approved: string;
  date_of_first_appointment: string;
  date_of_present_appointment: string;
  dob: string;
  edr_age: string;
  edr_yos: string;
  email: string;
  full_name: string;
  gender: string;
  grade_level: string;
  gsm: string;
  highest_qualification: string;
  hometown: string;
  id: number;
  kin_address: string;
  kin_gsm: number;
  lga: string;
  marital_status: string;
  next_of_kin: string;
  nin: string;
  present_rank: string;
  professional_qualification: string;
  psn: number;
  qualification_class: string;
  relationship: string;
  relevant_subject: string;
  relevant_subject_class: string;
  religion: string;
  responsibility: string;
  specialization: string;
  state_of_origin: string;
  station: string;
  station_category: string;
  subject_class: string;
  subject_taught: string;
  trcn: string;
  workload: string;
  img_bs64: string;
};
const Staff: React.FC<{ staff: StaffDataType }> = ({ staff }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <TextMuted>Edit mode:</TextMuted>
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={!editMode}
          onChange={(e) => setEditMode(e.target.checked)}
        />
        <span className="slider round" />
      </label>
      <div className="lg:grid lg:grid-cols-2 md:gap-3">
        <Column>
          <Text>Fullname:</Text>
          <InputForm
            type="text"
            value={staff.full_name}
            name="fullname"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Gender:</Text>
          <Select
            value={staff.gender.toLowerCase()}
            className="w-full p-4 rounded-md"
            name="gender"
          >
            <option value={"male"}>MALE</option>
            <option value={"female"}>FEMALE</option>
          </Select>
        </Column>
        <Column>
          <Text>Email:</Text>
          <InputForm
            type="text"
            value={staff.email}
            name="email"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>GSM:</Text>
          <InputForm
            type="text"
            value={staff.gsm}
            name="gsm"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>DOB:</Text>
          <InputForm
            type="date"
            value={staff.dob}
            name="dob"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Religion:</Text>
          <InputForm
            type="text"
            value={staff.religion}
            name="religion"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Marital Status:</Text>
          <Select
            value={staff.marital_status.toLowerCase()}
            className="w-full p-4 rounded-md"
            name="marital_status"
          >
            <option value={"single"}>SINGLE</option>
            <option value={"married"}>MARRIED</option>
            <option value={"widowed"}>WIDOWED</option>
          </Select>
        </Column>
        <Column>
          <Text>LGA:</Text>

          <Select
            value={staff.lga.toUpperCase()}
            className="w-full p-4 rounded-md"
            name="lga"
          >
            {lgaList.map((lga) => (
              <option value={lga.name.toUpperCase()}>
                {lga.name.toUpperCase()}
              </option>
            ))}
          </Select>
        </Column>
        <Column>
          <Text>Hometown:</Text>
          <InputForm
            type="text"
            value={staff.hometown}
            name="hometown"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Address:</Text>
          <InputForm
            type="text"
            value={staff.address}
            name="address"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Station:</Text>
          <InputForm
            type="text"
            value={staff.station}
            name="station"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Station Category:</Text>
          <InputForm
            type="text"
            value={staff.station_category}
            name="station_category"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Present Rank:</Text>
          <InputForm
            type="text"
            value={staff.present_rank}
            name="present_rank"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Grade Level:</Text>
          <InputForm
            type="text"
            value={staff.grade_level}
            name="grade_level"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Cadre:</Text>
          <InputForm
            type="text"
            value={staff.cadre}
            name="cadre"
            readOnly={!editMode}
          />
        </Column>
        <Column>
          <Text>Cadre Class:</Text>
          <InputForm
            type="text"
            value={staff.cadre_class}
            name="cadre_class"
            readOnly={!editMode}
          />
        </Column>
        {editMode && (
          <button className="col-span-2 w-full my-8 bg-secondary text-gray-100 p-4 rounded-md text-center">
            Update
          </button>
        )}
      </div>
    </>
  );
};

const GridGroup: React.FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
  return <div className="grid grid-cols-2 mt-2">{children}</div>;
};
interface Props extends HTMLProps<HTMLDivElement> {}
const Column: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <div className={`${className} ml-4 mt-2`} {...props}>
      {children}
    </div>
  );
};
export default Staff;
