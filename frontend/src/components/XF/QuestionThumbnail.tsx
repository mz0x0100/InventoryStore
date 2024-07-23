import { HTMLProps } from "react";
import { QuestionType } from "../../utils/FormUtils";
import { Text, TextMuted } from "../Text";

interface Props extends HTMLProps<HTMLDivElement> {
  question: QuestionType;
  index: number;
  selectedQuestion: number;
}
const QuestionThumnail: React.FC<Props> = ({
  question,
  index,
  selectedQuestion,
  ...props
}) => {
  const bg =
    selectedQuestion == index
      ? "bg-[rgba(0,0,0,0)] border-4 border-primary"
      : "bg-[rgba(0,0,100,0.4)] hover:bg-[rgba(0,0,100,0.6)]";
  return (
    <div className={`mt-4 relative w-full h-[200px] }`} {...props}>
      <div className={`absolute w-full h-full ${bg} cursor-pointer`} />
      <div className="p-4 bg-white h-full overflow-hidden">
        {/* <div className="bg-primary justify-center p-4 rounded-3xl w-[30px] h-[30px]"> */}
        <Text className="absolute text-xl text-secondary right-2 top-1">
          {index + 1}
        </Text>
        {/* </div> */}
        {question.type != "short-answer" && (
          <TextMuted className="font-weight-500">{question.prompt}</TextMuted>
        )}
        <div className="mt-4" key={props.key}>
          {question.type == "short-answer" && (
            <>
              <TextMuted>{question.prompt}</TextMuted>
              <input
                type="text"
                className="w-full p-1 pl-2 border-2 rounded text-sm border-primary"
                readOnly
              />
            </>
          )}
          {question.type == "date" && (
            <>
              <input
                type="date"
                className="w-full p-1 pl-2 border-2 rounded text-sm border-primary"
                readOnly
              />
            </>
          )}
          {question.type == "single-choice" &&
            question.options.map((op, key) => (
              <div key={key}>
                <input key={key} type="radio" name="r" className="mr-2" />
                <TextMuted className="inline text-sm">{op.text}</TextMuted>
                <br />
              </div>
            ))}
          {question.type == "multiple-choice" &&
            question.options.map((op, key) => (
              <div key={key}>
                <input key={key} type="checkbox" name="r" className="mr-2" />
                <TextMuted className="inline text-sm">{op.text}</TextMuted>
                <br />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionThumnail;
