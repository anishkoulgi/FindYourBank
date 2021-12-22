import React from "react";
import { Link } from "react-router-dom";
import { columns } from "../constants";
import { Bank } from "../types";

interface Props {
  row: Bank;
}

const TableRow: React.FC<Props> = ({ row }) => {
  return (
    <Link to={`/bankinfo/${row.ifsc}`}>
      <tr className="flex w-full text-gray-600 hover:text-darkPrimary hover:bg-lightPrimary cursor-pointer transition-all">
        {columns.map((column) => (
          <td
            className={`text-xs py-6 px-2 flex justify-center items-center text-center border-t border-gray-200`}
            style={{ ...column.style }}
          >
            {row[column.key as keyof Bank]}
          </td>
        ))}
      </tr>
    </Link>
  );
};

export default TableRow;
