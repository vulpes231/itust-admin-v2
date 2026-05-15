import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllTrades() {
  try {
    const res = await api.get("/managetrade");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getUserTrades(formData) {
  const { userId } = formData;
  try {
    const res = await api.get(`/managetrade/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function addNewTrade(formData) {
  try {
    const res = await api.create("/managetrade", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function updateTrade(formData) {
  const { tradeId } = formData;
  try {
    const res = await api.update(`/managetrade/${tradeId}`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function closeTrade(formData) {
  const { positionId } = formData;
  try {
    const res = await api.update(`/manageposition/${positionId}`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
