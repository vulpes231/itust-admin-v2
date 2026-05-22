import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllPositions() {
  try {
    const res = await api.get("/manageposition");
    console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function deletePosition(positionId) {
  try {
    const res = await api.delete(`/manageposition/${positionId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
