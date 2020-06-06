import api, { apiRoutes } from "../api";
import { DATE_FORMAT } from "../api/constants";
import queryString from "query-string";

export const getAll = () =>
  api.get(apiRoutes.RESOURCES).then((res) => res.data.resources);

export const getById = (id) =>
  api.get(apiRoutes.RESOURCES + id).then((res) => res.data);

export const create = (resource) =>
  api.post(apiRoutes.RESOURCES, resource).then((res) => res.data.id);

export const edit = (resource) =>
  api.put(apiRoutes.RESOURCES + resource.id, resource);

export const destroy = (id) => api.delete(apiRoutes.RESOURCES + id);

export const getAllConflicts = (start, end) => {
  const startQuery = start ? start.format(DATE_FORMAT) : null;
  const endQuery = end ? end.format(DATE_FORMAT) : null;
  const queryUrl = queryString.stringifyUrl(
    {
      url: apiRoutes.RESOURCES + "conflicts",
      query: { start: startQuery, end: endQuery },
    },
    { skipNull: true }
  );
  return api.get(queryUrl).then((res) => res.data);
};

export const getConflictsByResourceId = (id, start, end) => {
  const startQuery = start ? start.format(DATE_FORMAT) : null;
  const endQuery = end ? end.format(DATE_FORMAT) : null;
  const queryUrl = queryString.stringifyUrl(
    {
      url: apiRoutes.RESOURCES + id + "/conflicts",
      query: { start: startQuery, end: endQuery },
    },
    { skipNull: true }
  );
  return api.get(queryUrl).then((res) => res.data);
};

export const getAllCalenders = (start, end) => {
  const startQuery = start.format(DATE_FORMAT);
  const endQuery = end.format(DATE_FORMAT);
  return api
    .get(`${apiRoutes.RESOURCES}calendar/${startQuery}/${endQuery}`)
    .then((res) => res.data.resources);
};

export const getIndividualCalendar = (id, start, end) => {
  const startQuery = start ? start.format(DATE_FORMAT) : null;
  const endQuery = end ? end.format(DATE_FORMAT) : null;
  const queryUrl = queryString.stringifyUrl(
    {
      url: apiRoutes.RESOURCES + id + "/calendar",
      query: { start: startQuery, end: endQuery },
    },
    { skipNull: true }
  );
  return api.get(queryUrl).then((res) => res.data);
};
