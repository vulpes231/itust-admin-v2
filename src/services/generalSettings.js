import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getSettings() {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

export async function updateBank(formData) {
  try {
    const response = await api.update("/managesettings/bank", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

export async function updateWallet(formData) {
  try {
    const response = await api.update("/managesettings/wallet", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

export async function updateLimit(formData) {
  try {
    const response = await api.update("/managesettings/limit", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}
