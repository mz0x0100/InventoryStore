import { HTMLProps, useRef, useState } from "react";
import {
  QActionType,
  QFTypes,
  QuestionType,
  getQuestionTypeText,
  questionOptionsList,
  randomNumber,
} from "../../utils/FormUtils";
import { TextMuted } from "../Text";
import InputForm from "../form/InputForm";
import Select from "../form/Select";
import Validators from "./Validators";

interface Props extends HTMLProps<HTMLDivElement> {
  question: QuestionType;
  saveRemove: (q: QuestionType) => void;
  dispatch: (value: QActionType) => void;
}
const Question: React.FC<Props> = ({
  question,
  saveRemove,
  dispatch,
  ...props
}) => {
  const [showAddValidator, setShowAddValidator] = useState(false);
  const prevOp = useRef(question.type);

  return (
    <div
      className="p-4 md:p-6 md:p-8 bg-white shadow-lg rounded-xl mt-4"
      {...props}
    >
      {showAddValidator && (
        <Validators
          question={question}
          dispatch={dispatch}
          onClose={() => setShowAddValidator(false)}
        />
      )}
      {/* <div className="absolute top-2 right-2"> */}
      <div className="flex w-full relative">
        <TextMuted className="pt-1">Validators: </TextMuted>
        {question.validators.map((validator, key) =>
          question.type == "short-answer" ? (
            <MyValidator
              key={key}
              onRemove={() => {
                validator.validator !== "type" &&
                  dispatch({
                    type: "REMOVE_QUESTION_VALIDATOR",
                    questionId: question.id,
                    validator: validator.validator,
                  });
              }}
            >
              {validator.validator != "type"
                ? validator.validator
                : (validator.regex as string)}
            </MyValidator>
          ) : (
            validator.validator == "required" && (
              <MyValidator
                key={key}
                onRemove={() => {
                  dispatch({
                    type: "REMOVE_QUESTION_VALIDATOR",
                    questionId: question.id,
                    validator: validator.validator,
                  });
                }}
              >
                {validator.validator}
              </MyValidator>
            )
          )
        )}

        <button
          onClick={() => setShowAddValidator(true)}
          className="fa fa-plus text-gray-700 ml-2 p-2 rounded-xl hover:bg-gray-400"
        ></button>
        <i
          title="Remove"
          className="absolute top-2 right-2 md:right-4 fa fa-trash fa-md cursor-pointer"
          onClick={() => {
            saveRemove(question);
          }}
        />
      </div>
      {/* <div className="max-w-[200px] min-h-[64px] shadow-xl bg-white"></div> */}
      {/* </div> */}
      <div className="pt-5 md:grid md:grid-cols-3">
        <Select
          defaultValue={question.type}
          id={`${question.id}`}
          onChange={(e) => {
            dispatch({
              type: "UPDATE_QUESTION_TYPE",
              id: question.id,
              payload: e.target.value as QFTypes,
            });
          }}
        >
          {questionOptionsList.map((option, key) => (
            <option value={option} key={key}>
              {getQuestionTypeText(option)}
            </option>
          ))}
        </Select>
        <InputForm
          value={question.title}
          placeholder="Enter title [this is the column name]"
          className="md:col-1 md:col-span-2"
          id={`qTitle${question.id}`}
          onChange={(e) => {
            dispatch({
              type: "UPDATE_QUESTION_TITLE",
              id: question.id,
              payload: e.target.value,
            });
            // console.log(question.title);
            // if (!question.prompt && question.title) {
            //   let q = document.querySelector(`#q${question.id}`);
            //   console.log(q);
            //   q?.setAttribute(
            //     "value",
            //     `Enter ${question.title.toLocaleLowerCase()}`
            //   );
            // }
          }}
        />
      </div>
      <InputForm
        defaultValue={question.prompt}
        placeholder="Type the question here...[optional]"
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

      {(question.type == "single-choice" ||
        question.type == "multiple-choice") && (
        <>
          {question.options.map((option, optKey) => (
            <div className="" key={optKey}>
              <div className="md:grid md:grid-cols-4">
                <TextMuted className="w-full md:col-span-1 p-2">
                  <i
                    className="fa fa-times cursor-pointer hover:opacity-80 text-lg mr-2"
                    title="remove"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_QUESTION_OPTION",
                        optionId: option.id,
                        questionId: question.id,
                      });
                    }}
                  />
                  Option {optKey + 1}:{" "}
                </TextMuted>
                <InputForm
                  className="md:col-span-3"
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

          {
            <button
              className="text-sm cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              onClick={() => {
                dispatch({
                  type: "ADD_OPTION",
                  questionId: question.id,
                  payload: { id: randomNumber(), text: "" },
                });
              }}
            >
              <i className="fa fa-plus" />
              Add option
            </button>
          }
        </>
      )}
      {question.type == "short-answer" && (
        <TextMuted>
          Responder will be prompted with an input field to provide the answer
        </TextMuted>
      )}
      {question.type == "file-upload" && (
        <TextMuted>Responder will be asked to upload a file</TextMuted>
      )}
      {question.type == "date" && (
        <TextMuted>
          Responder will be prompted with an input field to provide the date
        </TextMuted>
      )}
    </div>
  );
};

export default Question;

interface ValidatorProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onRemove: () => void;
}

const MyValidator: React.FC<ValidatorProps> = ({
  className,
  children,
  onRemove,
  ...props
}) => {
  return (
    <div
      className={`${className} relative rounded-2xl ml-2 min-w-[50px] p-1 flex hover:bg-gray-200 border-2 border-gray-400 bg-gray-100`}
      {...props}
    >
      <TextMuted>
        {children}&nbsp;&nbsp;{" "}
        <i className="fa fa-close mt-1 cursor-pointer" onClick={onRemove}></i>
      </TextMuted>
    </div>
  );
};
{
  /* <Overlay className="place-top w-full">
        <Container className="relative p-6 max-w-[800px] h-[400px] mx-auto mt-24 bg-white">
          <TextMuted className="font-weight-600 text-xl">Select validator</TextMuted>
          <input type="checkbox" name="required" /> <TextMuted className="ml-2 inline">Required</TextMuted><br />
          <input type="checkbox" name="length" /><TextMuted className="ml-2 col-1 col-span-2 inline">Length:</TextMuted>
          <div className="p-2 grid grid-cols-2 w-full">
            <div className="col-2 col-span-1 flex">
              <TextMuted className="mr-2">Max:</TextMuted><input className="border-2 p-1 rounded" type="number" readOnly/> 
            </div>
            <div className="col-3 col-span-1 flex">
              <TextMuted className="mr-2">Min:</TextMuted><input className="border-2 p-1 rounded" type="number" readOnly/> 
            </div>
          </div>
          <input type="checkbox" name="input_type" /><TextMuted className="ml-2 col-1 col-span-2 inline">Input type:</TextMuted><br />
          <div className="p-2">
            <input type="radio" name="type" value={"number"}/> <TextMuted className="inline">Number</TextMuted><br/>
            <input type="radio" name="type" value="email" /> <TextMuted className="inline">Email</TextMuted>
          </div>
        </Container>
      </Overlay> */
}
