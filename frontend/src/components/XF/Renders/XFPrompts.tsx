import { ChangeEvent, HTMLProps, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FormMetaDataType,
  QActionType,
  QuestionType,
  fromsReducer,
  loadTemplate,
} from "../../../utils/FormUtils";
import Container from "../../../components/Container";
import { Text, TextMuted } from "../../../components/Text";
import InputForm from "../../../components/form/InputForm";
import Overlay from "../../Overlay";
import Loader from "../../Loader";
import Select from "../../form/Select";
import { isIn } from "../../../utils/utils";
import { useLoadApiFormTemplate } from "../../../utils/apicalls/forms";

interface XFPromptProps {
  preview?: { disabled: boolean };
  handleSubmit?: (
    e: React.FormEvent<HTMLFormElement>,
    questions: QuestionType[]
  ) => void;
}
const XFPrompts: React.FC<XFPromptProps> = ({ preview, handleSubmit }) => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);
  const formId = queryParam.get("id");
  const [loadedApiFormTemplate, setLoadedApiFormTemplate] = useState(false);
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const [questions, dispatch] = useReducer(fromsReducer, []);
  const loadApiFormTemplate = useLoadApiFormTemplate();
  const [formMeta, setFormMeta] = useState<FormMetaDataType>({
    formTitle: "",
    templateName: "",
    formDescription: "",
  });

  useEffect(() => {
    if (loadedApiFormTemplate && !templateLoaded) {
      loadTemplate(questions, loadedApiFormTemplate);
      setTemplateLoaded(true);
    } else {
      loadApiFormTemplate(
        formId as string,
        setLoadedApiFormTemplate,
        setFormMeta
      );
    }
  }, [loadedApiFormTemplate]);

  return (
    <div className="bg-gray-200 w-full min-h-screen">
      {!templateLoaded && <Loader text="Loading form in progress..." />}
      <Container>
        <div className="bg-white p-4 md:p-6 lg-p-8 shadow-lg rounded-xl border-t-4 border-secondary w-full">
          <h2 className="text-gray-500 text-3xl font-weight-800 text-center">
            {formMeta.formTitle}
          </h2>
          <TextMuted>{formMeta.formDescription}</TextMuted>
          {/* <div className="w-full border-b-2 border-gray-500"></div> */}
        </div>
        <Container className="w-full bg-white rounded-xl mt-4">
          <TextMuted className="py-6">
            All required fields are indicated with{" "}
            <span className="text-red-500">*</span>
          </TextMuted>
          <form action="" onSubmit={(e) => handleSubmit?.(e, questions)}>
            {questions.map((question, key) => (
              <MyQuestion
                question={question}
                key={key}
                preview={preview}
                dispatch={dispatch}
              />
            ))}
            <button
              type="submit"
              className="p-2 w-full cursor-pointer rounded-md mt-4 hover:opacity-90 bg-secondary text-center text-[#eee] font-weight-400 text-md"
              {...preview}
            >
              Submit
            </button>
          </form>
        </Container>
      </Container>
      <TextMuted className="text-center text-secondary mt-4 font-weight-900">
        Powered by XForms
      </TextMuted>
    </div>
  );
};

interface Props extends HTMLProps<HTMLDivElement> {
  question: QuestionType;
  dispatch: React.Dispatch<QActionType>;
  preview?: { disabled: boolean };
}

const MyQuestion: React.FC<Props> = ({
  question,
  dispatch,
  preview,
  ...props
}) => {
  const isRequired =
    question.validators.findIndex((i) => i.validator == "required") != -1;
  const index = question.validators.findIndex((i) => i.validator == "type");
  let inputType = "text";
  if (index != -1) inputType = question.validators[index].regex as string;

  useEffect(() => {
    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
      document.querySelectorAll(".quest").forEach((item) => {
        if (
          e.target == item ||
          isIn(e.target as EventTarget, item.childNodes)
        ) {
          item.classList.add("border-primary");
        } else {
          item.classList.remove("border-primary");
        }
      });
    };
    document.addEventListener("click", handleEvents);
    document.addEventListener("keyup", handleEvents);

    return () => {
      document.removeEventListener("click", handleEvents);
      document.removeEventListener("keyup", handleEvents);
    };
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      id: question.id,
      payload: e.target.value,
      type: "UPDATE_RESPONSE",
    });
    const elem = e.target.value;
    question.validators.map((v) => {
      v.validator == "length" && v.regex;
    });
  };
  return (
    <div className="quest p-2 border-2 rounded-lg mt-2" {...props}>
      {isRequired && (
        <div className="relative w-full min-h-[6px]">
          <span className="absolute text-red-500 right-2">*</span>
        </div>
      )}
      {(question.type == "single-choice" ||
        question.type == "multiple-choice") && (
        <div className="p-2">
          <Text className="text-xl">
            {!question.prompt ? question.title : question.prompt}:
          </Text>
          {question.type == "single-choice" && question.options.length >= 6 ? (
            <Select
              placeholder="Choose"
              value=""
              onChange={(e) => {
                dispatch({
                  id: question.id,
                  payload: e.target.value,
                  type: "UPDATE_RESPONSE",
                });
              }}
              required={isRequired}
            >
              {question.options.map((option, key) => (
                <option key={key} value={option.text}>
                  {option.text}
                </option>
              ))}
            </Select>
          ) : (
            question.options.map((op, key) => (
              <div key={key}>
                <label className="radio-container">
                  {op.text}
                  <input
                    type={`${
                      question.type == "single-choice" ? "radio" : "checkbox"
                    }`}
                    required={isRequired}
                    value={op.text}
                    className="mr-2"
                    onChange={(e) => {
                      if (question.type == "single-choice") {
                        handleChange(e);
                      } else {
                        dispatch({
                          type: e.target.checked
                            ? "APPEND_RESPONSE_CHECKBOX"
                            : "REMOVE_RESPONSE_CHECKBOX",
                          id: question.id,
                          payload: e.target.value,
                        });
                      }
                    }}
                    name={question.title}
                    {...preview}
                  />
                  <span className="checkmark"></span>
                </label>

                {/* <TextMuted className="inline text-lg"></TextMuted> */}
                <br />
              </div>
            ))
          )}
        </div>
      )}
      {question.type == "short-answer" && (
        <div className="p-2">
          <InputForm
            type={inputType}
            name="input"
            placeholder={question.prompt ? question.prompt : question.title}
            className="p-2 focus:border-b-primary text-lg"
            onChange={handleChange}
            {...preview}
            required={isRequired}
            id={`ans${question.id}`}
          />
        </div>
      )}
      {question.type == "date" && (
        <div className="p-2">
          <Text>{question.prompt}:</Text>
          <InputForm
            type="date"
            name="input"
            className="p-2 focus:border-b-primary text-lg"
            onChange={handleChange}
            {...preview}
            required={isRequired}
          />
        </div>
      )}
      {question.type == "file-upload" && (
        <div className="p-2">
          <Text className="text-lg">{question.prompt}:</Text>
          <input
            type="file"
            name={question.title}
            className="p-2 focus:border-b-primary text-lg w-full rounded-md"
            onChange={handleChange}
            {...preview}
            required={isRequired}
          />
        </div>
      )}
      <div id={`fieldError${question.id}`}></div>
    </div>
  );
};

export default XFPrompts;
