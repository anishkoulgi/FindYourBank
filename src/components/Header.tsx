import React from "react";
import { columns } from "../constants";

const Header: React.FC = () => {
  return (
    <div className="flex bg-lightGray">
      {columns.map((column, i) => (
        <th
          key={i}
          className={`text-sm py-3 font-semibold text-gray-600`}
          style={{ ...column.style }}
        >
          {column.name}
        </th>
      ))}
    </div>
  );
};

export default Header;
