import { ClassAttributes, InputHTMLAttributes } from "react";

interface Props
  extends JSX.IntrinsicAttributes,
    ClassAttributes<HTMLSelectElement>,
    InputHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <select
      className={`${className} w-full p-2 bg-white border-gray-300 outline-none focus:border-primary rounded-md`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
