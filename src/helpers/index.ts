import axios from "axios";
import { BASE_URL, cities, MINS } from "../constants";
import { Bank } from "../types";

/**
 * Fetches bank data
 * @returns bank data
 */
export const fetchBankData = async () => {
  let data: Bank[] = [];
  let cache: Cache | undefined;
  // Check if browser supports the Cache API
  if (window.caches) {
    // Check for cached data using the Cache API
    cache = await caches.open("data-cache");
    const cachedRes = await cache.match("data.json");
    if (cachedRes) {
      const cachedData = await cachedRes.json();

      // Check if cache data has expired
      if (Date.now() - cachedData.createdAt < 5 * MINS) return cachedData.data;
      cache.delete("data-cache");
    }
  }

  // Fetch banks for respective cities
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
  data = data.map((bank) => {
    return { ...bank, isFavorite: false };
  });

  // Store the fetched data into the cache
  if (cache) {
    const cacheData = { data, createdAt: Date.now() };
    cache.put("data.json", new Response(JSON.stringify(cacheData)));
  }
  return data;
};
