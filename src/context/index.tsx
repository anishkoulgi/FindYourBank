import React, { createContext, useState } from "react";
import { data } from "../constants";
import { Bank, DataContext as DataContextType, FilterState } from "../types";

export const DataContext = createContext<DataContextType>({
  data: null,
  filteredData: null,
  filterBanks: null,
  setBankData: null,
});

const filterFunc = (bank: Bank, filters: FilterState, query: string) => {
  let flag = true;
  if (filters.city) flag = flag && filters.city === bank.city;
  if (filters.filter != null && query.length > 0) {
    flag =
      flag &&
      (bank[filters.filter as keyof Bank] as string).includes(
        query.toUpperCase()
      );
    console.log(flag, query);
  }
  return flag;
};

const DataContextProvider: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[] | null>(null);
  const [filteredData, setFilteredData] = useState<Bank[] | null>(null);

  const setBankData = (banks: Bank[]) => {
    setBanks(banks);
    setFilteredData(banks);
  };

  const filterBanks = (filters: FilterState, query: string) => {
    if (!banks) return;
    const filteredBanks = banks.filter((bank) =>
      filterFunc(bank, filters, query)
    );
    setFilteredData(filteredBanks);
  };

  return (
    <DataContext.Provider
      value={{ data: banks, filteredData, filterBanks, setBankData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
