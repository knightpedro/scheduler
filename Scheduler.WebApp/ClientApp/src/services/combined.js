import api, { apiRoutes } from "../api";

export const getAll = () => api.get(apiRoutes.ALL).then((res) => res.data);
