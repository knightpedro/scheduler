import api, { apiRoutes } from "../api";

export const getAll = async () => {
    const res = await api.get(apiRoutes.JOBS);
    return res.data.jobs;
};

export const getById = async id => {
    const res = await api.get(apiRoutes.JOBS + id);
    return res.data;
};

export const create = async job => {
    const res = await api.post(apiRoutes.JOBS, job);
    return res.data.id;
};

export const edit = job => api.put(apiRoutes.JOBS + job.id, job);

export const destroy = id => api.delete(apiRoutes.JOBS + id);
