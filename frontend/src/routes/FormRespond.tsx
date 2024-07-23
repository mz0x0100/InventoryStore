import { useLocation } from "react-router-dom";
import XFPrompts from "../components/XF/Renders/XFPrompts";
import { QuestionType } from "../utils/FormUtils";
import { useEffect, useState } from "react";
import { useAddRecord } from "../utils/apicalls/forms";
import { isValidEmail } from "../utils/utils";

const FormRespond: React.FC = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);
  const recordToken = queryParam.get("rt");
  const formId = queryParam.get("id");
  const [response, setResponse] = useState("");
  const addRecord = useAddRecord();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    questions: QuestionType[]
  ) => {
    e.preventDefault();
    console.log("Form submmited");
    console.log(questions);

    const setError = (id: number, msg: string) => {
      const errorHandle: HTMLDivElement = document.querySelector(
        `#fieldError${id}`
      ) as HTMLDivElement;

      errorHandle.innerHTML = `<span class='p-2 text-red-500 text-sm block'>${msg}<span/>`;
      errorHandle.parentElement?.classList.add("border-red-400");
    };

    const clearError = (id: number) => {
      const errorHandle: HTMLDivElement = document.querySelector(
        `#fieldError${id}`
      ) as HTMLDivElement;

      errorHandle.innerHTML = "";
      errorHandle.parentElement?.classList.remove("border-red-400");
    };
    let validationError = false;
    questions.forEach((q) => {
      q.validators.forEach((v) => {
        // Validate length
        if (v.validator == "length" && v.regex !== null) {
          const minMax = v.regex?.toString().split(";");
          const min = Number(minMax?.at(0));
          const max = Number(minMax?.at(1));
          console.log(`Validating length, min:${min} max:${max}`);
          if (q.response.length < min || q.response.length > max) {
            setError(q.id, `Field most be at least ${min} and at most ${max}`);
            console.log("Validation failed");
            validationError = true;
          } else {
            clearError(q.id);
          }
          // errorHandle.innerText = {`Field must be at least ${min} and at most ${max}`}
        } else if (v.validator == "type" && v.regex == "email") {
          console.log(isValidEmail(q.response));
          if (!isValidEmail(q.response)) {
            setError(q.id, "Please enter a valid email");
          } else {
            clearError(q.id);
          }
        }
      });
    });
    if (validationError) return;
    // questions.forEach((q) => console.log(q.response));
    const data = JSON.stringify({
      form_id: formId,
      token: recordToken,
      payload: questions.map((question) => {
        const obj: any = {};
        let payload;
        Object.defineProperty(obj, question.title, {
          enumerable: true,
          writable: true,
          configurable: true,
        });
        if (
          question.type == "single-choice" &&
          question.options.length >= 6 &&
          typeof question.response == "undefined"
        )
          payload = question.options[0].text;
        else payload = question.response;
        return JSON.parse(
          JSON.stringify({ title: question.title, payload: payload })
        );
      }),
    });
    console.log(data);
    addRecord(data, setResponse);
    return;
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return <XFPrompts handleSubmit={handleSubmit} />;
};

export default FormRespond;
