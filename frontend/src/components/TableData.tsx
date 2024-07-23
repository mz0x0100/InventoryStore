import React, { HTMLProps } from "react";

const TableData: React.FC<HTMLProps<HTMLTableDataCellElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <td
      className={`${className} px-6 py-4 whitespace-no-wrap border-b border-gray-300`}
      {...props}
    >
      <div className="text-sm leading-5 font-medium text-gray-900">
        {children}
      </div>
    </td>
  );
};

export default TableData;
