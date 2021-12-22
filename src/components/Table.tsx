import React, { useContext, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { DataContext } from "../context";
import Filter from "./Filter";
import Header from "./Header";
import Pagination from "./Pagination";
import TableRow from "./TableRow";
import FileSvg from "../assets/file.svg";

const Table = () => {
  const { filteredData } = useContext(DataContext);

  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const { page, rowsPerPage } = pagination;

  return (
    <div className="flex-1 py-2 px-6">
      <Filter />
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <table className="w-full">
          <Header />
          <tbody
            className="block"
            style={{ height: "50vh", minHeight: "400px", overflow: "auto" }}
          >
            {filteredData !== null ? (
              filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bank, i) => <TableRow row={bank} key={i} />)
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img className="h-20 text-gray-400" src={FileSvg} />
                  <p className="text-sm font-medium text-gray-500">
                    {" "}
                    No Data Found{" "}
                  </p>
                </div>
              )
            ) : (
              <SkeletonTheme baseColor="#f9fafb" highlightColor="#f3f4f6">
                <div className="p-2">
                  <Skeleton className="h-20 my-2" count={4} />
                </div>
              </SkeletonTheme>
            )}
          </tbody>
        </table>
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          dataLength={filteredData ? filteredData.length : 0}
        />
      </div>
    </div>
  );
};

export default Table;
