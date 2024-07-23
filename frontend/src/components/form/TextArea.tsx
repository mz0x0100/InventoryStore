import { HTMLProps } from "react";

const TextArea: React.FC<HTMLProps<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  const classNames = `${className} border-b-2 border-gray-400 p-2 outline-none mt-2 w-full focus:border-light-secondary`;
  return <textarea cols={1} rows={2} className={classNames} {...props} />;
};

export default TextArea;
