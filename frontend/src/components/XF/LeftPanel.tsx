import { useEffect, useState } from "react";
import {
  FormMetaDataType,
  QActionType,
  QuestionType,
  dispatchAdd,
  randomNumber,
} from "../../utils/FormUtils";
import { Text, TextBolded } from "../Text";
import QuestionThumnail from "./QuestionThumbnail";
import RibbonIcon from "./RibbonIcon";
import Overlay from "../Overlay";

interface LeftPanelProps {
  questions: QuestionType[];
  currentQIndex: number;
  setCurrentQIndex: (value: number) => void;
  dispatch: (value: QActionType) => void;
  showFormMeta: { show: boolean; setShow: (value: boolean) => void };
  showMobileMenu: { data: boolean; setData: (value: boolean) => void };
}
const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);

  useEffect(() => {
    console.log(`new selection ${props.currentQIndex}`);
    setSelectedQuestion(props.currentQIndex);
    const id = `#q${props.currentQIndex}`;
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    props.showFormMeta.setShow(false);
  }, [props.currentQIndex]);

  // useEffect(() => {

  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     // console.log(e.);
  //   }
  //   window.addEventListener('keypress', handleKeyPress);

  //   return () => window.removeEventListener('keypress', handleKeyPress);
  // }, [])
  const handleClick = () => {
    dispatchAdd(props.dispatch);
    props.setCurrentQIndex(props.questions.length);
  };

  return (
    <>
      {props.showMobileMenu.data ? (
        <Overlay className="z-index-1">
          <i
            className="absolute right-5 fa text-3xl font-weight-500 fa-times block top-2 cursor-pointer text-white"
            title="Close"
            onClick={() => props.showMobileMenu.setData(false)}
          ></i>
          <div className="fixed overflow-scroll slide-left left-0 mx-auto bg-secondary min-w-[300px] h-full">
            <Content
              onClick={handleClick}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              isMobile={true}
              {...props}
            />
          </div>
        </Overlay>
      ) : (
        <div className="hidden md:block h-full bg-secondary overflow-y-auto w-[390px]">
          <Content
            onClick={handleClick}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            {...props}
          />
        </div>
      )}
    </>
  );
};

interface Props extends LeftPanelProps {
  onClick: () => void;
  setSelectedQuestion: (v: number | null) => void;
  selectedQuestion: number | null;
  isMobile?: boolean;
}

const Content: React.FC<Props> = ({
  onClick,
  setCurrentQIndex,
  setSelectedQuestion,
  showFormMeta,
  questions,
  selectedQuestion,
  isMobile = false,
}) => {
  return (
    <>
      <div className="z-index-1 sticky top-0 w-full" onClick={onClick}>
        <Text className="text-[#eee] bg-primary border-b-2 border-gray-600 cursor-pointer hover:opacity-70 p-2 text-center">
          <i className="fa fa-plus text-white" />
          &nbsp;Add question
        </Text>
        <div className="flex bg-primary w-full">
          <RibbonIcon className="fa-arrow-up w-full border-r-2 border-gray-600 hover:opacity-70" />
          <RibbonIcon className="fa-arrow-down w-full border-r-2 border-gray-600 hover:opacity-70" />
          <div className="flex p-2 w-full cursor-pointer justify-center hover:opacity-70 border-r-2 border-gray-600">
            <i className="fa fa-arrow-up text-white text-sm text-center" />
            <i className="fa fa-arrow-up text-white text-sm text-center" />
          </div>
          <div className="flex p-2 w-full cursor-pointer justify-center hover:opacity-70">
            <i className="fa fa-arrow-down text-white text-sm text-center" />
            <i className="fa fa-arrow-down text-white text-sm text-center" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <Text className="text-[#eee] text-lg font-weight-600 text-center">
          Form meta data
        </Text>
        <div
          className={`mt-4 relative w-full h-[200px] cursor-pointer `}
          onClick={() => {
            setSelectedQuestion(null);
            setCurrentQIndex(-1);
            showFormMeta.setShow(true);
            console.log("clicekd");
          }}
        >
          <div
            className={`${
              showFormMeta.show ? "opacity-100" : "opacity-60"
            } p-4 bg-primary hover:opacity-100 h-full overflow-hidden`}
          >
            <TextBolded className="text-white text-xl font-weight-700 text-center">
              Form title & description
            </TextBolded>
          </div>
        </div>
        <Text className="mt-2 text-[#eee] text-lg fonLeftPanelt-weight-600 text-center">
          Questions
        </Text>
        {questions?.map((question, key) => (
          <QuestionThumnail
            question={question}
            index={key}
            key={key}
            selectedQuestion={selectedQuestion as number}
            id={`q${key}`}
            onClick={() => {
              setSelectedQuestion(key);
              setCurrentQIndex(key);
              showFormMeta.setShow(false);
            }}
          />
        ))}
      </div>
    </>
  );
};
export default LeftPanel;
