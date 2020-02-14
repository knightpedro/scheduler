import axios from "axios";
import queryString from "query-string";
import { RESOURCES_URL, WORKERS_URL } from "../api";

const conflictQuery = async (url, start, end) => {
    const query = { start, end };
    const queryUrl = queryString.stringifyUrl({ url, query });
    try {
        let conflictsRes = await axios.get(queryUrl);
        return conflictsRes.data.conflicts;
    } catch {
        return null;
    }
};

export const createConflictMessage = (name, conflicts) => {
    if (conflicts.length === 0) return;
    let message = `${name} is already assigned to ${conflicts[0].description.toLowerCase()}`;
    if (conflicts.length > 1) {
        message += ` and ${conflicts.length - 1} other appointments`;
    }
    message += " during this time. Do you still want to save?";
    return message;
};

export const getResourceConflicts = async (resourceId, start, end) => {
    const url = `${RESOURCES_URL}/${resourceId}/conflicts`;
    return conflictQuery(url, start, end);
};

export const getWorkerConflicts = async (workerId, start, end) => {
    const url = `${WORKERS_URL}/${workerId}/conflicts`;
    return conflictQuery(url, start, end);
};
