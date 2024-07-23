import { HTMLProps, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import { Text, TextMuted } from "../../components/Text";
import { PopupTimer } from "../../components/Popups";
import { LoaderRegular } from "../../components/Loader";
import { PopupConfirmation } from "../../components/Popup";
import {
  useDeleteSuperUser,
  useLoadSuperUsers,
  useUpdateSuperUser,
} from "../../utils/apicalls/superusers";
import CUSUComponent from "../admin/CreateSU";

export type SuType = {
  id: number;
  username: string;
  has_staffs_access: boolean;
  has_schools_access: boolean;
  has_forms_access: boolean;
  has_mail_access: boolean;
  has_sms_access: boolean;
  restricted: boolean;
};

const SuperUsers: React.FC = () => {
  const [showCreateSu, setShowCreateSu] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [susLoaded, setSusLoaded] = useState(false);
  const [loadedSuperUsers, setLoadedSuperUsers] = useState<SuType[]>([]);
  const [loadSuResponse, setLoadSuResponse] = useState<any>();
  const [miscApiResponse, setMiscApiResponse] = useState<any>();
  const [showSuDetails, setShowSuDetials] = useState(false);
  const superUser = useRef<SuType>();
  const loadSuperUsers = useLoadSuperUsers();

  useEffect(() => {
    if (loadSuResponse) {
      console.log(loadSuResponse);
      setLoadedSuperUsers(loadSuResponse);
      setSusLoaded(true);
    } else {
      loadSuperUsers(setLoadSuResponse);
    }
  }, [loadSuResponse]);

  const forceReloadSu = () => {
    setSusLoaded(false);
    setLoadSuResponse(null);
  };

  const handleSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setShowCreateSu(false);
    setShowSuccessMsg(true);
    forceReloadSu();
  };

  const handleTimeout = () => {
    setShowSuccessMsg(false);
  };

  const handleDeleteSu = (msg: string) => {
    setShowSuDetials(false);
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    forceReloadSu();
  };
  return (
    <>
      {showSuDetails ? (
        <div>
          <i
            className="fa fa-arrow-left text-xl text-gray-500 font-weight-700 cursor-pointer p-4 hover:bg-gray-100"
            onClick={() => setShowSuDetials(false)}
          />
          <SuperUser
            su={superUser.current as SuType}
            onDeleteSu={handleDeleteSu}
            updateSus={forceReloadSu}
          />
        </div>
      ) : !showCreateSu ? (
        <>
          {showSuccessMsg && (
            <PopupTimer
              timeout={10}
              onTimeout={handleTimeout}
              location="top"
              className="slide-up shadow-2xl bg-green-200 p-4 rounded-md"
            >
              {successMsg}
            </PopupTimer>
          )}
          <div className="w-full p-8 bg-secondary rounded-b-3xl shadow-xl">
            <Text className="text-2xl text-white text-center">
              Super users <i className="fa fa-shield"></i>
            </Text>
          </div>
          <Container>
            <div>
              <i
                className="py-1 px-2 rounded-3xl text-lg fa fa-refresh cursor-pointer hover:bg-gray-100"
                title="refresh"
                onClick={forceReloadSu}
              />
            </div>

            {!susLoaded ? (
              <LoaderRegular text="Loading super users..." />
            ) : (
              <>
                <SuComponent
                  onClick={() => setShowCreateSu(true)}
                  className="relative"
                >
                  <i className="absolute fa fa-plus text-2xl top-8 right-24 text-green-500" />
                  New super user
                </SuComponent>
                {loadedSuperUsers.map((su, key) => (
                  <SuComponent
                    key={key}
                    onClick={() => {
                      superUser.current = su;
                      setShowSuDetials(true);
                    }}
                  >
                    {su.username}
                  </SuComponent>
                ))}
              </>
            )}
          </Container>
        </>
      ) : (
        <div>
          <i
            className="fa fa-arrow-left text-xl mb-4 text-gray-600 font-weight-700 cursor-pointer p-4 hover:bg-gray-100"
            onClick={() => setShowCreateSu(false)}
          />
          <TextMuted className="font-weight-500 text-2xl text-center">
            Create a new super user
          </TextMuted>
          <CUSUComponent onSuccess={handleSuccess} />
        </div>
      )}
    </>
  );
};

export default SuperUsers;

const SuComponent: React.FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`${className} inline-block p-2 mt-4 mr-4 cursor-pointer bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] h-[170px] w-[170px] justify-center items-center`}
      {...props}
    >
      <i className="pt-3 fa fa-user text-[80px] w-full text-center"></i>
      <Text className="text-lg pt-3 w-full text-center">{children}</Text>
    </div>
  );
};

const SuperUser: React.FC<{
  su: SuType;
  onDeleteSu: (msg: string) => void;
  updateSus: () => void;
}> = ({ su, updateSus, onDeleteSu }) => {
  const [toggleable, setToggleable] = useState([
    {
      access: "Staff",
      describ: "View and update staff records",
      status: su.has_staffs_access,
    },
    {
      access: "Schools",
      describ: "View and update school records",
      status: su.has_schools_access,
    },
    {
      access: "Forms",
      describ: "Create, delete and update form templates and records",
      status: su.has_forms_access,
    },
    { access: "Mail", describ: "Send mails", status: su.has_mail_access },
    { access: "SMS", describ: "Send SMS", status: su.has_sms_access },
  ]);

  const [changesMade, setChangesMade] = useState(false);
  const [changesSaved, setChangesSaved] = useState(true);
  const [status, setStatus] = useState("");
  const [showRestrictConfirmation, setShowRestrictConfirmation] =
    useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateSu, setShowUpdateSu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [response, setResponse] = useState<any>("");
  const [restricted, setRestricted] = useState(su.restricted);
  const deleteSuperUser = useDeleteSuperUser();
  const updateSuperUser = useUpdateSuperUser();

  useEffect(() => {
    if (response) {
      onDeleteSu(response.msg);
      setResponse(null);
    }
  }, [response]);

  const doAccountRestriction = () => {
    const elem: HTMLInputElement = document.querySelector(
      "#restrict"
    ) as HTMLInputElement;
    elem.checked = true;
    setShowRestrictConfirmation(false);
    setRestricted(true);
  };

  const successUpdateSu = (msg: string) => {
    console.log(msg);
    setChangesSaved(true);
    updateSus();
    document.querySelector("#mySpin")?.classList.remove("fa-spin");
  };

  useEffect(() => {
    if (toggleable) {
      setChangesMade(true);
      setChangesSaved(false);
      document.querySelector("#mySpin")?.classList.add("fa-spin");
      const data = JSON.stringify({
        username: su.username,
        staffs_access: toggleable[0].status,
        schools_access: toggleable[1].status,
        forms_access: toggleable[2].status,
        mail_access: toggleable[3].status,
        sms_access: toggleable[4].status,
        restricted: restricted,
      });
      console.log(JSON.parse(data));
      updateSuperUser(data, successUpdateSu);
    }
  }, [toggleable, restricted]);

  useEffect(() => {
    if (changesMade && !changesSaved) setStatus("Unsaved changes");
    else setStatus("All changes saved");
  }, [changesMade, changesSaved]);
  const doAccountDeletion = () => {
    // Account deletion logic goes here
    console.log(`deleting ${su.username}`);
    deleteSuperUser(su.username, setResponse);
    setShowDeleteConfirmation(false);
  };

  const handleUpdateSuccess = (msg: string) => {
    setShowUpdateSu(false);
    setPopupMsg(msg);
    setShowPopup(true);
  };

  return (
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
            update={{ username: su.username }}
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
              message={`Are you sure you want to restrict '${su.username}'`}
              onConfirm={doAccountRestriction}
              onCancel={() => setShowRestrictConfirmation(false)}
            />
          )}
          {showDeleteConfirmation && (
            <PopupConfirmation
              message={`Are you sure you want to delete '${su.username}' from super users`}
              confirmText="Yes"
              onConfirm={doAccountDeletion}
              onCancel={() => setShowDeleteConfirmation(false)}
            />
          )}
          {/* <PopupConfirmation message="Are you sure you want to remove this" /> */}
          <TextMuted>
            {status}
            <i className="fa fa-refresh ml-2" id="mySpin" />
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
              <div className="w-full">
                <Text className="">{item.access}</Text>
                <span className="text-sm">{item.describ}</span>
              </div>

              <div className="w-auto">
                <label className="switch">
                  <input
                    type="checkbox"
                    defaultChecked={item.status}
                    onChange={(e) => {
                      setToggleable(
                        toggleable.map((t) =>
                          t.access === item.access
                            ? { ...t, status: e.target.checked }
                            : t
                        )
                      );
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
                  defaultChecked={restricted}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setShowRestrictConfirmation(true);
                      e.target.checked = false;
                      setRestricted(false);
                    }
                    setRestricted(false);
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
  );
};
