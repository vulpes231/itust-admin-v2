import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function banUser(userId) {
  try {
    const res = await api.put(`/manageuser/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function configureBank(formData) {
  try {
    const res = await api.update(`/manageconfig/bank`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function configureWallet(formData) {
  try {
    const res = await api.update(`/manageconfig/crypto`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function configureLimit(formData) {
  try {
    const res = await api.update(`/manageconfig`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function configureUser(formData) {
  try {
    const res = await api.update(`/manageconfig/user`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
