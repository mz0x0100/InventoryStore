import { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import { Text, TextMuted } from "../components/Text";
import { lgaList } from "./layouts/StaffsData";
import SpecialLayout from "./SpecialLayout";
import Footer from "../components/Footer";
import { SchoolsType } from "./layouts/Categories";
import SchoolsList from "../components/schools/SchoolsList";
import SchoolsStat from "../components/schools/SchoolsStat";
import { useLoadSchools, useLoadSchoolsStats } from "../utils/apicalls/schools";
import Loader, { LoaderRegular } from "../components/Loader";

type EnrollmentType = {
  male: number;
  female: number;
  total: number;
};
export type LGASchoolsStatType = {
  lga: string;
  junior_sec_enrollment: EnrollmentType;
  pre_and_primary_enrollment: EnrollmentType;
  private_education_enrollment: EnrollmentType;
  sci_and_vocational_enrollment: EnrollmentType;
  senior_sec_enrollment: EnrollmentType;
  total_junior_sec: number;
  total_pre_and_primary: number;
  total_private_education: number;
  total_sci_and_vocational: number;
  total_senior_sec: number;
  overall_enrollment_total: number;
  overall_schools_total: number;
};
const Schools: React.FC = () => {
  const [lgas, setLgas] = useState(lgaList);
  const [schoolListResponse, setSchoolListResponse] = useState<any>();
  const [schools, setSchools] = useState<SchoolsType[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<SchoolsType[]>([]);
  const [displaySchoolsList, setDisplaySchoolsList] = useState(false);
  const [schoolsStats, setSchoolsStats] = useState<LGASchoolsStatType[]>([]);
  const [statResponse, setStatResponse] = useState<any>();
  const [statDataLoaded, setStatDataLoaded] = useState(false);
  const [schoolListDataLoaded, setSchoolListDataLoaded] = useState(false);
  const [selectedLgas, setSelectedLgas] = useState<Array<string>>(
    lgaList.map((i) => i.name.toUpperCase())
  );
  const loadSchoolsStats = useLoadSchoolsStats();
  const loadSchools = useLoadSchools();
  const schFilter = schoolFilter(schools, setFilteredSchools);

  useEffect(() => {
    if (statResponse) {
      console.log(statResponse);
      setSchoolsStats(statResponse);
      setStatDataLoaded(true);
    } else {
      setStatDataLoaded(false);
      loadSchoolsStats(selectedLgas, setStatResponse);
    }

    if (displaySchoolsList) {
      if (schoolListResponse) {
        console.log(schoolListResponse);
        setSchools(schoolListResponse);
        setFilteredSchools(schoolListResponse);
        setSchoolListDataLoaded(true);
      } else {
        setSchoolListDataLoaded(false);
        loadSchools(setSchoolListResponse);
      }
    }
  }, [statResponse, schoolListResponse, displaySchoolsList]);

  useEffect(() => {
    document.title = "EMIS - Schools";
  }, []);

  useEffect(() => {
    let filtered: SchoolsType[] = [];
    let flag = false;

    // Loop through all lgas
    for (let i = 0; i < lgas.length; i++) {
      // If selected
      if (lgas[i].selected) {
        flag = true;
        // Push all staffs that matches the selected LGA to the filtered items
        filteredSchools.map(
          (sch) =>
            sch.lga.toLowerCase() == lgas[i].name.toLowerCase() &&
            filtered.push(sch)
        );
      }
    }

    flag ? setFilteredSchools(filtered) : setFilteredSchools(schools);
  }, [lgas]);

  return (
    <>
      <Header activeId={1} />
      <Container className="pt-[100px] md:pt-[100px] index-container">
        <SpecialLayout>
          <TextMuted className="text-2xl text-center font-weight-600">
            Statistics of Schools in Gombe State
          </TextMuted>
          <div className="flex mt-6 theme-bg rounded-xl border-2 border-gray-500">
            <i className="fa fa-search text-xl text-gray-500 p-4"></i>
            <input
              type="text"
              className="w-full p-tbl-4 bg-transparent outline-none"
              placeholder="Filter schools..."
              onChange={(e) => {
                schFilter(e.target.value);
              }}
            />
          </div>
          <div className="flex mt-4">
            <i className="fa fa-filter text-xl text-gray-500 mr-2" />
            <Text className="w-[120px] font-weight-500 text-gray-700">
              Filter LGA:
            </Text>
            <div className="flex overflow-x-auto pb-2">
              {lgas.map((lga, key) => (
                <div
                  className={`border-[1px] border-gray-500 text-gray-500 p-2  mr-2 max-h-[40px] min-w-[90px] ${
                    lga.selected ? "bg-[#eee] text-gray-900" : "theme-bg"
                  } rounded-3xl cursor-pointer hover:bg-gray-300 text-center`}
                  key={key}
                  onClick={() => {
                    setLgas(
                      lgas.map((item) =>
                        item.name == lga.name
                          ? { ...item, selected: !item.selected }
                          : item
                      )
                    );
                  }}
                >
                  {lga.name}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div>
              <TextMuted>Display list of schools:</TextMuted>
              &nbsp;
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={displaySchoolsList}
                  onChange={(e) => setDisplaySchoolsList(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            {displaySchoolsList ? (
              !schoolListDataLoaded ? (
                <LoaderRegular text="Loading data..." />
              ) : (
                <SchoolsList schools={filteredSchools} />
              )
            ) : !statDataLoaded ? (
              <LoaderRegular text="Loading data..." />
            ) : (
              <SchoolsStat schoolsStats={schoolsStats} />
            )}
          </div>
        </SpecialLayout>
      </Container>
      <Footer />
    </>
  );
};

export default Schools;

export const schoolFilter = (
  items: Array<SchoolsType>,
  setItems: React.Dispatch<React.SetStateAction<Array<SchoolsType>>>
) => {
  const filter = (filter: string) => {
    const qualifiedItems: Array<SchoolsType> = [];

    items.forEach((item) => {
      if (item.school_name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        qualifiedItems.push(item);
      }
    });

    setItems(qualifiedItems);
  };

  return filter;
};
