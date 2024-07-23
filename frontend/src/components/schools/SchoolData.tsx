import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { useMap } from "react-leaflet/hooks";
import { Text, TextBolded, TextBoldedIn, TextMuted } from "../Text";
import MapComponent from "../MapComponent";
import { useTheme } from "../../utils/contexts/ThemeContext";

export type SchoolDataType = {
  any_classes_held_outside_y_n: string;
  code_school: number;
  female_enroll: number;
  latitude_north: number;
  lga: string;
  longitude_east: number;
  male_enroll: number;
  multi_grade_y_n: number;
  name_school: string;
  name_type_health_facility: string;
  name_type_location: string;
  name_type_school: string;
  name_type_sector: string;
  name_type_water_source: string;
  number_and_street: string;
  pta_pf_ma_y_n: string;
  sbmc_y_n: string;
  sdp_y_n: string;
  shared_facilities_y_n: string;
  shift_system_y_n: string;
  state: string;
  total_enrollment: number;
  ward: string;
};
const SchoolData: React.FC<{ schoolData: SchoolDataType }> = ({
  schoolData,
}) => {
  const { theme } = useTheme();

  const themeBg = theme == "classic" ? "theme-bg" : "bg-blue-100";

  return (
    <div className={`mt-4 ${themeBg} shadow-xl p-4 md:p-6 rounded-md`}>
      <div>
        <TextMuted className="text-lg">
          <TextBoldedIn>School Name:</TextBoldedIn> {schoolData?.name_school}
        </TextMuted>
        <TextMuted className="w-full text-center text-2xl p-2 border-b-2 border-primary font-bold">
          Entrollment
        </TextMuted>
        <div className="grid grid-cols-2 mt-2 gap-4">
          <SchItem title="Male" data={schoolData?.male_enroll} />
          <SchItem title="Female" data={schoolData?.female_enroll} />
          <SchItem
            title="Total"
            className="col-span-2 text-center"
            data={schoolData?.total_enrollment}
          />
        </div>
        <TextMuted className="w-full mt-2 text-center text-2xl p-2 border-b-2 border-primary font-bold">
          Basic Info
        </TextMuted>
        <div className="grid grid-cols-2 mt-2 gap-4">
          <SchItem title="Sector type" data={schoolData?.name_type_sector} />
          <SchItem title="School type" data={schoolData?.name_type_school} />
          <SchItem title="Location" data={schoolData?.name_type_location} />
          <SchItem
            title="Health facility"
            data={schoolData?.name_type_health_facility}
          />
          <SchItem
            title="Source of water"
            data={schoolData?.name_type_water_source}
          />
          <SchItem
            title="Shared facilities"
            data={schoolData?.shared_facilities_y_n}
          />
          <SchItem title="Shift system" data={schoolData?.shift_system_y_n} />
          <SchItem title="Multi grade" data={schoolData?.multi_grade_y_n} />
        </div>
        <TextMuted className="w-full mt-2 text-center text-2xl p-2 border-b-2 border-primary font-bold">
          Address Info
        </TextMuted>
        <div className="grid grid-cols-2 mt-2 gap-4">
          <SchItem title="LGA" data={schoolData?.lga} />
          <SchItem title="Ward" data={schoolData?.ward} />
          <SchItem title="Street" data={schoolData?.number_and_street} />
          <SchItem title="Longitude" data={schoolData?.longitude_east} />
          <SchItem title="Latitude" data={schoolData?.latitude_north} />
        </div>
      </div>
      {schoolData.longitude_east && schoolData.latitude_north && (
        <div className="w-full max-h-[400px] overflow-auto mt-6">
          <MapComponent
            longitude={schoolData.longitude_east}
            latitude={schoolData.latitude_north}
          />
        </div>
      )}
    </div>
  );
};

export default SchoolData;

const SchItem: React.FC<{ title: string; data: any; className?: string }> = ({
  title,
  data,
  className,
}) => {
  const { theme } = useTheme();

  const themeBg = theme == "classic" ? "theme-bg" : "transparent";

  return (
    <TextMuted
      className={`${className} w-full p-2 md:p-6 ${themeBg} shadow-xl`}
    >
      <TextBoldedIn>{title}:</TextBoldedIn> {data}
    </TextMuted>
  );
};

const MyMapComponent = () => {
  const map = useMap();

  console.log("Center: " + map.getCenter());
  return null;
};
