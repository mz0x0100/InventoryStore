import React, { useEffect, useRef, useState } from "react";
import { SchoolsType } from "../../routes/layouts/Categories";
import { useTheme } from "../../utils/contexts/ThemeContext";
import { Text, TextMuted } from "../Text";
import { useLoadSchool } from "../../utils/apicalls/schools";
import SchoolData from "./SchoolData";
import { LoaderRegular } from "../Loader";
import Backarrow from "../Backarrow";

interface Props {
  schools: SchoolsType[];
}
const SchoolsList: React.FC<Props> = ({ schools }) => {
  const [showSchoolData, setShowSchoolData] = useState(false);
  const [loadedSchoolData, setLoadedSchoolData] = useState<any>();
  const loadSchool = useLoadSchool();
  const previousSchoolCode = useRef<number>();
  const { theme } = useTheme();

  const classes =
    theme == "classic"
      ? "theme-bg mt-2 rounded-md hover:bg-[rgba(0,0,0,0.4)]"
      : "bg-gray-100 hover:bg-gray-200 border-[1px] border-gray-200 mt-[-1px]";

  useEffect(() => {
    console.log(loadedSchoolData);
  }, [loadedSchoolData]);

  const loadSchoolData = (schoolCode: number) => {
    setShowSchoolData(true);

    if (previousSchoolCode.current !== schoolCode || !loadedSchoolData) {
      setLoadedSchoolData(null);
      loadSchool(
        JSON.stringify({ school_code: schoolCode }),
        setLoadedSchoolData
      );
    }
  };
  return showSchoolData ? (
    <>
      <Backarrow onClick={() => setShowSchoolData(false)} />
      {loadedSchoolData ? (
        <SchoolData schoolData={loadedSchoolData} />
      ) : (
        <LoaderRegular text="Loading school data..." />
      )}
    </>
  ) : (
    <div className="max-h-[600px] overflow-auto p-2 border-primary border-2 rounded-md">
      <ul>
        {schools.map((item, key) => (
          <li
            key={key}
            className={`p-4 0 w-full flex cursor-pointer ${classes}`}
            onClick={() => {
              loadSchoolData(item.school_code);
            }}
          >
            <Text className="w-full">
              {key + 1}&nbsp;&nbsp;{item.school_name}
            </Text>
            <TextMuted className="inline text-sm w-auto">{item.lga}</TextMuted>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolsList;
