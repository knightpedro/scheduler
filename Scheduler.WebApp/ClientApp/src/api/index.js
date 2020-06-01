import axios from "axios";
import authService from "../components/api-authorization/AuthorizeService";

export const apiRoutes = {
  ALL: "all/",
  BASE: "api/",
  COORDINATORS: "coordinators/",
  JOBS: "jobs/",
  JOB_TASKS: "jobtasks/",
  LEAVE: "leave/",
  LEAVE_TYPES: "leave/leave-types",
  OUT_OF_SERVICE: "outofservice/",
  OUT_OF_SERVICE_REASONS: "outofservice/reasons",
  RESOURCES: "resources/",
  TRAINING: "training/",
  WORKERS: "workers/",
};

const instance = axios.create({
  baseURL: apiRoutes.BASE,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await authService.getAccessToken();
    config.headers = !token ? {} : { Authorization: `Bearer ${token}` };
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
