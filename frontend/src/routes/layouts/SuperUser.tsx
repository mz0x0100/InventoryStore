import { useEffect, useRef, useState } from "react";
import { PopupConfirmation } from "../../components/Popup";
import { PopupTimer } from "../../components/Popups";
import { Text, TextMuted } from "../../components/Text";
import CUSUComponent from "../admin/CreateSU";
import {
  useDeleteSuperUser,
  useLoadSuperUser,
} from "../../utils/apicalls/superusers";
import { SuType } from "./SuperUsers";
import { useLocation } from "react-router-dom";

type ToogleableType = {
  access: string;
  status: boolean;
};
const SuperUser: React.FC = () => {
  const { search } = useLocation();
  const username = new URLSearchParams(search).get("su");

  const [su, setSu] = useState<SuType>();
  const [toggleable, setToggleable] = useState<ToogleableType[]>([]);
  const [changesMade, setChangesMade] = useState(false);
  const [changesSaved, setChangesSaved] = useState(true);
  const [status, setStatus] = useState("");
  const [showRestrictConfirmation, setShowRestrictConfirmation] =
    useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateSu, setShowUpdateSu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [response, setResponse] = useState<any>("");
  const [superUserLoaded, setSuperUserLoaded] = useState(false);
  const deleteSuperUser = useDeleteSuperUser();
  const loadSuperUser = useLoadSuperUser();

  useEffect(() => {
    if (su) {
      setToggleable([
        { access: "Staff", status: su.has_staffs_access },
        { access: "Schools", status: su.has_schools_access },
        { access: "Forms", status: su.has_forms_access },
        { access: "Mail", status: su.has_mail_access },
        { access: "SMS", status: su.has_sms_access },
      ]);
    } else if (response) {
      setSuperUserLoaded(true);
      setSu(response);
      console.log(response);
    } else {
      if (username) loadSuperUser(username, response);
      else {
        setErrorMsg("Missing username in the query");
        setShowError(true);
      }
    }
  }, [response, su]);

  const doAccountRestriction = () => {
    const elem: HTMLInputElement = document.querySelector(
      "#restrict"
    ) as HTMLInputElement;
    elem.checked = true;
    setShowRestrictConfirmation(false);
  };

  const doAccountDeletion = () => {
    // Account deletion logic goes here
    console.log(`deleting ${su?.username}`);
    deleteSuperUser(su?.username as string, setResponse);
    setShowDeleteConfirmation(false);
  };

  const handleUpdateSuccess = (msg: string) => {
    setShowUpdateSu(false);
    setPopupMsg(msg);
    setShowPopup(true);
  };

  return (
    superUserLoaded && (
      <div className="w-full">
        {showUpdateSu ? (
          <>
            <i
              className="fa fa-arrow-left text-xl mb-4 text-gray-600 font-weight-700 cursor-pointer p-4 hover:bg-gray-100"
              onClick={() => setShowUpdateSu(false)}
            />
            <TextMuted className="text-2xl text-center w-full">
              Update login credentials
            </TextMuted>
            <CUSUComponent
              update={{ username: su?.username as string }}
              onSuccess={handleUpdateSuccess}
            />
          </>
        ) : (
          <>
            {showPopup && (
              <PopupTimer
                timeout={5}
                onTimeout={() => setShowPopup(false)}
                location="top"
                className="bg-green-200 p-2 rounded-md"
              >
                {popupMsg}
              </PopupTimer>
            )}
            {showRestrictConfirmation && (
              <PopupConfirmation
                message={`Are you sure you want to restrict '${su?.username}'`}
                onConfirm={doAccountRestriction}
                onCancel={() => setShowRestrictConfirmation(false)}
              />
            )}
            {showDeleteConfirmation && (
              <PopupConfirmation
                message={`Are you sure you want to delete '${su?.username}' from super users`}
                confirmText="Yes"
                onConfirm={doAccountDeletion}
                onCancel={() => setShowDeleteConfirmation(false)}
              />
            )}
            {/* <PopupConfirmation message="Are you sure you want to remove this" /> */}
            <TextMuted>
              {status}
              <i className="fa fa-refresh ml-2" />
            </TextMuted>
            <div className="flex">
              <TextMuted className="w-full font-weight-400 text-lg">
                Permissions
              </TextMuted>
              <TextMuted className="w-auto font-weight-400 text-lg">
                Status
              </TextMuted>
            </div>
            {toggleable.map((item, key) => (
              <div
                className="flex w-full bg-blue-100 p-4 rounded-md mb-4"
                key={key}
              >
                <Text className="w-full">{item.access}</Text>
                <div className="w-auto">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={item.status}
                      onChange={(e) => {
                        item.status = e.target.checked;
                        setChangesMade(true);
                        setStatus("Unsaved");
                        switch (item.access) {
                        }
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            ))}
            <button
              className="p-2 rounded-md text-gray-100 mb-8 w-full bg-blue-400 hover:opacity-90"
              onClick={() => setShowUpdateSu(true)}
            >
              Update login credentials <i className="fa fa-arrow-right" />
            </button>
            <TextMuted className="text-xl">Danger zone</TextMuted>
            <div className="bg-red-100 md:p-4 p-2 rounded-md mb-8">
              <div className="flex mb-8">
                <Text className="w-full">
                  Super user account restriction
                  <br />{" "}
                  <span className="text-sm">
                    Deny the super user from having access to the account
                  </span>
                </Text>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="restrict"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setShowRestrictConfirmation(true);
                        e.target.checked = false;
                      }
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex">
                <Text className="w-full">
                  Delete super user account
                  <br />{" "}
                  <span className="text-sm">
                    Completely remove this super user account from the server
                  </span>
                </Text>
                <button
                  className="py-2 px-4 bg-red-400 rounded-md text-white hover:opacity-80"
                  onClick={() => {
                    setShowDeleteConfirmation(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default SuperUser;
