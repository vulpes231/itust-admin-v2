import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getSysInfo() {
  try {
    const res = await api.get("/analytics");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getRecentActivities(formData) {
  try {
    const res = await api.get("/analytics/activities", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getRecentUsers(formData) {
  try {
    const res = await api.get("/analytics/users", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getRecentTransactions(formData) {
  try {
    const res = await api.get("/analytics/transactions", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
