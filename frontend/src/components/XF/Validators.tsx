import { useEffect, useState } from "react";
import {
  InputType,
  QActionType,
  QuestionType,
  randomNumber,
} from "../../utils/FormUtils";
import Container from "../Container";
import Overlay from "../Overlay";
import Popup from "../Popup";
import { TextMuted } from "../Text";
import Select from "../form/Select";

interface Props {
  question: QuestionType;
  dispatch: (value: QActionType) => void;
  onClose: () => void;
}

const Validators: React.FC<Props> = ({ question, dispatch, onClose }) => {
  const [required, setRequired] = useState(false);
  const [useLength, setUseLength] = useState(false);
  const [inputType, setInputType] = useState<InputType>();
  const [maxLength, setMaxLength] = useState(11);
  const [minLength, setMinLength] = useState(11);

  useEffect(() => {
    question.validators.map((validator) => {
      switch (validator.validator) {
        case "required":
          setRequired(true);
          break;
        case "length":
          setUseLength(true);
          try {
            const minMax = validator.regex?.toString().split(";");
            setMinLength(Number(minMax?.at(0)));
            setMaxLength(Number(minMax?.at(1)));
          } catch (error) {
            console.log(error);
          }
          break;
        case "type":
          setInputType(validator.regex as InputType);
          break;
        default:
          break;
      }
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: "UPDATE_QUESTION_VALIDATOR",
      questionId: question.id,
      validator: "length",
      payload: `${minLength};${maxLength}`,
    });
  }, [maxLength, minLength]);
  return (
    <Overlay className="z-index-5 w-full">
      <Container>
        <Popup
          className="relative p-6 w-full md:max-w-[800px] h-[400px] mx-auto mt-6 md:mt-18 bg-white"
          onClose={onClose}
        >
          <TextMuted className="font-weight-600 text-2xl">
            Select validator
          </TextMuted>
          <input
            type="checkbox"
            name="required"
            checked={required}
            onChange={(e) => {
              e.target.checked
                ? dispatch({
                    type: "ADD_VALIDATOR",
                    payload: { id: randomNumber(100), validator: "required" },
                    questionId: question.id,
                  })
                : dispatch({
                    type: "REMOVE_QUESTION_VALIDATOR",
                    validator: "required",
                    questionId: question.id,
                  });
              setRequired(e.target.checked);
            }}
          />
          <TextMuted className="ml-2 inline">Required</TextMuted>
          <br />
          {question.type == "short-answer" && (
            <>
              <input
                type="checkbox"
                name="length"
                checked={useLength}
                onChange={(e) => {
                  e.target.checked
                    ? dispatch({
                        type: "ADD_VALIDATOR",
                        payload: {
                          id: randomNumber(100),
                          validator: "length",
                          regex: `${minLength};${maxLength}`,
                        },
                        questionId: question.id,
                      })
                    : dispatch({
                        type: "REMOVE_QUESTION_VALIDATOR",
                        validator: "length",
                        questionId: question.id,
                      });
                  setUseLength(e.target.checked);
                }}
              />
              <TextMuted className="ml-2 col-1 col-span-2 inline">
                Length:
              </TextMuted>
              <div className="p-2 md:grid md:grid-cols-2 w-full">
                <div className="md:col-span-1 flex">
                  <TextMuted className="mr-2">Min:</TextMuted>
                  <input
                    className="border-2 p-1 rounded text-gray-500"
                    type="number"
                    readOnly={!useLength}
                    value={minLength}
                    onChange={(e) => setMinLength(e.target.valueAsNumber)}
                  />
                </div>
                <div className="md:col-span-1 flex mt-0 md:mt">
                  <TextMuted className="mr-2">Max:</TextMuted>
                  <input
                    className="border-2 p-1 rounded text-gray-500"
                    type="number"
                    readOnly={!useLength}
                    value={maxLength}
                    onChange={(e) => setMaxLength(e.target.valueAsNumber)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <TextMuted>Input type:</TextMuted>
                <Select
                  className="text-gray-500"
                  value={inputType}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_QUESTION_VALIDATOR",
                      questionId: question.id,
                      validator: "type",
                      payload: e.target.value,
                    });
                    setInputType(e.target.value as InputType);
                  }}
                >
                  <option value={"text"}>Text</option>
                  <option value={"number"}>Number</option>
                  <option value={"email"}>Email</option>
                </Select>
              </div>

              {/* <input
                type="checkbox"
                name="input_type"
                onChange={(e) => setUseInputType(e.target.checked)}
              />
              <TextMuted className="ml-2 md:col-span-2 inline">
                Input type:
              </TextMuted>
              <br />
              <div className="p-2">
                <input
                  type="radio"
                  name="type"
                  readOnly={!useInputType}
                  onChange={(e) => {
                    e.target.checked
                      ? dispatch({
                          type: "ADD_VALIDATOR",
                          payload: {
                            id: randomNumber(100),
                            validator: "number",
                          },
                          questionId: question.id,
                        })
                      : dispatch({
                          type: "REMOVE_QUESTION_VALIDATOR",
                          validator: "number",
                          questionId: question.id,
                        });
                  }}
                />
                <TextMuted className="inline">Number</TextMuted>
                <br />
                <input
                  type="radio"
                  name="type"
                  readOnly={!useInputType}
                  onChange={(e) => {
                    e.target.checked
                      ? dispatch({
                          type: "ADD_VALIDATOR",
                          payload: {
                            id: randomNumber(100),
                            validator: "email",
                          },
                          questionId: question.id,
                        })
                      : dispatch({
                          type: "REMOVE_QUESTION_VALIDATOR",
                          validator: "email",
                          questionId: question.id,
                        });
                  }}
                />
                <TextMuted className="inline">Email</TextMuted>
              </div> */}
            </>
          )}
        </Popup>
      </Container>
    </Overlay>
  );
};

export default Validators;
