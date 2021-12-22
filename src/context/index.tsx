import React, { createContext, useEffect, useState } from "react";
import { fetchBankData } from "../helpers";
import { Bank, DataContext as DataContextType, FilterState } from "../types";

export const DataContext = createContext<DataContextType>({
  data: null,
  filteredData: null,
  filterBanks: null,
  setBankData: null,
  favoriteBanks: null,
  toggleFavorite: null,
  filters: { city: null, filter: null, query: "" },
  setFilters: null,
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
  }
  return flag;
};

const DataContextProvider: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[] | null>(null);
  const [favorite, setFavorite] = useState<Bank[]>([]);
  const [filteredData, setFilteredData] = useState<Bank[] | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    city: null,
    filter: null,
    query: "",
  });

  useEffect(() => {
    (async () => {
      const banks = await fetchBankData();
      if (setBankData) setBankData(banks);
    })();
  }, []);

  const setBankData = (banks: Bank[]) => {
    setBanks(banks);
    setFilteredData(banks);
  };

  const toggleFavorite = (bank: Bank) => {
    setBanks((prev) => {
      let newArr = prev?.map((prevBank) => {
        if (prevBank.ifsc === bank.ifsc)
          return { ...prevBank, isFavorite: !bank.isFavorite };
        return prevBank;
      });
      return newArr!;
    });
    setFilteredData((prev) => {
      let newArr = prev?.map((prevBank) => {
        if (prevBank.ifsc === bank.ifsc)
          return { ...prevBank, isFavorite: !bank.isFavorite };
        return prevBank;
      });
      return newArr!;
    });
    if (!bank.isFavorite)
      setFavorite((prev) => [
        ...prev,
        { ...bank, isFavorite: !bank.isFavorite },
      ]);
    else {
      setFavorite((prev) => {
        let newArr = prev.filter((prevBank) => prevBank.ifsc !== bank.ifsc);
        return newArr;
      });
    }
  };

  const filterBanks = () => {
    if (!banks) return;
    const filteredBanks = banks.filter((bank) =>
      filterFunc(bank, filters, filters.query)
    );
    setFilteredData(filteredBanks);
  };

  return (
    <DataContext.Provider
      value={{
        data: banks,
        filteredData,
        filterBanks,
        setBankData,
        favoriteBanks: favorite,
        toggleFavorite,
        filters,
        setFilters,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
