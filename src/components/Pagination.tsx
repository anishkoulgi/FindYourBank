import React, { useContext } from "react";
import Select from "react-select";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import { data, PaginationOptions } from "../constants";
import { colourStyles, CustomOption } from "./SelectOption";
import { SelectType } from "../types";
import { DataContext } from "../context";

interface Props {
  pagination: { rowsPerPage: number; page: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      rowsPerPage: number;
      page: number;
    }>
  >;
  dataLength: number;
}

const Pagination: React.FC<Props> = ({
  pagination,
  dataLength,
  setPagination,
}) => {
  const { filteredData } = useContext(DataContext);

  const { page, rowsPerPage } = pagination;
  const currentItem = page * rowsPerPage + 1;
  const lastItem =
    page * rowsPerPage + rowsPerPage > dataLength
      ? dataLength
      : page * rowsPerPage + rowsPerPage;

  const lastPage = Math.ceil(dataLength / rowsPerPage) - 1;
  const isFirstPage = page === 0;
  const isLastPage = page === lastPage;

  const handleClick = (changeVal: number) => {
    setPagination((prev) => {
      return { ...prev, page: prev.page + changeVal };
    });
  };

  const handleChange = (val: SelectType) => {
    if (val.value !== rowsPerPage)
      setPagination((prev) => {
        return { ...prev, rowsPerPage: val.value as number };
      });
  };

  if (!filteredData) {
    return (
      <SkeletonTheme baseColor="#f9fafb" highlightColor="#f3f4f6">
        <div className="py-2 flex items-center justify-end px-2">
          <div className="w-20">
            <Skeleton className="h-8" count={1} />
          </div>
          <div className="w-36 ml-6">
            <Skeleton className="h-8" count={1} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="py-2 flex items-center justify-end px-2">
      <p className="text-xs text-gray-500">Rows per page</p>
      <div className="w-20 ml-1">
        <Select
          options={PaginationOptions}
          defaultValue={{ label: "10", value: 10 }}
          styles={colourStyles}
          components={{ Option: CustomOption }}
          isSearchable={false}
          menuPlacement="auto"
          onChange={(val: any) => handleChange(val)}
        />
      </div>
      <div className="flex ml-8 items-center">
        <AiFillCaretLeft
          size={18}
          onClick={() => {
            handleClick(-1);
          }}
          className={`text-gray-500  ${
            isFirstPage
              ? "text-gray-300 cursor-not-allowed"
              : "hover:text-gray-400 cursor-pointer"
          }`}
        />
        <p className="text-sm text-gray-600 mx-2">
          {currentItem}-{lastItem} of {dataLength}
        </p>
        <AiFillCaretRight
          size={18}
          onClick={() => {
            handleClick(1);
          }}
          className={`text-gray-500 ${
            isLastPage
              ? "text-gray-300 cursor-not-allowed"
              : "hover:text-gray-400 cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
