import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export const getAllTiers = async (formData) => {
  try {
    const response = await api.get("/managetier");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
};

export const getTierInfo = async (tierId) => {
  try {
    const response = await api.get(`/managetier/${tierId}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
};

export const addNewTier = async (formData) => {
  try {
    const response = await api.create("/managetier", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
};

export const updateTier = async (formData) => {
  const { tierId } = formData;
  try {
    const response = await api.update(`/managetier/${tierId}`, formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
};

export const updateUserTier = async (formData) => {
  const { userId } = formData;
  try {
    const response = await api.update(`/managetier/user/${userId}`, formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
};
