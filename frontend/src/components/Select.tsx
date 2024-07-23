import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLSelectElement>{
  label: string;
  options: { value: string | number; displayText: string | number; selected?: boolean}[];
}

const Select: React.FC<Props> = ({ label, options, className, ...props }) => {
  const classNames = `${className} p-4 w-full rounded-xl`

  return (
    <div className="mt-2">
      <label>{label}</label>
      <select className={classNames} {...props}>
        {options.map((option, key) => (
          <option value={option.value} key={key} selected={option.selected}>{option.displayText}</option>
        ))}
      </select>
    </div>
  );  
};

export default Select;
