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
