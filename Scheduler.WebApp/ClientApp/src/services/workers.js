import api, { apiRoutes, apiConstants } from "../api";
import queryString from "query-string";

export const getAll = () =>
  api.get(apiRoutes.WORKERS).then((res) => res.data.workers);

export const getById = (id) =>
  api.get(apiRoutes.WORKERS + id).then((res) => res.data);

export const create = (worker) =>
  api.post(apiRoutes.WORKERS, worker).then((res) => res.data.id);

export const edit = (worker) => api.put(apiRoutes.WORKERS + worker.id, worker);

export const destroy = (id) => api.delete(apiRoutes.WORKERS + id);

export const getAllCalenders = (start, end) => {
  const startQuery = start.format(apiConstants.DATE_FORMAT);
  const endQuery = end.format(apiConstants.DATE_FORMAT);
  return api
    .get(`${apiRoutes.WORKERS}calendar/${startQuery}/${endQuery}`)
    .then((res) => res.data.workers);
};

export const getIndividualCalendar = (id, start, end) => {
  const startQuery = start ? start.format(apiConstants.DATE_FORMAT) : start;
  const endQuery = end ? end.format(apiConstants.DATE_FORMAT) : end;
  const queryUrl = queryString.stringifyUrl({
    url: apiRoutes.WORKERS + id + "/calendar",
    query: { start: startQuery, end: endQuery },
  });
  return api.get(queryUrl).then((res) => res.data);
};
