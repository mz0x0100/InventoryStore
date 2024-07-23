import { useEffect, useRef, useState } from "react";
import { useTimer } from "../utils/utils";

interface AlertProps {
  children: React.ReactNode;
  onClose: () => void;
}
export const AlertPopup: React.FC<AlertProps> = ({ children, onClose }) => {
  return (
    <>
      {
        <div
          className={`bg-secondary text-white slide-up fixed shadow-xl p-2 rounded-xl border-1 right-4 bottom-4 min-w-[250px] md:min-w-[300px] max-w-[350px]`}
        >
          <div className="relative hover:opacity-85">
            <i
              className="fa fa-times-circle text-red-500 absolute right-0 text-md"
              onClick={onClose}
              title="Close"
            ></i>
          </div>
          {children}
        </div>
      }
    </>
  );
};

interface AlertMetaProps {
  title: string;
  category: "SUCCESS" | "ERROR" | "INFO";
}
export const AlertMeta = ({ title, category }: AlertMetaProps) => {
  //  for info fa-question-circle or fa-info-circle
  let categoryClass;
  let colorClass;
  switch (category) {
    case "SUCCESS":
      categoryClass = "fa-check-circle";
      colorClass = "text-green-500";
      break;
    case "ERROR":
      categoryClass = "fa-exclamation-circle";
      colorClass = "text-red-500";
      break;

    default:
      categoryClass = "fa-question-circle";
      colorClass = "text-blue-500";
      break;
  }
  const className = `fa ${categoryClass} ${colorClass} text-lg`;
  return (
    <div className="border-b-2 border-gray-700">
      <i className={`${className} mr-4`}></i>
      <b className={`text-lg bold`}>{title}</b>
    </div>
  );
};

export const AlertBody = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  const myClass = `p-2 ${className}`;
  return <div className={`${myClass}`}>{props.children}</div>;
};

interface PopupTimerProps extends PopupProps{
  timeout: number;
  onTimeout?: () => void;
}
// Popup that uses a timer before it disappears
export const PopupTimer: React.FC<PopupTimerProps> = ({
  timeout,
  children,
  onTimeout,
  ...props
}) => {
  const [timeoutElapsed, setTimeoutElapsed] = useState(false);
  
  const handleTimeout = () => {
    setTimeoutElapsed(true);
    onTimeout?.();
  }
  useTimer(timeout, handleTimeout);

  return <>{!timeoutElapsed && <Popup {...props}>{ children }</Popup>}</>;
};

interface PopupProps {
  children: React.ReactNode;
  location?: "top" | "bottom";
  className?: string;
  inplace?: boolean;
  dismissable?: boolean;
  onDismiss?: () => void;
}
export const Popup: React.FC<PopupProps> = ({
  children,
  className,
  location = "bottom",
  ...props
}) => {
  let classNames =
    !props.inplace && location == "bottom"
      ? "left-4 bottom-4 slide-up"
      : "justify-center top-4 mx-auto slide-up";
  classNames = `${classNames} ${className}`;
  classNames = props.inplace ? `${classNames} relative` : `${classNames} fixed`;

  return (
    <>
      <div
        className={`${classNames} bg-black flex p-4 rounded-lg ${
          !props.inplace && "right-[30%]"
        }`}
      >
        <div className="absolute right-2 top-2">
          {props.dismissable && (
            <i
              className="fa fa-times text-xl cursor-pointer"
              onClick={() => props.onDismiss?.()}
            ></i>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
