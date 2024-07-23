import React, { HTMLProps } from "react";

const TableHeader: React.FC<HTMLProps<HTMLTableHeaderCellElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <th
      className={`${className} px-3 py-3 border-b-2 border-grey-300 bg-gray-200 text-left text-sm leading-4 font-weight-500 text-grey-600 tracking-wider`}
      {...props}
    >
      {children}
    </th>
  );
};

export default TableHeader;
