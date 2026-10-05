import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getUserPlans() {
  try {
    const res = await api.get("/manageplans/user");

    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
