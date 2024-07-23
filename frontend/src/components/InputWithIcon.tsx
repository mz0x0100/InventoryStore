import { ClassAttributes, InputHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

interface Props
  extends JSX.IntrinsicAttributes,
    ClassAttributes<HTMLInputElement>,
    InputHTMLAttributes<HTMLInputElement> {
  iconclass: string;
}

const InputWithIcon = ({ iconclass, ...props }: Props) => {
  // const
  return (
    <div className="input-icon mt-3 h-12 rounded-md">
      <i className={`icon fa ${iconclass} text-primary`}></i>
      <input {...props} className="input-element" />
    </div>
  );
};

export default InputWithIcon;
