import api, { apiRoutes } from "../api";

export const getAll = () =>
  api.get(apiRoutes.LEAVE).then((res) => res.data.leave);

export const getById = (id) =>
  api.get(apiRoutes.LEAVE + id).then((res) => res.data);

export const getTypes = () =>
  api.get(apiRoutes.LEAVE_TYPES).then((res) => res.data);

export const create = (leave) =>
  api.post(apiRoutes.LEAVE, leave).then((res) => res.data.id);

export const edit = (leave) => api.put(apiRoutes.LEAVE + leave.id, leave);

export const destroy = (id) => api.delete(apiRoutes.LEAVE + id);
