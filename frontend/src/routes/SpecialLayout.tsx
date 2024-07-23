import { HTMLProps } from "react";

const SpecialLayout: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`${className} min-h-screen theme-bg rounded-md`}
      {...props}
    ></div>
  );
};

export default SpecialLayout;
