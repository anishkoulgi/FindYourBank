import React, { useContext, useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Select from "react-select";
import { cities, filterOptions } from "../constants";
import { DataContext } from "../context";
import { useDebounce } from "../hooks";
import { FilterState, SelectType } from "../types";
import { colourStyles, CustomOption } from "./SelectOption";

const Filter = () => {
  const { filters, setFilters, filteredData, filterBanks } =
    useContext(DataContext);
  //const [value, setValue] = useState(filters.query || "");
  const debouncedQuery = useDebounce(filters.query, 300);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    if (filterBanks && isMounted.current) {
      console.log("hello");
      filterBanks();
    }
  }, [debouncedQuery, filters.city, filters.filter]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (val: SelectType, type: "city" | "filter") => {
    if (val && filters[type] != val.value)
      setFilters!((prev) => {
        return { ...prev, [type]: val.value };
      });
    else {
      setFilters!((prev) => {
        return { ...prev, [type]: null };
      });
    }
  };

  if (!filteredData) {
    return (
      <SkeletonTheme baseColor="#f9fafb" highlightColor="#f3f4f6">
        <div className="flex mb-6 justify-end items-center">
          <div className="w-40">
            <Skeleton className="h-8" count={1} />
          </div>
          <div className="w-36 ml-6">
            <Skeleton className="h-8" count={1} />
          </div>
          <div className="w-44 ml-6">
            <Skeleton className="h-8" count={1} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="flex mb-6 justify-end items-center">
      <div className="w-40">
        <Select
          options={cities}
          placeholder="Select City"
          styles={colourStyles}
          components={{ Option: CustomOption }}
          isSearchable={false}
          defaultValue={
            filters.city
              ? {
                  label: cities.find((city) => city.value === filters.city)
                    ?.label,
                  value: filters.city,
                }
              : null
          }
          isClearable
          onChange={(val: any) => {
            handleChange(val, "city");
          }}
        />
      </div>
      <div className="w-36 ml-6">
        <Select
          options={filterOptions}
          placeholder="Select Filter"
          styles={colourStyles}
          components={{ Option: CustomOption }}
          defaultValue={
            filters.filter
              ? {
                  label: filterOptions.find(
                    (filter) => filter.value === filters.filter
                  )?.label,
                  value: filters.filter,
                }
              : null
          }
          isSearchable={false}
          isClearable
          onChange={(val: any) => {
            handleChange(val, "filter");
          }}
        />
      </div>
      <input
        className="w-44 py-2 px-2 rounded-lg border border-gray-300 ml-6 text-xs outline-none hover:border-gray-400 transition-all focus:border-primary"
        placeholder="Search"
        value={filters.query}
        onChange={(e) => {
          setFilters!((prev) => {
            return { ...prev, query: e.target.value };
          });
        }}
      />
    </div>
  );
};

export default Filter;
