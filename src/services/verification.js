import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getVerificationDetails(userId) {
  try {
    const res = await api.get(`/manageverify/${userId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function verifyuserAccount(formData) {
  const { userId } = formData;
  try {
    const res = await api.create(`/manageuser/${userId}`, formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
