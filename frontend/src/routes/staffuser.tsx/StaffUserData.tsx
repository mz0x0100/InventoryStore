import React, { ReactNode, useEffect, useReducer, useState } from "react";
import { StaffDataType } from "../../components/Staff";
import { TextMuted } from "../../components/Text";
import StaffBioData from "./tabs/StaffBioData";
import StaffContactInfo from "./tabs/StaffContactInfo";
import StaffBankDatails from "./tabs/StaffBankDatails";
import StaffData from "./tabs/StaffData";
import StaffNextOfKin from "./tabs/StaffNextOfKin";
import useAxiosApiCall from "../../utils/axios_instance";
import { LoaderRegular } from "../../components/Loader";
import {
  StateType,
  getItemStatePayload,
  isIn,
  stateReducer,
} from "../../utils/utils";
import { PopupTimer } from "../../components/Popups";
import { useCurrentUser } from "../../utils/contexts/CurrentUserContext";
import Popup from "../../components/Popup";
import Overlay from "../../components/Overlay";
import { useNavigate } from "react-router-dom";
import StaffUpdatePasswordLayout from "./StaffUpdatePasswordLayout";

type CategoryType = {
  category: string;
  icon: string;
  active: boolean;
};
export interface StaffItemProps {
  staff: StaffDataType;
  handleChange: (itemId: string, value: string) => void;
  getState: (itemId: string) => string;
}

const StaffUserData: React.FC<{ staff: StaffDataType }> = ({ staff }) => {
  const [categories, setCategories] = useState<CategoryType[]>([
    { category: "Bio data", icon: "fa-info-circle", active: true },
    { category: "Contact info", icon: "fa-address-book", active: false },
    { category: "Bank details", icon: "fa-bank", active: false },
    { category: "Staff data", icon: "fa-user-circle", active: false },
    { category: "Next of kin", icon: "fa-user", active: false },
  ]);
  const axiosApiCall = useAxiosApiCall();
  const [imageUri, setImageUri] = useState("");

  const initialState: StateType[] = [
    { id: "psn", itemPayload: staff.psn },
    { id: "full_name", itemPayload: staff.full_name },
    { id: "gender", itemPayload: staff.gender },
    { id: "marital_status", itemPayload: staff.marital_status },
    { id: "religion", itemPayload: staff.religion },
    { id: "dob", itemPayload: staff.dob },
    { id: "gsm", itemPayload: staff.gsm },
    { id: "email", itemPayload: staff.email },
    { id: "state_of_origin", itemPayload: staff.state_of_origin },
    { id: "lga", itemPayload: staff.lga },
    { id: "hometown", itemPayload: staff.hometown },
    { id: "address", itemPayload: staff.address },
    { id: "area_office", itemPayload: staff.area_office },
    { id: "station_category", itemPayload: staff.station_category },
    { id: "station", itemPayload: staff.station },
    {
      id: "date_of_first_appointment",
      itemPayload: staff.date_of_first_appointment,
    },
    {
      id: "date_of_present_appointment",
      itemPayload: staff.date_of_present_appointment,
    },
    { id: "edr_age", itemPayload: staff.edr_age },
    { id: "edr_yos", itemPayload: staff.edr_yos },
    { id: "grade_level", itemPayload: staff.grade_level },
    { id: "present_rank", itemPayload: staff.present_rank },
    { id: "cadre_class", itemPayload: staff.cadre_class },
    { id: "cadre", itemPayload: staff.cadre },
    { id: "appointment_type", itemPayload: staff.appointment_type },
    { id: "qualification_class", itemPayload: staff.qualification_class },
    { id: "highest_qualification", itemPayload: staff.highest_qualification },
    {
      id: "professional_qualification",
      itemPayload: staff.professional_qualification,
    },
    { id: "specialization", itemPayload: staff.specialization },
    { id: "responsibility", itemPayload: staff.responsibility },
    { id: "subject_class", itemPayload: staff.subject_class },
    { id: "subject_taught", itemPayload: staff.subject_taught },
    { id: "relevant_subject_class", itemPayload: staff.relevant_subject_class },
    { id: "relevant_subject", itemPayload: staff.relevant_subject },
    { id: "bank", itemPayload: staff.bank },
    { id: "account_number", itemPayload: staff.account_number },
    { id: "bvn", itemPayload: staff.bvn },
    { id: "nin", itemPayload: staff.nin },
    { id: "trcn", itemPayload: staff.trcn },
    { id: "workload", itemPayload: staff.workload },
    { id: "next_of_kin", itemPayload: staff.next_of_kin },
    { id: "relationship", itemPayload: staff.relationship },
    { id: "kin_address", itemPayload: staff.kin_address },
    { id: "kin_gsm", itemPayload: staff.kin_gsm },
    { id: "approved_by", itemPayload: staff.approved_by },
    { id: "date_approved", itemPayload: staff.date_approved },
    { id: "approval_status", itemPayload: staff.approval_status },
  ];

  const [states, dispatch] = useReducer(stateReducer, initialState);
  const [changesMade, setChangesMade] = useState(false);
  const [changedItemsList, setChangedItemsList] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState<ReactNode>("");
  const { currentUser } = useCurrentUser();
  const [showImage, setShowImage] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const navigate = useNavigate();

  const getState = (itemId: string) => {
    return getItemStatePayload(itemId, states) as string;
  };
  const handleChange = (itemId: string, payload: string) => {
    dispatch({
      type: "UPDATE",
      id: itemId,
      payload: payload,
    });
    if (!exists(changedItemsList, itemId)) {
      setChangedItemsList([...changedItemsList, itemId]);
    }
    setChangesMade(true);
  };

  const handleUpdateProfile = async () => {
    const payload = {
      username: staff.gsm,
      data: changedItemsList.map((item) => {
        const obj: any = {};
        Object.defineProperty(obj, item, {
          enumerable: true,
          writable: true,
          configurable: true,
          value: getState(item),
        });

        return obj;
      }),
    };
    console.log(payload);

    await axiosApiCall
      .post("/staff/update", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        setAlertMsg(response.data.msg);
        setShowAlert(true);
        setChangesMade(false);
        setChangedItemsList([]);
      });
  };

  // Upload a new image to the backend server
  const uploadImageToBackend = async (base64String: string) => {
    await axiosApiCall({
      url: "/staff/upload_profile_pic",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ img_data_base64: base64String }),
    }).then((response) => {
      if (response.data.succedded) {
        setImageUri("");
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        uploadImageToBackend(base64String);
      };

      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (currentUser?.role === "staffuser") {
      const func = async () => {
        await axiosApiCall.get("/staff/profile_pic").then((response) => {
          setImageUri(`data:image/png;base64,${response.data.img_data_base64}`);
        });
      };
      func();
    } else {
      const func = async () => {
        await axiosApiCall
          .post("/staff/profile_pic", { username: staff.gsm })
          .then((response) => {
            setImageUri(
              `data:image/png;base64,${response.data.img_data_base64}`
            );
          });
      };
      func();
    }
  }, [imageUri]);

  const itemProps = {
    staff: staff,
    handleChange: handleChange,
    getState: getState,
  };

  return (
    <div>
      {showImage && imageUri && (
        <Overlay className="z-index-10 overflow-auto">
          <div className="relative">
            <i
              className="absolute fa fa-times top-4 right-4 text-2xl md:text-4xl cursor-pointer font-weight-400 text-gray-800 hover:text-red-400"
              title="Close"
              onClick={() => setShowImage(false)}
            />
            <div className="p-4 mt-8 w-full">
              <Popup onClose={() => setShowImage(false)}>
                <img
                  src={imageUri}
                  alt="Profile picture"
                  className="mx-auto max-w-screen max-h-screen"
                />
              </Popup>
            </div>
          </div>
        </Overlay>
      )}
      {showAlert && (
        <PopupTimer
          location="top"
          timeout={5}
          onTimeout={() => setShowAlert(false)}
          className="bg-green-200 text-gray-700 py-4 px-8 slide-up z-index-4"
        >
          {alertMsg}
        </PopupTimer>
      )}
      <div className="w-full justify-center items-center">
        <div className="relative mx-auto w-[203px] h-[203px]">
          {!imageUri ? (
            <LoaderRegular text="" className="mt-12" />
          ) : (
            <>
              <div className="absolute right-12 bottom-0 ">
                <i
                  className="fa fa-camera rounded-[50%] text-gray-800 text-sm cursor-pointer bg-gray-300 hover:bg-gray-400 py-2 px-3"
                  title="Upload a profile picture"
                >
                  <input
                    title="Upload your photo"
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    className="absolute rounded-[50%] opacity-0 top-0 left-0 w-full h-full cursor-pointer"
                  />
                </i>
              </div>

              <img
                src={imageUri}
                alt="Profile picture"
                className="mx-auto w-[200px] h-[200px] rounded-[50%] border-4 border-primary cursor-pointer"
                onClick={() => setShowImage(true)}
              />
              {/* <Popup className="absolute z-index">
                <div className="z-index-1 mx-auto min-w-[220px] rounded-md shadow-xl bg-transparent">
                  <ul>
                    <li className="py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100">
                      <i className="fa fa-eye mr-4" />
                      View photo
                    </li>
                    <li className="py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100">
                      <i className="fa fa-upload mr-4" />
                      Upload picture
                    </li>
                  </ul>
                </div>
              </Popup> */}
            </>
          )}
        </div>
      </div>
      <div className="w-full justify-center text-center">
        <TextMuted className="mt-2 text-center font-weight-800 text-lg">
          {staff.full_name}
        </TextMuted>
        <button
          className="py-2 px-4 mt-2 text-sm font-weight-400 bg-primary rounded-md text-white hover:opacity-80"
          onClick={() => {
            currentUser?.role === "staffuser"
              ? navigate("/staff/update_password")
              : setShowUpdatePassword(true);
          }}
        >
          <i className="fa fa-key mr-2" />
          Update password
        </button>
      </div>
      {showUpdatePassword && (
        <Overlay className="z-index-10 overflow-auto">
          <div className="mt-8 p-2 md:p-8 bg-white w-full h-auto">
            <StaffUpdatePasswordLayout
              username={staff.gsm}
              onClose={() => setShowUpdatePassword(false)}
            />
          </div>
        </Overlay>
      )}
      {/* Edit mode:
      <br />
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label> */}
      <div className="mt-4 mb-12 w-full lg:justify-center flex p-2 overflow-x-auto">
        {categories.map((cat, key) => (
          <div
            key={key}
            className={`${
              cat.active && "border-b-2"
            } hover:border-b-2 border-primary p-2 cursor-pointer mr-2 min-w-[140px] text-center`}
            onClick={() => {
              setCategories(
                categories.map((c) =>
                  c.category == cat.category
                    ? { ...c, active: true }
                    : { ...c, active: false }
                )
              );
            }}
          >
            <i className={`fa ${cat.icon} mr-2 text-primary`}></i>
            <span className="">{cat.category}</span>
          </div>
        ))}
      </div>
      <div className="md:p-4">
        {categories.map(
          (c, k) =>
            (k == 0 && c.active && <StaffBioData key={k} {...itemProps} />) ||
            (k == 1 && c.active && (
              <StaffContactInfo key={k} {...itemProps} />
            )) ||
            (k == 2 && c.active && (
              <StaffBankDatails key={k} {...itemProps} />
            )) ||
            (k == 3 && c.active && <StaffData key={k} {...itemProps} />) ||
            (k == 4 && c.active && <StaffNextOfKin key={k} {...itemProps} />)
        )}
        {changesMade && (
          <button
            className="mt-8 w-full p-4 text-lg hover:opacity-80 rounded-md bg-primary text-white"
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default StaffUserData;

export const ProfileItem: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="data-container mt-4 p-2 md:p-4 border-2 rounded-lg">
      {children}
    </div>
  );
};

// Method to check for an existance of a specified changedItemsList[0]
const exists = (items: string[], targetItem: string): boolean => {
  for (var i = 0; i < items.length; i++) {
    if (items[i] == targetItem) {
      return true;
    }
  }

  return false;
};
