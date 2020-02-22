import api, { apiRoutes } from "../api";

export const getAll = async () => {
    const res = await api.get(apiRoutes.OUT_OF_SERVICE);
    return res.data.outOfServices;
};

export const getById = async id => {
    const res = await api.get(apiRoutes.OUT_OF_SERVICE + id);
    return res.data;
};

export const getReasons = async () => {
    const res = await api.get(apiRoutes.OUT_OF_SERVICE_REASONS);
    return res.data;
};

export const create = async oos => {
    const res = await api.post(apiRoutes.OUT_OF_SERVICE, oos);
    return res.data.id;
};

export const edit = oos => api.put(apiRoutes.OUT_OF_SERVICE + oos.id, oos);

export const destroy = id => api.delete(apiRoutes.OUT_OF_SERVICE + id);
