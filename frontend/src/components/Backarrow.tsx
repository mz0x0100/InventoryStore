import React, { HTMLProps } from "react";

const Backarrow: React.FC<HTMLProps<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <i
      className={`${className} fa fa-arrow-left text-xl text-gray-700 font-weight-700 cursor-pointer p-4 hover:bg-[rgba(0,0,0,0.3)]`}
      {...props}
    />
  );
};

export default Backarrow;
