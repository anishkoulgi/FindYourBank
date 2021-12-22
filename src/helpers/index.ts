import axios from "axios";
import { BASE_URL, cities } from "../constants";
import { Bank } from "../types";

export const fetchBankData = async () => {
  let data: Bank[] = [];
  const cache = await caches.open("data-cache");
  const cachedRes = await cache.match("data.json");
  if (cachedRes) {
    const cachedData = await cachedRes.json();
    if (Date.now() - cachedData.createdAt < 120000) return cachedData.data;
    cache.delete("data-cache");
  }

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
  const cacheData = { data, createdAt: Date.now() };
  cache.put("data.json", new Response(JSON.stringify(cacheData)));
  return data;
};
