import React, { HTMLProps } from "react";

const TableRow: React.FC<HTMLProps<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <tr className={`${className} hover:bg-gray-100 cursor-pointer`} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
