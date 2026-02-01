import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getUserAccounts(userId) {
  try {
    const res = await api.get(`/managewallet/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
