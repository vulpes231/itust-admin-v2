import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function searchCountry(query) {
  try {
    const res = await api.get(`/location/search?query=${query}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getCountries() {
  try {
    const res = await api.get(`/location/countries`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getStates() {
  try {
    const res = await api.get(`/location/states`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getNations() {
  try {
    const res = await api.get(`/location/nationalities`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getCurrencies() {
  try {
    const res = await api.get(`/currency`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
