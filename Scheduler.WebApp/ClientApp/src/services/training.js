import api, { apiRoutes } from "../api";

export const getAll = async () => {
    const res = await api.get(apiRoutes.TRAINING);
    return res.data.training;
};

export const getById = async id => {
    const res = await api.get(apiRoutes.TRAINING + id);
    return res.data;
};

export const create = async training => {
    const res = await api.post(apiRoutes.TRAINING, training);
    return res.data.id;
};

export const edit = training =>
    api.put(apiRoutes.TRAINING + training.id, training);

export const destroy = id => api.delete(apiRoutes.TRAINING + id);

export const patchWorkers = (id, workersPatch) =>
    api.patch(apiRoutes.TRAINING + id + "/workers", workersPatch);
