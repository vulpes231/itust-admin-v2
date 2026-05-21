import axios from "axios";

import { liveServer, devServer } from "../config";

axios.defaults.baseURL = devServer;

axios.defaults.headers.post["Content-Type"] = "application/json";

const token = getAccessToken();

if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      case 403:
        message = "Sorry! the data you are looking for could not be found";
        sessionStorage.clear();
        window.location.href = "/";
        break;
      default:
        message = error.response?.data?.message || error;
    }
    return Promise.reject(message);
  },
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  /**
   * post given data to url
   * Automatically detects FormData and sets appropriate headers
   */
  create = (url, data) => {
    const config = {};

    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    return axios.post(url, data, config);
  };

  /**
   * Updates data (supports FormData as well)
   */
  update = (url, data) => {
    const config = {};

    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    return axios.patch(url, data, config);
  };

  put = (url, data) => {
    const config = {};

    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    return axios.put(url, data, config);
  };

  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

function getAccessToken() {
  return sessionStorage.getItem("token") || null;
}

export { APIClient, setAuthorization, getLoggedinUser, getAccessToken };
