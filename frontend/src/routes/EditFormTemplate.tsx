import { useEffect, useReducer, useState } from "react";
import Container from "../components/Container";
import InputForm from "../components/form/InputForm";
import TextArea from "../components/form/TextArea";
import {
  FormMetaDataType,
  OptionsType,
  QFTypes,
  QuestionType,
  dispatchAdd,
  fromsReducer,
  getQuestionTypeText,
  handleSaveTemplate,
  questionOptionsList,
  randomNumber,
} from "../utils/FormUtils";
import { Text, TextBolded, TextMuted } from "../components/Text";
import { useLocation } from "react-router-dom";
import Overlay from "../components/Overlay";
import { Popup } from "../components/Popups";
import {
  useLoadApiFormTemplate,
  useUpdateApiFormTemplate,
} from "../utils/apicalls/forms";

const initialState: QuestionType[] = [];
const EditFormTemplate: React.FC = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);
  const formId = queryParam.get("form_id");
  const [loadedApiFormTemplate, setLoadedApiFormTemplate] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");
  const [questions, dispatch] = useReducer(fromsReducer, initialState);
  const [showError, setShowError] = useState(false);
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const loadApiFormTemplate = useLoadApiFormTemplate();
  const updateApiFormTemplate = useUpdateApiFormTemplate();

  useEffect(() => {
    if (formId) {
      loadApiFormTemplate(formId as string, setLoadedApiFormTemplate, null);
    } else {
      setShowError(true);
      setErrorMsg("Form id does not exists id in the URL");
    }
  }, []);

  useEffect(() => {
    if (loadedApiFormTemplate && !templateLoaded) {
      let templateRecords = Array(loadedApiFormTemplate);
      templateRecords = JSON.parse(templateRecords[0]);
      console.log(templateRecords);
      templateRecords.map((record: any) => {
        console.log(record);
        const options = new String(record.Options);
        const optionIds = new String(record.OptionIds);
        const optionsArr = options.split(",");
        const optionIdsArr = optionIds.split(",");

        const acutalOptions: OptionsType[] = [];
        for (let i = 0; i < optionsArr.length; i++) {
          const optionDump: OptionsType = {
            text: optionsArr[i],
            id: Number(optionIdsArr[i]),
          };
          console.log(optionDump);
          acutalOptions.push(optionDump);
        }
        const question: QuestionType = {
          id: record.id,
          title: record.title,
          type: record.type,
          prompt: record.prompt,
          options: acutalOptions,
          validators: [],
        };
        questions.push(question);
      });
      setTemplateLoaded(true);
    }
  }, [loadedApiFormTemplate]);

  const handleSave = () => {
    handleSaveTemplate(
      formId as string,
      { formDescription: "", templateName: "", formTitle: "" },
      questions,
      updateApiFormTemplate
    );
  };

  const handleClick = () => {
    dispatchAdd(dispatch);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    // console.log(e.currentTarget.value);

    const id = e.currentTarget.id;
    const newQuestionType = e.currentTarget.value as QFTypes;
    console.log(newQuestionType);
    console.log(id);

    dispatch({
      type: "UPDATE_QUESTION_TYPE",
      id: id as unknown as number,
      payload: newQuestionType,
    });
  };

  return (
    <>
      {showError ? (
        <Overlay className="bg-[rgba(0,0,0,0.7)]">
          <Popup location="top" className="bg-red-600">
            <Text className="text-white text-xl">{errorMsg}</Text>
          </Popup>
        </Overlay>
      ) : (
        <>
          <div className="relative w-full bg-gray-400 min-h-[90px] border-primary">
            <div className="p-4 flex absolute right-4">
              <MyIconButton className="fa-save" onClick={handleSave}>
                Save
              </MyIconButton>
              <MyIconButton className="fa-eye">Preview</MyIconButton>
              <MyIconButton className="fa-link">Create link</MyIconButton>
            </div>
          </div>
          <Container className="bg-gray-200 min-h-screen">
            <Container className="bg-white shadow-lg rounded-xl border-t-4 border-secondary">
              <InputForm
                placeholder="Form Title"
                className="text-2xl text-bold"
                name="title"
                id="title"
              />
              <TextArea placeholder="Form description" name="description" />
            </Container>
            {questions.map((question, key) => (
              <Container
                className="bg-white shadow-lg rounded-xl mt-4"
                key={key}
              >
                {/* <div className="absolute top-2 right-2"> */}
                <div className="flex w-full relative">
                  <TextMuted className="pt-1">Validators: </TextMuted>
                  {/* <MyValidator>Required</MyValidator>
                  <MyValidator>Email</MyValidator> */}
                  <MyIconButton className="fa fa-plus hover:bg-blue-500">
                    Add
                  </MyIconButton>
                  <i
                    title="Remove"
                    className="absolute top-2 right-2 md:right-4 fa fa-trash fa-md cursor-pointer"
                  />
                </div>
                <div className="max-w-[200px] min-h-[64px] shadow-xl bg-white"></div>
                {/* </div> */}
                <div className="pt-5 grid grid-cols-3">
                  <InputForm
                    value={question.title}
                    placeholder="Enter title [this is the column name]"
                    className="col-1 col-span-2"
                    id={`qTitle${question.id}`}
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_QUESTION_TITLE",
                        id: question.id,
                        payload: e.target.value,
                      });
                    }}
                  />
                  <select
                    className="p-2 rounded-xl"
                    onChange={handleSelect}
                    defaultValue={question.type}
                    id={`${question.id}`}
                  >
                    {questionOptionsList.map((option) => (
                      <option value={option}>
                        {getQuestionTypeText(option)}
                      </option>
                    ))}
                  </select>
                </div>
                <InputForm
                  value={question.prompt}
                  placeholder="Type the question here..."
                  className="col-1 col-span-2"
                  id={`q${question.id}`}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_QUESTION",
                      id: question.id,
                      payload: e.target.value,
                    });
                  }}
                />
                {question.type != "short-answer" ? (
                  <>
                    {question.options.map((option, optKey) => (
                      <div className="md:grid md:grid-cols-4" key={optKey}>
                        <div className="flex md:col-1 md:col-span-2">
                          <TextBolded className="min-w-[70px]">
                            Option {optKey + 1}:{" "}
                          </TextBolded>
                          <InputForm
                            placeholder="Enter option"
                            name={`option${optKey}`}
                            value={option.text}
                            onChange={(e) =>
                              dispatch({
                                type: "UPDATE_QUESTION_OPTION",
                                questionId: question.id,
                                optionId: option.id,
                                payload: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      className="text-sm cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                      onClick={() =>
                        dispatch({
                          type: "ADD_OPTION",
                          questionId: question.id,
                          payload: { id: randomNumber(), text: "" },
                        })
                      }
                    >
                      <i className="fa fa-plus" />
                      Add option
                    </button>
                  </>
                ) : (
                  <TextMuted>
                    User will be prompted with an input field to write the
                    answer
                  </TextMuted>
                )}
              </Container>
            ))}
            <button
              className="fa fa-plus bg-secondary p-3 w-full text-center mt-2 hover:opacity-90 text-md text-white rounded-xl"
              onClick={handleClick}
            >
              &nbsp;Add question
            </button>
          </Container>
        </>
      )}
    </>
  );
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const MyIconButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`fa ${className} text-sm cursor-pointer hover:bg-gray-500 p-2 rounded-md`}
      {...props}
    >
      &nbsp;{children}
    </button>
  );
};

interface ValidatorProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const MyValidator: React.FC<ValidatorProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={`${className} relative rounded-2xl ml-2 min-w-[50px] p-1 flex hover:bg-gray-200 border-2 border-gray-400 bg-gray-100`}
      {...props}
    >
      <TextMuted>
        {children}&nbsp;&nbsp;{" "}
        <i className="fa fa-close mt-1 cursor-pointer"></i>
      </TextMuted>
    </div>
  );
};
export default EditFormTemplate;
