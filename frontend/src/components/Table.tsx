import React, { HTMLProps } from "react";

const Table: React.FC<HTMLProps<HTMLTableElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <table
      className={`${className} min-w-full bg-white border border-gray-300`}
      {...props}
    >
      {children}
    </table>
  );
};

export default Table;
