import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function searchAsset(query) {
  try {
    const res = await api.get(`/asset/search/?query=${query}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
