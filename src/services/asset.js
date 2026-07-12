import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllAssets() {
  try {
    const res = await api.get(`/asset`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

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

export async function removeAsset(assetId) {
  try {
    const res = await api.delete(`/manageasset/${assetId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function addNewAsset(formData) {
  try {
    const res = await api.create(`/manageasset/`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
