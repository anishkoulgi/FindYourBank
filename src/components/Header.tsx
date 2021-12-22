import React from "react";
import { columns } from "../constants";

const Header: React.FC = () => {
  return (
    <thead>
      <tr className="flex bg-lightGray">
        <th
          style={{ flex: "1" }}
          className="py-6 px-2 flex  justify-center items-center text-center"
        ></th>
        {columns.map((column, i) => (
          <th
            key={i}
            className={`text-sm py-3 font-semibold text-gray-600`}
            style={{
              ...column.style,
              ...{ marginRight: i === columns.length - 1 ? "10px" : "0px" },
            }}
          >
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
