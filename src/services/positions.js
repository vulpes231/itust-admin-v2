import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getAllPositions(queryData) {
  const { sortBy } = queryData;

  try {
    const res = await api.get("/manageposition/", {
      params: { sortBy },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePosition(formData) {
  const { positionId } = formData;
  try {
    const res = await api.put(`/manageposition/${positionId}`, formData);
    // console.log(res.data);
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
