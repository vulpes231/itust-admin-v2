import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function loginAdmin(formData) {
  try {
    const res = await api.create("/login", formData);
    // console.log(res.token);
    return { token: res.token, user: res.data || null };
  } catch (error) {
    const errMsg = error || error?.message;
    throw Error(errMsg);
  }
}

export async function logoutAdmin() {
  try {
    const res = await api.put("/manageadmin/logout");
    console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error || error?.message;
    throw Error(errMsg);
  }
}
