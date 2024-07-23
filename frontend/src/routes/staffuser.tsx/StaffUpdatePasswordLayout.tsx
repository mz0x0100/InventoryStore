import React, { ReactNode, useState } from "react";
import Backarrow from "../../components/Backarrow";
import { FeedbackText, Text, TextMuted } from "../../components/Text";
import PasswordField from "../../components/PasswordField";
import Loader from "../../components/Loader";
import { Popup } from "../../components/Popups";
import { isValidPassword, useTimer } from "../../utils/utils";
import useAxiosApiCall from "../../utils/axios_instance";
import { useCurrentUser } from "../../utils/contexts/CurrentUserContext";

const StaffUpdatePasswordLayout: React.FC<{
  username?: string;
  onClose?: () => void;
}> = ({ username, onClose }) => {
  const axiosApiCall = useAxiosApiCall();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [passwordErrorFeedback, setPasswordErrorFeedback] =
    useState<ReactNode>();
  const [cPasswordErrorFeedback, setCPasswordErrorFeedback] =
    useState<ReactNode>();
  const [showError, setShowError] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState<ReactNode>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState("");
  const { currentUser } = useCurrentUser();

  const backHistory = () => {
    currentUser?.role == "staffuser" ? history.back() : onClose?.();
  };

  useTimer(3, backHistory, undefined, showSuccess);

  const handleApiCallSuccess = () => {
    setShowLoader(false);
    setShowSuccess(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoader(true);
    if (!isValidPassword(newPassword) || newPassword !== confirmPassword) {
      setErrorFeedback("Please fix the error(s) before proceeding!");
      setShowError(true);
      setShowLoader(false);
      return;
    }

    await axiosApiCall
      .post(
        "/staff/update_password",
        JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          username: username,
        }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.data.succedded) {
          setSuccessFeedback(response.data.msg);
          handleApiCallSuccess();
        } else {
          setErrorFeedback(response.data.msg);
          setShowError(true);
          setShowLoader(false);
        }
      });
  };

  return (
    <div>
      {showLoader && <Loader />}
      <div className="p-2 md:p-4">
        <Backarrow
          onClick={() =>
            currentUser?.role === "staffuser" ? history.back() : onClose?.()
          }
        />
        <div className="block mt-2">
          <TextMuted className="text-xl font-bold text-center w-full">
            Update password
          </TextMuted>
          {showError && (
            <Popup
              className="p-4 md:p-8 bg-red-300 mb-6"
              location="top"
              dismissable
              onDismiss={() => setShowError(false)}
            >
              <i className="fa fa-exclamation-circle text-2xl text-red-400 mr-3" />
              <Text className="text-white text-inline">{errorFeedback}</Text>
            </Popup>
          )}
          {showSuccess && (
            <Popup className="p-4 md:p-8 bg-green-300 mb-6" location="top">
              <i className="fa fa-check-circle text-2xl text-green-400 mr-3" />
              <Text className="text-gray-700 text-inline">
                {successFeedback}
              </Text>
            </Popup>
          )}
          <form action="" onSubmit={handleSubmit}>
            {currentUser?.role === "staffuser" && (
              <div className="mt-2 data-container border-2 rounded-lg p-2 md:p-4">
                <TextMuted className="font-weight-500">
                  Current password:
                </TextMuted>
                <PasswordField
                  iconclass="fa-key"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mt-2 data-container border-2 rounded-lg p-2 md:p-4">
              <TextMuted className="font-weight-500">New password:</TextMuted>
              <PasswordField
                iconclass="fa-key"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => {
                  let pass = e.target.value;
                  let digit = "Password must contain at least 1 digit";
                  let upper =
                    "Password must contain at least 1 uppercase letter";
                  let lower =
                    "Password must contain at least 1 lowercase letter";
                  let len =
                    "Password must contain at least 8 characters length";
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
                  setPasswordErrorFeedback(f);
                  setNewPassword(e.target.value);
                }}
                required
              />
              <div className="md:p-2">{passwordErrorFeedback}</div>
            </div>
            <div className="mt-2 data-container border-2 rounded-lg p-2 md:p-4">
              <TextMuted className="font-weight-500">
                Confirm password:
              </TextMuted>
              <PasswordField
                iconclass="fa-key"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  let f: ReactNode = null;
                  if (e.target.value !== newPassword) {
                    f = (
                      <FeedbackText category="ERROR">
                        Passwords must match
                      </FeedbackText>
                    );
                  }
                  setCPasswordErrorFeedback(f);
                  setConfirmPassword(e.target.value);
                }}
                required
              />
              <div className="md:p-2">{cPasswordErrorFeedback}</div>
            </div>
            <button className="w-full bg-primary p-4 font-weight-500 hover:opacity-80 text-center mt-4 rounded-lg text-white">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffUpdatePasswordLayout;
