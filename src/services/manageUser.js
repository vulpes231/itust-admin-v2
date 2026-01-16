import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getUsers() {
  try {
    const res = await api.get("/manageuser");
    console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
