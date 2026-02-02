import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllTransactions() {
  try {
    const res = await api.get("/managetrans");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function updateTransaction(transactionData) {
  const { transactionId } = transactionData;
  try {
    const res = await api.put(`/managetrans/${transactionId}`, transactionData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function createTransaction(formData) {
  try {
    const res = await api.create(`/managetrans`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
