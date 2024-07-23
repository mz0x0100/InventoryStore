// Returns a friendly displayable text for a specified question type
export const getQuestionTypeText = (type: QFTypes) => {
  switch (type) {
    case "multiple-choice":
      return "Multiple choice";

    case "short-answer":
      return "Short answer";

    case "single-choice":
      return "Single choice";
    case "date":
      return "Date";
    case "file-upload":
      return "File upload";
    default:
      return type;
  }
};
export const questionOptionsList: QFTypes[] = [
  "multiple-choice",
  "single-choice",
  "short-answer",
  "date",
  "file-upload",
];

export type InputType = "text" | "number" | "email";
export type Validators = "required" | "length" | "type";
export type QFTypes =
  | "multiple-choice"
  | "single-choice"
  | "short-answer"
  | "date"
  | "file-upload";
export type OptionsType = { id: number; text: string };
export type ValidatorType = {
  id: number;
  validator: Validators;
  regex?: RegExp | string | InputType;
};

export type QuestionType = {
  id: number;
  title: string;
  prompt: string;
  options: OptionsType[];
  type: QFTypes;
  validators: ValidatorType[];
  response?: any;
};

export type FormMetaDataType = {
  templateName: string;
  formTitle: string;
  formDescription: string;
};

export type QActionType =
  | { type: "ADD"; payload: QuestionType }
  | { type: "ADD_OPTION"; questionId: number; payload: OptionsType }
  | { type: "ADD_VALIDATOR"; questionId: number; payload: ValidatorType }
  | { type: "UPDATE_QUESTION"; id: number; payload: string }
  | {
      type: "UPDATE_QUESTION_OPTION";
      questionId: number;
      optionId: number;
      payload: string;
    }
  | {
      type: "UPDATE_QUESTION_VALIDATOR";
      questionId: number;
      validator: Validators;
      payload?: RegExp | string | InputType;
    }
  | { type: "UPDATE_QUESTION_TITLE"; id: number; payload: string }
  | { type: "UPDATE_QUESTION_TYPE"; id: number; payload: QFTypes }
  | { type: "REMOVE"; id: number }
  | { type: "REMOVE_QUESTION_OPTION"; questionId: number; optionId: number }
  | {
      type: "REMOVE_QUESTION_VALIDATOR";
      questionId: number;
      validator: Validators;
    }
  | { type: "UPDATE_RESPONSE"; id: number; payload: any }
  | { type: "APPEND_RESPONSE_CHECKBOX"; id: number; payload: string }
  | { type: "REMOVE_RESPONSE_CHECKBOX"; id: number; payload: string };

export const fromsReducer = (
  state: QuestionType[],
  action: QActionType
): QuestionType[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "ADD_OPTION":
      return state.map((item) =>
        item.id == action.questionId
          ? { ...item, options: [...item.options, action.payload] }
          : item
      );
    case "ADD_VALIDATOR":
      return state.map((item) =>
        item.id == action.questionId
          ? { ...item, validators: [...item.validators, action.payload] }
          : item
      );
    case "UPDATE_QUESTION":
      // Update question
      return state.map((item) =>
        item.id == action.id ? { ...item, prompt: action.payload } : item
      );
    case "UPDATE_QUESTION_TYPE":
      // Update question type
      return state.map((item) =>
        item.id == action.id ? { ...item, type: action.payload } : item
      );
    case "UPDATE_QUESTION_TITLE":
      // Update question title
      return state.map((item) =>
        item.id == action.id ? { ...item, title: action.payload } : item
      );
    case "UPDATE_QUESTION_OPTION":
      return state.map((item) =>
        item.id == action.questionId
          ? {
              ...item,
              options: item.options.map((option) =>
                option.id == action.optionId
                  ? { ...option, text: action.payload }
                  : option
              ),
            }
          : item
      );
    case "UPDATE_QUESTION_VALIDATOR":
      return state.map((item) =>
        item.id == action.questionId
          ? {
              ...item,
              validators: item.validators.map((validator) =>
                validator.validator == action.validator
                  ? { ...validator, regex: action.payload }
                  : validator
              ),
            }
          : item
      );

    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

    case "REMOVE_QUESTION_OPTION":
      return state.map((item) =>
        item.id == action.questionId
          ? {
              ...item,
              options: item.options.filter(
                (option) => option.id !== action.optionId
              ),
            }
          : item
      );
    case "REMOVE_QUESTION_VALIDATOR":
      return state.map((item) =>
        item.id == action.questionId
          ? {
              ...item,
              validators: item.validators.filter(
                (validator) => validator.validator !== action.validator
              ),
            }
          : item
      );
    // For updating the responses
    case "UPDATE_RESPONSE":
      return state.map((item) =>
        item.id == action.id ? { ...item, response: action.payload } : item
      );

    /**
     *
     * For checkboxe responses, we handle things differently, here we are storing them as
     * a list of array
     */
    // for updating the checkbox list
    case "APPEND_RESPONSE_CHECKBOX":
      return state.map((item) =>
        item.id == action.id
          ? {
              ...item,
              response:
                typeof item.response != "object"
                  ? [action.payload]
                  : [...item.response, action.payload],
            }
          : item
      );

    // for removing the checkbox list
    case "REMOVE_RESPONSE_CHECKBOX":
      return state.map((item) =>
        item.id == action.id
          ? {
              ...item,
              response: item.response.filter(
                (res: string) => res !== action.payload
              ),
            }
          : item
      );
    default:
      return state;
  }
};

export const randomNumber = (n = 1000) => {
  return Math.floor(Math.random() * n);
};

export const handleSaveTemplate = (
  formId: string,
  formMetaData: FormMetaDataType,
  questions: QuestionType[],
  updateApiFormTemplate: (data: string) => void
) => {
  const formDataJSON = JSON.stringify({
    template_name: formMetaData.templateName,
    form_id: formId,
    title: formMetaData.formTitle,
    description: formMetaData.formDescription,
    payload: questions.map((question) => {
      // Parse each of the question in order to obtain a JSON pased Object instead of string
      return JSON.parse(
        JSON.stringify({
          id: question.id,
          title: question.title,
          prompt: question.prompt,
          type: question.type,
          options:
            question.type == "multiple-choice" ||
            question.type == "single-choice"
              ? btoa(JSON.stringify(question.options))
              : btoa("[]"),
          validators: btoa(JSON.stringify(question.validators)),
        })
      );
    }),
  });

  console.log(`Saving template:`);
  console.log(JSON.parse(formDataJSON).payload);
  updateApiFormTemplate(formDataJSON);
};

export const dispatchAdd = (dispatch: (value: QActionType) => void) => {
  const title = "Untitled question";
  const type = "short-answer";
  const id = randomNumber(9000);
  dispatch({
    type: "ADD",
    payload: {
      id: id,
      type: type,
      title: title,
      prompt: "",
      options: [{ id: randomNumber(3000), text: "" }],
      validators: [
        { id: randomNumber(300), validator: "required" },
        { id: randomNumber(300), validator: "type", regex: "text" },
      ],
    },
  });
};

export const loadTemplate = (
  questions: QuestionType[],
  loadedApiFormTemplate: any
) => {
  let templateRecords = Array(loadedApiFormTemplate);
  // const questionsTemp: QuestionType[] = [];
  console.log(`Before length: ${questions.length}`);
  emptyArray(questions);
  console.log(`After length: ${questions.length}`);
  templateRecords = JSON.parse(templateRecords[0]);
  console.log(templateRecords);
  templateRecords.map((record: any) => {
    // console.log(record.options);
    // console.log(JSON.parse(atob(record.options)));
    // // return;
    const question: QuestionType = {
      id: record.id,
      title: record.title,
      type: record.type,
      prompt: record.prompt,
      options: JSON.parse(atob(record.options)),
      validators: JSON.parse(atob(record.validators)),
    };
    questions.push(question);
  });

  console.log(`Loaded template:`);
  console.log(questions);
};

export const emptyArray = (items: any[]) => {
  while (items.length != 0) {
    items.pop();
  }
};
