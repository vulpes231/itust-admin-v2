import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAutoPlans() {
  try {
    const res = await api.get("/manageplans");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function createAutoPlan(formData) {
  try {
    const res = await api.create("/manageplans", formData);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function updateAutoPlan(formData) {
  const { planId } = formData;
  try {
    const res = await api.update(`/manageplans/${planId}`, formData);

    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}

export async function deleteAutoPlan(planId) {
  try {
    const res = await api.delete(`/manageplans/${planId}`);

    return res.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error?.message;
    throw Error(errMsg);
  }
}
