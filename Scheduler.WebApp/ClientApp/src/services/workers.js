import api, { apiRoutes, apiConstants } from "../api";
import queryString from "query-string";

export const getAll = async () => {
  const res = await api.get(apiRoutes.WORKERS);
  return res.data.workers;
};

export const getById = async (id) => {
  const res = await api.get(apiRoutes.WORKERS + id);
  return res.data;
};

export const create = async (worker) => {
  const res = await api.post(apiRoutes.WORKERS, worker);
  return res.data.id;
};

export const edit = (worker) => api.put(apiRoutes.WORKERS + worker.id, worker);

export const destroy = (id) => api.delete(apiRoutes.WORKERS + id);

export const getAllCalenders = async (start, end) => {
  const startQuery = start.format(apiConstants.DATE_FORMAT);
  const endQuery = end.format(apiConstants.DATE_FORMAT);
  const res = await api.get(
    `${apiRoutes.WORKERS}calendar/${startQuery}/${endQuery}`
  );
  return res.data.workers;
};

export const getIndividualCalendar = async (id, start, end) => {
  const startQuery = start ? start.format(apiConstants.DATE_FORMAT) : start;
  const endQuery = end ? end.format(apiConstants.DATE_FORMAT) : end;
  const queryUrl = queryString.stringifyUrl({
    url: apiRoutes.WORKERS + id + "/calendar",
    query: { start: startQuery, end: endQuery },
  });
  const res = await api.get(queryUrl);
  return res.data;
};
