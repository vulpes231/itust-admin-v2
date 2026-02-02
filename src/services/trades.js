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
  try {
    const res = await api.put("/managetrade", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function closeTrade(formData) {
  const { tradeId } = formData;
  try {
    const res = await api.create(`/managetrade/${tradeId}`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
