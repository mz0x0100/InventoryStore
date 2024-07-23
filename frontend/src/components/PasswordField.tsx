import { ClassAttributes, InputHTMLAttributes, useState } from "react";
import { JSX } from "react/jsx-runtime";

interface Props
  extends JSX.IntrinsicAttributes,
    ClassAttributes<HTMLInputElement>,
    InputHTMLAttributes<HTMLInputElement> {
  iconclass: string;
}

const PasswordField = ({ iconclass, type, ...props }: Props) => {
  const [fieldType, setFieldType] = useState("password");
  const [vIconClass, setVIconClass] = useState("fa-eye-slash");

  return (
    <div className="input-icon mt-3 h-12 rounded-md">
      <i className={`icon fa fa-solid ${iconclass} text-primary`}></i>
      <input type={fieldType} {...props} className="input-element" />
      <i
        className={`icon fa fa-solid ${vIconClass} text-primary`}
        onClick={() => {
          if (fieldType == "password") {
            setFieldType("text");
            setVIconClass("fa-eye");
          } else {
            setFieldType("password");
            setVIconClass("fa-eye-slash");
          }
        }}
      ></i>
    </div>
  );
};

export default PasswordField;
