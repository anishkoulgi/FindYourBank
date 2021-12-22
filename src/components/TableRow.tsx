import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { columns } from "../constants";
import { DataContext } from "../context";
import { Bank } from "../types";

interface Props {
  row: Bank;
}

const TableRow: React.FC<Props> = ({ row }) => {
  const history = useHistory();
  const { toggleFavorite } = useContext(DataContext);

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    history.push(`/bankinfo/${row.ifsc}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="flex w-full text-gray-600 hover:text-darkPrimary hover:bg-lightPrimary cursor-pointer transition-all"
    >
      <td
        style={{ flex: 1 }}
        className="py-6 px-2 flex border-t border-gray-300 justify-center items-center text-center"
        onClick={(e) => {
          if (toggleFavorite) toggleFavorite(row);
          e.stopPropagation();
        }}
      >
        <FaStar
          size={18}
          id="FavoriteIcon"
          className={`${row.isFavorite ? "text-yellow-300" : "text-gray-300"}`}
        />
      </td>
      {columns.map((column) => (
        <td
          className={`text-xs py-6 px-2 flex border-t border-gray-300 justify-center items-center text-center`}
          style={{ ...column.style }}
        >
          {row[column.key as keyof Bank]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
