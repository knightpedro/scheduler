import api, { apiRoutes } from "../api";

export const getById = async id => {
    const res = await api.get(apiRoutes.JOB_TASKS + id);
    return res.data;
};

export const create = async jobTask => {
    const res = await api.post(apiRoutes.JOB_TASKS, jobTask);
    return res.data.id;
};

export const edit = jobTask =>
    api.put(apiRoutes.JOB_TASKS + jobTask.id, jobTask);

export const destroy = id => api.delete(apiRoutes.JOB_TASKS + id);

export const patchResources = (id, resourcesPatch) =>
    api.patch(apiRoutes.JOB_TASKS + id + "/resources", resourcesPatch);

export const patchWorkers = (id, workersPatch) =>
    api.patch(apiRoutes.JOB_TASKS + id + "/workers", workersPatch);
