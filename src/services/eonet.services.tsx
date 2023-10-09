import { apiEonet } from "../apis";
import { Data } from "../interfaces";

const url = "https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires";

export const fethEvents = async (): Promise<Data> => {
  const response = await apiEonet.get(url);
  return response.data;
};
