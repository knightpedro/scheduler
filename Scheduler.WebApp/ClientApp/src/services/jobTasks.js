import api, { apiRoutes } from "../api";

export const getById = (id) =>
  api.get(apiRoutes.JOB_TASKS + id).then((res) => res.data);

export const create = (jobTask) =>
  api.post(apiRoutes.JOB_TASKS, jobTask).then((res) => res.data.id);

export const edit = (jobTask) =>
  api.put(apiRoutes.JOB_TASKS + jobTask.id, jobTask);

export const destroy = (id) => api.delete(apiRoutes.JOB_TASKS + id);

export const patchResources = (id, resourcesPatch) =>
  api.patch(apiRoutes.JOB_TASKS + id + "/resources", resourcesPatch);

export const patchWorkers = (id, workersPatch) =>
  api.patch(apiRoutes.JOB_TASKS + id + "/workers", workersPatch);
