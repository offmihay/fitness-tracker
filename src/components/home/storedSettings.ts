import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterHome, SortValueHome } from "./types";

export const emptyFilter: FilterHome = {
  sportType: [],
  skillLevel: [],
  date: "",
  prizePool: {},
  entryFee: {},
};

export const fetchStoredSortBy = async () => {
  const storedData = await AsyncStorage.getItem("sortby-home");
  const result = (storedData as SortValueHome) || null;
  return result;
};

export const fetchStoredFilter = async () => {
  const storedData = await AsyncStorage.getItem("filter-home");
  const result = storedData ? (JSON.parse(storedData) as FilterHome) : null;
  return result ?? emptyFilter;
};
