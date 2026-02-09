import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getSettings() {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}
