import { ClassAttributes, InputHTMLAttributes } from "react";

interface Props
  extends JSX.IntrinsicAttributes,
    ClassAttributes<HTMLInputElement>,
    InputHTMLAttributes<HTMLInputElement> {}

    
const InputForm: React.FC<Props> = ({ className, ...props }) => {
  const classNames = `${className} border-b-2 border-gray-400 p-2 outline-none mt-2 mb-2 w-full focus:border-primary`;
  return <input className={classNames} {...props} />;
};

export default InputForm;
