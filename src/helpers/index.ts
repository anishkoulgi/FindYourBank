import axios from "axios";
import { BASE_URL, cities } from "../constants";
import { Bank } from "../types";

export const fetchBankData = async () => {
  let data: Bank[] = [];
  const res = await Promise.all(
    cities.map(async (CITY) => {
      try {
        const res = await axios.get(BASE_URL + CITY.value);
        return res.data;
      } catch (error) {
        throw error;
      }
    })
  );
  data = [].concat(...res);
  return data;
};
