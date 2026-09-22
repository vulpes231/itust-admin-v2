import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function updateWalletBalance(formData) {
  try {
    const response = await api.update("/managewallet", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || error?.message;
    throw Error(errMsg);
  }
}
