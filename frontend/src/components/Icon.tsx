import React, { HTMLProps } from "react";

const Icon: React.FC<HTMLProps<HTMLElement>> = ({ className, ...props }) => {
  return (
    <i
      className={`fa ${className} text-sm text-gray-800 cursor-pointer p-2 rounded-3xl hover:bg-gray-300`}
      {...props}
    ></i>
  );
};

export default Icon;
