import { useEffect, useReducer, useState } from "react";
import LeftPanel from "../components/XF/LeftPanel";
import TopPanel from "../components/XF/TopPanel";
import {
  FormMetaDataType,
  QuestionType,
  dispatchAdd,
  fromsReducer,
  handleSaveTemplate,
  loadTemplate,
} from "../utils/FormUtils";
import Question from "../components/XF/Question";
import RibbonIcon from "../components/XF/RibbonIcon";
import { useLocation } from "react-router-dom";
import Overlay from "../components/Overlay";
import { Popup } from "../components/Popups";
import { Text } from "../components/Text";
import BottomPanel from "../components/XF/BottomPanel";
import InputForm from "../components/form/InputForm";
import TextArea from "../components/form/TextArea";
import Loader from "../components/Loader";
import {
  useLoadApiFormTemplate,
  useUpdateApiFormTemplate,
} from "../utils/apicalls/forms";

const initialState: QuestionType[] = [];
const XF: React.FC = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);
  const formId = queryParam.get("form_id");
  const [currentQIndex, setCurrentQIndex] = useState(-1);
  const [loadedApiFormTemplate, setLoadedApiFormTemplate] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");
  const [questions, dispatch] = useReducer(fromsReducer, initialState);
  const [formMeta, setFormMeta] = useState<FormMetaDataType>({
    formDescription: "",
    formTitle: "",
    templateName: "",
  });
  const [showError, setShowError] = useState(false);
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const [templateState, setTemplateState] = useState("Saved");
  const undoableStates = useState<QuestionType[]>(questions);
  const redoableStates = useState<QuestionType[] | null>(null);
  const [count, setCount] = useState(0);

  const [showFormMeta, setShowFormMeta] = useState(true);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const loadApiFormTemplate = useLoadApiFormTemplate();
  const updateApiFormTemplate = useUpdateApiFormTemplate();

  useEffect(() => {
    if (count > 0) {
      setTemplateState("Unsaved*");
    }
    setCount((prev) => prev + 1);
  }, [questions]);

  useEffect(() => {
    if (formId) {
      loadApiFormTemplate(
        formId as string,
        setLoadedApiFormTemplate,
        setFormMeta
      );
    } else {
      setShowError(true);
      setErrorMsg("Form id does not exists id in the URL");
    }
  }, []);

  useEffect(() => {
    if (loadedApiFormTemplate && !templateLoaded) {
      loadTemplate(questions, loadedApiFormTemplate);
      setTemplateLoaded(true);
      console.log(questions);
    }
  }, [loadedApiFormTemplate, initialState]);

  const useQNavigator = () => {
    const nextQuestion = () => {
      const nextIndex = currentQIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQIndex(nextIndex);
      }
    };
    const previousQuestion = () => {
      const prevIndex = currentQIndex - 1;
      if (prevIndex >= 0) {
        setCurrentQIndex(prevIndex);
      }
    };
    return {
      nextQuestion: nextQuestion,
      previousQuestion: previousQuestion,
    };
  };

  const useChangeIndex = () => {
    const up = () => {
      const nextIndex = currentQIndex + 1;
      if (nextIndex < questions.length) {
        const currentQ = questions[currentQIndex];
        const nextQ = questions[nextIndex];

        questions[currentQIndex] = nextQ;
        questions[nextIndex] = currentQ;
      }
    };

    return up;
  };
  const handleSave = () => {
    handleSaveTemplate(
      formId as string,
      formMeta as FormMetaDataType,
      questions,
      updateApiFormTemplate
    );
    setTemplateState("Saved");
  };

  useEffect(() => {
    setShowFormMeta(true);
  }, []);
  const saveRemove = (question: QuestionType) => {
    if (question === questions[questions.length - 1]) {
      // If this is the last item
      if (questions.length == 1) {
        setShowFormMeta(true);
      } else {
        setCurrentQIndex(currentQIndex - 1);
      }
    }
    dispatch({ type: "REMOVE", id: question.id });
  };

  const createLink = () => {};

  const questionsNav = useQNavigator();
  return (
    <>
      {!templateLoaded && <Loader text="Template loading in progress..." />}
      <div className="bg-gray-200 w-full overflow-hidden">
        {showError && (
          <Overlay className="bg-[rgba(0,0,0,0.7)]">
            <Popup location="top" className="bg-red-600">
              <Text className="text-white text-xl">{errorMsg}</Text>
            </Popup>
          </Overlay>
        )}
        <TopPanel
          onSave={handleSave}
          formId={formId as string}
          formMeta={formMeta}
          setShowMobileMenu={setShowMobileMenu}
          createLink={createLink}
        />
        <div className="my-panels-container relative flex">
          <LeftPanel
            questions={questions}
            currentQIndex={currentQIndex}
            showFormMeta={{ show: showFormMeta, setShow: setShowFormMeta }}
            setCurrentQIndex={setCurrentQIndex}
            dispatch={dispatch}
            showMobileMenu={{
              data: showMobileMenu,
              setData: setShowMobileMenu,
            }}
          />

          <div className="p-2 md:p-8 align-center w-full overflow-y-scroll min-h-[90px]">
            {questions.length >= 1 && currentQIndex != -1 && (
              <>
                <div className="flex w-full">
                  <RibbonIcon
                    className="text-black mr-auto text-md fa-arrow-left text-md bg-primary min-w-[100px] rounded-md hover:bg-gray-500"
                    onClick={questionsNav.previousQuestion}
                  >
                    Previous
                  </RibbonIcon>
                  <RibbonIcon
                    className="text-black fa-arrow-right text-md bg-primary min-w-[100px] rounded-md hover:bg-gray-500"
                    onClick={questionsNav.nextQuestion}
                  >
                    Next
                  </RibbonIcon>
                </div>
                <Question
                  question={questions[currentQIndex]}
                  dispatch={dispatch}
                  key={questions[currentQIndex].id}
                  saveRemove={saveRemove}
                />
                <button
                  className="bg-secondary text-white text-lg w-full p-2 fa fa-plus mr-2 mt-3 rounded-md"
                  onClick={() => {
                    dispatchAdd(dispatch);
                    setCurrentQIndex(questions.length);
                  }}
                >
                  Add question
                </button>
              </>
            )}
            {showFormMeta && (
              <div className="p-4 md:p-6 lg:p-8 bg-white shadow-lg rounded-xl border-t-4 border-secondary">
                <InputForm
                  placeholder="Form Title"
                  className="text-2xl text-bold"
                  name="title"
                  defaultValue={formMeta.formTitle}
                  onChange={(e) => {
                    formMeta.formTitle = e.target.value;
                  }}
                  id="title"
                />
                <TextArea
                  placeholder="Form description"
                  name="description"
                  defaultValue={formMeta.formDescription}
                  onChange={(e) => {
                    formMeta.formDescription = e.currentTarget.value;
                    console.log(e.currentTarget.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <BottomPanel tState={templateState} />
      </div>
    </>
  );
};

export default XF;
