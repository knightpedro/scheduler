import api, { apiRoutes } from "../api";

export const getById = async (id) => {
  const res = await api.get(apiRoutes.LEAVE + id);
  return res.data;
};

export const getTypes = async () => {
  const res = await api.get(apiRoutes.LEAVE_TYPES);
  return res.data;
};

export const create = async (leave) => {
  const res = await api.post(apiRoutes.LEAVE, leave);
  return res.data.id;
};

export const edit = (leave) => api.put(apiRoutes.LEAVE + leave.id, leave);

export const destroy = (id) => api.delete(apiRoutes.LEAVE + id);
