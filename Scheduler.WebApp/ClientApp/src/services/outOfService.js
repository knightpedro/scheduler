import api, { apiRoutes } from "../api";

export const getAll = () =>
  api.get(apiRoutes.OUT_OF_SERVICE).then((res) => res.data.outOfServices);

export const getById = (id) =>
  api.get(apiRoutes.OUT_OF_SERVICE + id).then((res) => res.data);

export const getReasons = () =>
  api.get(apiRoutes.OUT_OF_SERVICE_REASONS).then((res) => res.data);

export const create = (oos) =>
  api.post(apiRoutes.OUT_OF_SERVICE, oos).then((res) => res.data.id);

export const edit = (oos) => api.put(apiRoutes.OUT_OF_SERVICE + oos.id, oos);

export const destroy = (id) => api.delete(apiRoutes.OUT_OF_SERVICE + id);
