import { Link } from "react-router-dom";
import { TextMuted } from "../Text";
import RibbonIcon from "./RibbonIcon";
import { FormMetaDataType } from "../../utils/FormUtils";
import { useEffect, useState } from "react";
import Popup from "../Popup";
import { useCreateFormRecord } from "../../utils/apicalls/forms";

interface Props {
  onSave: () => void;
  formId: string;
  formMeta: FormMetaDataType;
  setShowMobileMenu: (v: boolean) => void;
  createLink: () => void;
}
const TopPanel: React.FC<Props> = ({
  onSave,
  formId,
  formMeta,
  setShowMobileMenu,
}) => {
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [recordLink, setRecordLink] = useState("");
  const createForm = useCreateFormRecord();
  const [formToken, setFormToken] = useState("");

  const handleClick = () => {
    setShowLinkPopup(true);
    if (!recordLink) {
      createForm(formId, setFormToken);
    }
  };

  useEffect(() => {
    if (formToken) {
      setRecordLink(`http://localhost:5173/forms?id=${formId}&rt=${formToken}`);
    }
  }, [formToken]);

  const handleCopy = () => {
    // const elem = document.getElementById("recordLink");
    // elem.setSelectionRange(0, 1000);
    // document.execCommand("copy");
  };
  return (
    <div className="relative bg-secondary w-full h-[90px] p-4 shadow-3xl border-b-2 border-gray-600">
      <i
        className="absolute right-2 p-4 fa fa-lg fa-navicon text-[#f9f9f9] cursor-pointer block md:hidden"
        onClick={() => setShowMobileMenu(true)}
      ></i>
      <TextMuted className="absolute font-weight-900 left-[45%] bottom-2">
        Powered by XForms
      </TextMuted>
      <div className="flex w-full">
        <input
          type="text"
          defaultValue={formMeta.templateName}
          className="p-2 bg-transparent md:max-w-[220px] max-w-full outline-primary text-white text-xl font-weight-700"
          onChange={(e) => {
            formMeta.templateName = e.target.value;
          }}
          onClick={(e) => {
            e.currentTarget.setSelectionRange(0, 100);
          }}
        />
        <div className="hidden md:block flex">
          <div className="w-full">
            <RibbonIcon
              className="fa-save hover:bg-gray-500 rounded-md"
              onClick={onSave}
            >
              Save
            </RibbonIcon>
            <Link
              to={`/forms/preview?id=${formId}`}
              target="_blank"
              className="relative"
            >
              <RibbonIcon className="fa-eye hover:bg-gray-500 rounded-md">
                Preview
              </RibbonIcon>
            </Link>

            <RibbonIcon
              className="fa-link hover:bg-gray-500 rounded-md"
              onClick={handleClick}
            >
              Create link
            </RibbonIcon>
            {showLinkPopup && (
              <Popup
                className="p-4 absolute w-[400px] h-[100px] bg-white shadow-xl mx-auto z-index-2"
                onClose={() => setShowLinkPopup(false)}
              >
                <div className="flex w-full border-2 border-primary">
                  <input
                    type="text"
                    className="w-full h-full outline-none p-2 text-gray-500"
                    value={recordLink}
                    id="recordLink"
                    readOnly
                  />
                  <i
                    className="fa fa-copy text-xl p-2 bg-gray-300 cursor-pointer hover:bg-gray-400"
                    onClick={handleCopy}
                  />
                </div>
              </Popup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPanel;
