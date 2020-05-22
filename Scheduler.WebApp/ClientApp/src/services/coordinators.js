import api, { apiRoutes } from "../api";
import queryString from "query-string";

export const getAll = () =>
  api.get(apiRoutes.COORDINATORS).then((res) => res.data.coordinators);

export const getById = (id) =>
  api.get(apiRoutes.COORDINATORS + id).then((res) => res.data);

export const getWithJobs = (id) => {
  const jobsQuery = queryString.stringifyUrl({
    url: apiRoutes.JOBS,
    query: {
      coordinatorId: id,
    },
  });
  return Promise.all([getById(id), api.get(jobsQuery)]).then(
    ([coordinator, jobsRes]) => ({
      ...coordinator,
      jobs: jobsRes.data.jobs,
    })
  );
};

export const create = (coordinator) =>
  api.post(apiRoutes.COORDINATORS, coordinator).then((res) => res.data.id);

export const edit = (coordinator) =>
  api.put(apiRoutes.COORDINATORS + coordinator.id, coordinator);

export const destroy = (id) => api.delete(apiRoutes.COORDINATORS + id);
