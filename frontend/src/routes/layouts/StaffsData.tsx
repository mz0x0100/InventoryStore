import { SetStateAction, useEffect, useRef, useState } from "react";
import { Text, TextMuted } from "../../components/Text";
import Staff from "../../components/Staff";
import { LoaderRegular } from "../../components/Loader";
import { useLoadStaff, useLoadStaffs } from "../../utils/apicalls/staffs";
import StaffUserData from "../staffuser.tsx/StaffUserData";

type LGAType = {
  name: string;
  selected: boolean;
};
738;
export const lgaList: LGAType[] = [
  { name: "Gombe", selected: false },
  { name: "Akko", selected: false },
  { name: "Billiri", selected: false },
  { name: "Dukku", selected: false },
  { name: "Kaltungo", selected: false },
  { name: "Balanga", selected: false },
  { name: "Yamaltu/Deba", selected: false },
  { name: "Kwami", selected: false },
  { name: "Funakaye", selected: false },
  { name: "Nafada", selected: false },
  { name: "Shongom", selected: false },
];

export type StaffType = {
  id: number;
  fullname: string;
  lga: string;
  selected?: boolean;
};

interface StaffsDataProps {
  selectable?: boolean;
  initialSelection?: StaffType[];
  setSelectedStaffs?: (s: StaffType[]) => void;
}

const StaffsData: React.FC<StaffsDataProps> = ({
  selectable,
  initialSelection,
  setSelectedStaffs,
}) => {
  const [response, setResponse] = useState<any>();
  const [staffs, setStaffs] = useState<StaffType[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Array<StaffType>>([]);
  const [lgas, setLgas] = useState(lgaList);
  const [showStaffData, setShowStaffData] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loadedStaffData, setLoadedStaffData] = useState<any | null>(null);
  const previousStaffId = useRef<number>();
  const loadStaffs = useLoadStaffs();
  const loadStaff = useLoadStaff();

  const filter = staffFilter(staffs, setFilteredStaffs);

  useEffect(() => {
    if (!response) {
      loadStaffs(setResponse);
    } else {
      setStaffs(response);
      setFilteredStaffs(staffs);
    }
  }, [response]);

  useEffect(() => {
    let filtered: StaffType[] = [];
    let flag = false;

    // Loop through all lgas
    for (let i = 0; i < lgas.length; i++) {
      // If selected
      if (lgas[i].selected) {
        flag = true;
        // Push all staffs that matches the selected LGA to the filtered items
        staffs.map(
          (staff) =>
            staff.lga.toLowerCase() == lgas[i].name.toLowerCase() &&
            filtered.push(staff)
        );
      }
    }

    flag ? setFilteredStaffs(filtered) : setFilteredStaffs(staffs);
  }, [lgas]);

  const loadStaffData = (id: number) => {
    if (previousStaffId.current == id && loadedStaffData) {
      setShowStaffData(true);
    } else {
      setLoadedStaffData(null);
      setShowStaffData(true);
      loadStaff(id, setLoadedStaffData);
      previousStaffId.current = id;
    }
  };

  return (
    <>
      {!showStaffData ? (
        <>
          <div className="flex bg-white rounded-xl border-2 border-gray-500">
            <i className="fa fa-search text-xl text-gray-500 p-4"></i>
            <input
              type="text"
              className="w-full p-tbl-4 bg-transparent outline-none"
              placeholder="Filter staffs..."
              onChange={(e) => filter(e.target.value)}
            />
          </div>
          <div className="flex mt-4">
            <i className="fa fa-filter text-xl text-gray-500 mr-2" />
            <Text className="w-[120px] font-weight-500 text-gray-500">
              Filter LGA:
            </Text>
            <div className="flex overflow-x-auto pb-2">
              {lgas.map((lga, key) => (
                <div
                  className={`border-[1px] border-gray-500 text-gray-500 p-2 bg-gray-100 mr-2 max-h-[40px] min-w-[90px] ${
                    lga.selected ? "bg-gray-300 text-gray-900" : ""
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
          <div className="my-4">
            {selectable && (
              <button
                className="z-index-2 fixed bottom-8 py-2 px-8 text-white rounded-md bg-primary shadow-md right-2 hover:opacity-80"
                onClick={() => {
                  setSelectedStaffs?.(filteredStaffs.filter((s) => s.selected));
                }}
              >
                Ok
              </button>
            )}
            {selectable ? (
              <div
                className={`border-[1px] border-gray-500 text-gray-500 p-2 bg-gray-100 m-4 max-h-[40px] max-w-[120px] ${
                  selectAll ? "bg-gray-300 text-gray-900" : ""
                } rounded-3xl cursor-pointer hover:bg-gray-300 text-center`}
                onClick={() => {
                  setFilteredStaffs(
                    filteredStaffs.map((s) => ({ ...s, selected: !selectAll }))
                  );
                  setSelectAll(!selectAll);
                }}
              >
                {!selectAll ? "Select all" : "Deselect all"}
              </div>
            ) : (
              <Text className="p-2 text-lg font-weight-700 text-gray-500">
                {staffs.length} staffs loaded,&nbsp;
                {filteredStaffs.length} shown,{" "}
                {staffs.length - filteredStaffs.length} filtered out
              </Text>
            )}
            {!response ? (
              <LoaderRegular text="Loading staffs data..." />
            ) : (
              <ul>
                {filteredStaffs.map((item, key) => (
                  <li
                    key={key}
                    className={`border-[1px] border-gray-200 mt-[-1px] p-4 bg-gray-100 ${
                      item.selected &&
                      "bg-gray-200 border-[1px] border-gray-400"
                    } hover:bg-gray-200 cursor-pointer`}
                    onClick={() => {
                      selectable
                        ? setFilteredStaffs(
                            filteredStaffs.map((staff) =>
                              staff.id == item.id
                                ? { ...staff, selected: !item.selected }
                                : staff
                            )
                          )
                        : loadStaffData(item.id);
                    }}
                  >
                    {item.id}&nbsp;&nbsp;{item.fullname}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <div>
          {loadedStaffData ? (
            <div>
              <div>
                <i
                  className="fa fa-arrow-left text-xl text-gray-500 font-weight-700 cursor-pointer p-4 hover:bg-gray-100"
                  onClick={() => setShowStaffData(false)}
                />
                {/* <Staff staff={loadedStaffData} /> */}
                <StaffUserData staff={loadedStaffData} />
              </div>
            </div>
          ) : (
            <div className="w-full justify-center items-center">
              <div className="loader-regular mx-auto"></div>
              <TextMuted className="text-center">
                Loading staff data...
              </TextMuted>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const staffFilter = (
  items: Array<StaffType>,
  setItems: React.Dispatch<SetStateAction<Array<StaffType>>>
) => {
  const filter = (filter: string) => {
    const qualifiedItems: Array<StaffType> = [];

    items.forEach((item) => {
      if (item.fullname.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        qualifiedItems.push(item);
      }
    });

    setItems(qualifiedItems);
  };

  return filter;
};

export default StaffsData;
