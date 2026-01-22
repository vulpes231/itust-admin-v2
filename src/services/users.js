import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllUsers() {
  try {
    const res = await api.get("/manageuser");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function getUserInfo(userId) {
  try {
    const res = await api.get(`/manageuser/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
