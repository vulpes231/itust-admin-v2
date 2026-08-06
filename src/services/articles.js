import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export async function getArticles() {
  try {
    const res = await api.get("/article");
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function getArticleInfo(articleId) {
  if (!articleId) throw Error("Article ID not defined!");
  try {
    const res = await api.get(`/article/${articleId}`);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function addArticle(formData) {
  try {
    const res = await api.create("/manage-article", formData);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function updateArticleInfo(formData) {
  const { articleId } = formData;
  if (!articleId) throw Error("Article ID not defined!");
  try {
    const res = await api.update(`/manage-article/${articleId}`, formData);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}

export async function removeArticle(articleId) {
  if (!articleId) throw Error("Article ID not defined!");
  try {
    const res = await api.delete(`/manage-article/${articleId}`);
    return res.data;
  } catch (error) {
    const errMsg = error;
    throw Error(errMsg);
  }
}
