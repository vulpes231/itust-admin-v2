import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllTrades() {
  try {
    const res = await api.get("/managetrade");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
