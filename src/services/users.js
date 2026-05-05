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

export async function getUserVerifyInfo(userId) {
  try {
    const res = await api.get(`/manageuser/verify/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function verifyUserAddress(formData) {
  const { userId, action } = formData;
  console.log(formData);
  try {
    const res = await api.create(`/manageuser/address/${userId}`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function deleteAccount(userId) {
  try {
    const res = await api.delete(`/manageuser/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
