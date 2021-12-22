import React, { useContext } from "react";

import FileSvg from "../assets/file.svg";
import TableRow from "../components/TableRow";
import { DataContext } from "../context";

const Favorites = () => {
  const { favoriteBanks } = useContext(DataContext);
  return (
    <div className="flex-1 py-3 px-6">
      <h2 className="text-xl text-gray-600 font-semibold">Favorites</h2>
      <div
        className="mt-6"
        style={{
          height: "60vh",
          minHeight: "400px",
          overflow: "auto",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        {favoriteBanks && favoriteBanks.length > 0 ? (
          favoriteBanks?.map((bank) => <TableRow row={bank} />)
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img className="h-20 text-gray-400" src={FileSvg} />
            <p className="text-sm font-medium text-gray-500"> No Data Found </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
