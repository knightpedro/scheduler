import api, { apiRoutes } from "../api";

export const getAll = () =>
  api.get(apiRoutes.JOBS).then((res) => res.data.jobs);

export const getById = (id) =>
  api.get(apiRoutes.JOBS + id).then((res) => res.data);

export const create = (job) =>
  api.post(apiRoutes.JOBS, job).then((res) => res.data.id);

export const edit = (job) => api.put(apiRoutes.JOBS + job.id, job);

export const destroy = (id) => api.delete(apiRoutes.JOBS + id);
