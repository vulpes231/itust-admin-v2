import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getSavingsAccounts() {
  try {
    const res = await api.get("/managesavings");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function createSavingsAccount(formData) {
  try {
    const res = await api.create("/managesavings", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
