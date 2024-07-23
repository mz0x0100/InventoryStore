import { HTMLProps, useEffect } from "react";
import { randomNumber } from "../utils/FormUtils";
import Overlay from "./Overlay";
import { TextMuted } from "./Text";

interface Props extends HTMLProps<HTMLDivElement> {
  onClose?: () => void;
}

const Popup: React.FC<Props> = ({ onClose, children, className, ...props }) => {
  const id = randomNumber(345000);

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    const popup = document.querySelector(`#popup${id}`);
    popup?.addEventListener("onclosepopup", handleClose);

    return () => popup?.removeEventListener("onclosepopup", handleClose);
  }, []);

  return (
    <div className={`popup ${className}`} {...props} id={`popup${id}`}>
      {children}
    </div>
  );
};

export default Popup;

interface PopupConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
}
export const PopupConfirmation: React.FC<PopupConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
}) => {
  return (
    <Overlay className="z-index-8 pt-[60px]">
      <Popup
        className="mx-auto p-4 w-[350px] bg-white shadow-xl"
        onClose={onCancel}
      >
        <TextMuted>{message}</TextMuted>

        <div className=" mt-10 flex">
          <button
            className="p-2 rounded-md ml-4 text-white bg-secondary w-full hover:opacity-80"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="p-2 rounded-md ml-4 text-white bg-red-400 w-full hover:opacity-80"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </Popup>
    </Overlay>
  );
};
