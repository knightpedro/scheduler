import api, { apiRoutes } from "../api";
import queryString from "query-string";

export const getAll = async () => {
    const res = await api.get(apiRoutes.COORDINATORS);
    return res.data.coordinators;
};

export const getById = async id => {
    const res = await api.get(apiRoutes.COORDINATORS + id);
    return res.data;
};

export const getWithJobs = async id => {
    const jobsQuery = queryString.stringifyUrl({
        url: apiRoutes.JOBS,
        query: {
            coordinatorId: id,
        },
    });
    const coordinator = await getById(id);
    const jobsRes = await api.get(jobsQuery);
    return {
        ...coordinator,
        jobs: jobsRes.data.jobs,
    };
};

export const create = async coordinator => {
    const res = await api.post(apiRoutes.COORDINATORS, coordinator);
    return res.data.id;
};

export const edit = coordinator =>
    api.put(apiRoutes.COORDINATORS + coordinator.id, coordinator);

export const destroy = id => api.delete(apiRoutes.COORDINATORS + id);
