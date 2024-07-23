import { useEffect, useState } from "react";
import { Text } from "../components/Text";
import { AlertBody, AlertMeta, AlertPopup } from "../components/Popups";
import { useAPIRequestError } from "./contexts/APIRequestErrorContext";

export const APIRequestErrorNotifier: React.FC = () => {
  const { apiRequestError } = useAPIRequestError();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (typeof apiRequestError?.message != "undefined") {
      setErrorMessage(apiRequestError?.message);
      setShowAlert(false);
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [apiRequestError]);

  return (
    <>
      {showAlert && errorMessage && (
        <AlertPopup onClose={handleClose}>
          <AlertMeta title="Request Error" category="ERROR" />
          <AlertBody>
            <Text className={`text-sm md:text-md`}>{errorMessage}</Text>
          </AlertBody>
        </AlertPopup>
      )}
    </>
  );
};
