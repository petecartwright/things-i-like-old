import { readFileSync } from "fs";
import type { Place } from "../types/types";

export const getLocalData = (): Place[] => {
  const fileContents = readFileSync("../local_dev_data.json", "utf-8");
  const places = JSON.parse(fileContents);
  return places.places;
};
