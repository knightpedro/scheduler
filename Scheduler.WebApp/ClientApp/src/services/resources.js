import api, { apiRoutes, apiConstants } from "../api";
import queryString from "query-string";

export const getAll = async () => {
  const res = await api.get(apiRoutes.RESOURCES);
  return res.data.resources;
};

export const getById = async (id) => {
  const res = await api.get(apiRoutes.RESOURCES + id);
  return res.data;
};

export const create = async (resource) => {
  const res = await api.post(apiRoutes.RESOURCES, resource);
  return res.data.id;
};

export const edit = (resource) =>
  api.put(apiRoutes.RESOURCES + resource.id, resource);

export const destroy = (id) => api.delete(apiRoutes.RESOURCES + id);

export const getAllCalenders = async (start, end) => {
  const startQuery = start.format(apiConstants.DATE_FORMAT);
  const endQuery = end.format(apiConstants.DATE_FORMAT);
  const res = await api.get(
    `${apiRoutes.RESOURCES}calendar/${startQuery}/${endQuery}`
  );
  return res.data.resources;
};

export const getIndividualCalendar = async (id, start, end) => {
  const startQuery = start ? start.format(apiConstants.DATE_FORMAT) : start;
  const endQuery = end ? end.format(apiConstants.DATE_FORMAT) : end;
  const queryUrl = queryString.stringifyUrl({
    url: apiRoutes.RESOURCES + id + "/calendar",
    query: { start: startQuery, end: endQuery },
  });
  const res = await api.get(queryUrl);
  return res.data;
};
