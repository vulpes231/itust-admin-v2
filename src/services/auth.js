import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function loginAdmin(formData) {
  try {
    const res = await api.create("/login", formData);
    console.log(res.data);
    return { token: res.data.token, user: res.data.user };
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function logoutAdmin() {
  try {
    const res = await api.put("/manageadmin/logout");
    console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
