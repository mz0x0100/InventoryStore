import React from "react";
import { ProfileItem, StaffItemProps } from "../StaffUserData";
import { Text } from "../../../components/Text";
import InputForm from "../../../components/form/InputForm";
import { dateExportApiFormat, dateImportApiFormat } from "../../../utils/utils";

const StaffData: React.FC<StaffItemProps> = ({ getState, handleChange }) => {
  const dofa = dateImportApiFormat(getState("date_of_first_appointment"));
  const dopa = dateImportApiFormat(getState("date_of_present_appointment"));
  return (
    <>
      <ProfileItem>
        <Text>Appointment type:</Text>
        <InputForm
          type="text"
          defaultValue={getState("appointment_type")}
          onChange={(e) => handleChange("appointment_type", e.target.value)}
          placeholder="Appointment type"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Approval status:</Text>
        <InputForm
          type="text"
          defaultValue={getState("approval_status")}
          onChange={(e) => handleChange("approval_status", e.target.value)}
          placeholder="Approval status"
          readOnly
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Approved by:</Text>
        <InputForm
          type="text"
          defaultValue={getState("approved_by")}
          onChange={(e) => handleChange("approved_by", e.target.value)}
          placeholder="Approved by"
          readOnly
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Area office:</Text>
        <InputForm
          type="text"
          defaultValue={getState("area_office")}
          onChange={(e) => handleChange("area_office", e.target.value)}
          placeholder="Area office"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Date of first appointment:</Text>
        <InputForm
          type="date"
          defaultValue={`${dofa[0]}-${dofa[1]}-${dofa[2]}`}
          placeholder="Date of first appointment"
          onChange={(e) => {
            handleChange(
              "date_of_first_appointment",
              dateExportApiFormat(e.target.value)
            );
          }}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Date of present appointment:</Text>
        <InputForm
          type="date"
          defaultValue={`${dopa[0]}-${dopa[1]}-${dopa[2]}`}
          placeholder="Date of present appointment"
          onChange={(e) => {
            handleChange(
              "date_of_present_appointment",
              dateExportApiFormat(e.target.value)
            );
          }}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Grade level:</Text>
        <InputForm
          type="text"
          defaultValue={getState("grade_level")}
          onChange={(e) => handleChange("grade_level", e.target.value)}
          placeholder="Grade level"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Present rank:</Text>
        <InputForm
          type="text"
          defaultValue={getState("approval_status")}
          onChange={(e) => handleChange("approval_status", e.target.value)}
          placeholder="Present rank"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Station:</Text>
        <InputForm
          type="text"
          defaultValue={getState("station")}
          onChange={(e) => handleChange("station", e.target.value)}
          placeholder="Station"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Cadre:</Text>
        <InputForm
          type="email"
          defaultValue={getState("cadre")}
          onChange={(e) => handleChange("cadre", e.target.value)}
          placeholder="Cadre"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Cadre class:</Text>
        <InputForm
          type="email"
          defaultValue={getState("cadre_class")}
          onChange={(e) => handleChange("cadre_class", e.target.value)}
          placeholder="Cadre class"
        />
      </ProfileItem>
      {/* <div className="border-b-2 border-gray-400 p-2 mt-8">
        <h4 className="text-center font-bold text-2xl">Qualifications</h4>
      </div> */}
      <ProfileItem>
        <Text>Qualification class:</Text>
        <InputForm
          type="text"
          defaultValue={getState("qualification_class")}
          onChange={(e) => handleChange("qualification_class", e.target.value)}
          placeholder="Qualification class"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Highest qualification:</Text>
        <InputForm
          type="text"
          defaultValue={getState("highest_qualification")}
          onChange={(e) =>
            handleChange("highest_qualification", e.target.value)
          }
          placeholder="Highest qualification"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Professional qualification:</Text>
        <InputForm
          type="text"
          defaultValue={getState("qualification_class")}
          onChange={(e) => handleChange("qualification_class", e.target.value)}
          placeholder="Professional qualification"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Specialization:</Text>
        <InputForm
          type="text"
          defaultValue={getState("specialization")}
          onChange={(e) => handleChange("specialization", e.target.value)}
          placeholder="Specialization"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Subject class:</Text>
        <InputForm
          type="text"
          defaultValue={getState("subject_class")}
          onChange={(e) => handleChange("subject_class", e.target.value)}
          placeholder="Subject class"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Subject taught:</Text>
        <InputForm
          type="text"
          defaultValue={getState("subject_taught")}
          onChange={(e) => handleChange("subject_taught", e.target.value)}
          placeholder="Subject taught"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Relevant subject class:</Text>
        <InputForm
          type="text"
          defaultValue={getState("relevant_subject_class")}
          onChange={(e) =>
            handleChange("relevant_subject_class", e.target.value)
          }
          placeholder="Relevant subject class"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Relevant subject:</Text>
        <InputForm
          type="text"
          defaultValue={getState("relevant_subject")}
          onChange={(e) => handleChange("relevant_subject", e.target.value)}
          placeholder="Relevant subject"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Responsibility:</Text>
        <InputForm
          type="text"
          defaultValue={getState("responsibility")}
          onChange={(e) => handleChange("responsibility", e.target.value)}
          placeholder="Responsibility"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Subject taught:</Text>
        <InputForm
          type="text"
          defaultValue={getState("subject_taught")}
          onChange={(e) => handleChange("subject_taught", e.target.value)}
          placeholder="Subject taught"
        />
      </ProfileItem>
      <ProfileItem>
        <Text>TRCN:</Text>
        <InputForm
          type="text"
          defaultValue={getState("trcn")}
          placeholder="TRCN"
          onChange={(e) => handleChange("trcn", e.target.value)}
        />
      </ProfileItem>
      <ProfileItem>
        <Text>Workload:</Text>
        <InputForm
          type="text"
          defaultValue={getState("workload")}
          onChange={(e) => handleChange("workload", e.target.value)}
          placeholder="Workload"
        />
      </ProfileItem>
    </>
  );
};

export default StaffData;
