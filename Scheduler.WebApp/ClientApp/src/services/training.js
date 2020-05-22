import api, { apiRoutes } from "../api";

export const getAll = () =>
  api.get(apiRoutes.TRAINING).then((res) => res.data.training);

export const getById = (id) =>
  api.get(apiRoutes.TRAINING + id).then((res) => res.data);

export const create = (training) =>
  api.post(apiRoutes.TRAINING, training).then((res) => res.data.id);

export const edit = (training) =>
  api.put(apiRoutes.TRAINING + training.id, training);

export const destroy = (id) => api.delete(apiRoutes.TRAINING + id);

export const patchWorkers = (id, workersPatch) =>
  api.patch(apiRoutes.TRAINING + id + "/workers", workersPatch);
