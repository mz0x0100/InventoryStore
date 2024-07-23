import { useEffect, useState } from "react";
import InputWithIcon from "../../components/InputWithIcon";
import Loader from "../../components/Loader";
import PasswordField from "../../components/PasswordField";
import { Popup } from "../../components/Popups";
import { FeedbackText, Text } from "../../components/Text";
import { isValidPassword } from "../../utils/utils";
import { useCUSuperUser } from "../../utils/apicalls/superusers";

const CUSUComponent: React.FC<{
  onSuccess?: (msg: string) => void;
  update?: { username: string };
}> = ({ onSuccess, update }) => {
  const updateView = typeof update !== "undefined";
  const [username, setUsername] = useState(updateView ? update.username : "");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [passErrFeedback, setPassErrFeedback] = useState<React.ReactNode>();
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState<any>();
  const [showProgress, setShowProgress] = useState(false);
  // const [start]
  const createSuperUser = useCUSuperUser(updateView, update?.username);

  useEffect(() => {
    if (response) {
      setShowProgress(false);
      if (!response.succeeded) {
        setErrorMsg(response.msg);
        setShowError(true);
      } else {
        onSuccess?.(response.msg);
      }
    }
  }, [response]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setShowError(true);
      setErrorMsg("Password is too weak. Please check and try again!");
      return;
    }
    setShowProgress(true);
    createSuperUser(username, password, setResponse);
  };

  return (
    <>
      {showProgress && <Loader />}
      {showError && (
        <Popup className="p-4 bg-red-100 text-gray-700 my-8" inplace>
          {errorMsg}
        </Popup>
      )}
      <form action="" onSubmit={handleSubmit}>
        <InputWithIcon
          iconclass="fa-user"
          type="text"
          placeholder="Su username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordField
          required
          iconclass="fa-key"
          placeholder="Su password"
          onChange={(e) => {
            let pass = e.target.value;
            let digit = "Password must contain at least 1 digit";
            let upper = "Password must contain at least 1 uppercase letter";
            let lower = "Password must contain at least 1 lowercase letter";
            let len = "Password must contain at least 8 characters length";
            let f: React.ReactNode = null;
            f = (
              <>
                {/(?=.*\d)/.test(pass) ? (
                  <FeedbackText category="SUCCESS">{digit}</FeedbackText>
                ) : (
                  <FeedbackText category="ERROR">{digit}</FeedbackText>
                )}
                {/(?=.*[A-Z])/.test(pass) ? (
                  <FeedbackText category="SUCCESS">{upper}</FeedbackText>
                ) : (
                  <FeedbackText category="ERROR">{upper}</FeedbackText>
                )}
                {/(?=.*[a-z])/.test(pass) ? (
                  <FeedbackText category="SUCCESS">{lower}</FeedbackText>
                ) : (
                  <FeedbackText category="ERROR">{lower}</FeedbackText>
                )}
                {pass.length >= 8 ? (
                  <FeedbackText category="SUCCESS">{len}</FeedbackText>
                ) : (
                  <FeedbackText category="ERROR">{len}</FeedbackText>
                )}
              </>
            );
            setPassErrFeedback(f);
            setPassword(pass);
          }}
        />
        <div className="">{passErrFeedback}</div>
        <button className="p-2 bg-primary rounded-md text-white my-4 w-full hover:opacity-80">
          {updateView ? "Update" : "Create su"}
        </button>
        {!updateView && (
          <div className="mt-8 w-full bg-yellow-200 p-4 flex rounded-md">
            <i className="fa fa-warning text-2xl text-yellow-400"></i>
            <Text className="text-gray-700 ml-4">
              Creating a super user account allows the user to have certain
              access and perform certain operations on the server
            </Text>
          </div>
        )}
      </form>
    </>
  );
};

export default CUSUComponent;
