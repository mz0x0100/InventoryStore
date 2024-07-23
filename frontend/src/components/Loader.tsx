import { useState } from "react";
import { useTimer } from "../utils/utils";
import Container from "./Container";
import Overlay from "./Overlay";
import { Text, TextMuted } from "./Text";

interface Props {
  text?: string;
  startTimer?: boolean;
  timeout?: number;
  timeoutMsg?: string;
  onTimeout?: () => void;
}
const Loader: React.FC<Props> = ({
  text,
  startTimer,
  timeout,
  timeoutMsg,
  onTimeout,
}) => {
  const [timeoutMessage, setTimeoutMessage] = useState("");

  const handleTimeout = () => {
    setTimeoutMessage(
      timeoutMsg
        ? timeoutMsg
        : "This is taking longer than expected. Check your internet connection"
    );
    onTimeout?.();
  };
  useTimer(timeout ? timeout : 5, handleTimeout, undefined, startTimer);
  return (
    <Overlay className="z-index-5 bg-[rgba(0,0,0,0.4)]">
      <Container className="w-full h-full">
        <div className="pt-20">
          <div className={`loader-2 mx-auto`}></div>
          <Text className="text-white mx-auto text-center text-2xl">
            {text ? text : " Operation in progress..."}
          </Text>
          <Text className="text-white mx-auto text-center text-lg">
            {timeoutMessage}
          </Text>
        </div>
      </Container>
    </Overlay>
  );
};

export default Loader;

export const LoaderRegular: React.FC<{ text: string, className?:string }> = ({ text, className }) => {
  return (
    <div className={`${className} w-full justify-center items-center`}>
      <div className="loader-regular mx-auto"></div>
      <TextMuted className="text-center">{text}</TextMuted>
    </div>
  );
};
