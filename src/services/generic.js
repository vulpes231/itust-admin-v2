import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function searchCountry(query) {
  try {
    const res = await api.get(`/location/search?query=${query}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
