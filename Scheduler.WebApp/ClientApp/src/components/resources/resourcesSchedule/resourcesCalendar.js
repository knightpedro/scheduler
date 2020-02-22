import { useState, useEffect } from "react";
import { generatePath } from "react-router-dom";
import Routes from "../../../routes";
import {
    createAppointment,
    getDatesBetween,
    generateSchedule,
    sortByName,
} from "../../../utils";
import { resourcesService } from "../../../services";

export const createResourceSchedule = (resource, start, end) => {
    const days = getDatesBetween(start, end);
    const appointments = resource.appointments.map(a => createAppointment(a));
    return generateSchedule(days, appointments);
};

export const createResourcesSchedule = (resources, start, end) => {
    resources.sort(sortByName);
    return resources.map(resource => ({
        id: resource.id,
        name: resource.name,
        path: generatePath(Routes.resources.DETAIL, { id: resource.id }),
        schedule: createResourceSchedule(resource, start, end),
    }));
};

export const useResourceCalendar = (id, start, end) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [resourceCalendar, setResourceCalendar] = useState();

    useEffect(() => {
        resourcesService
            .getIndividualCalendar(id, start, end)
            .then(calendar => setResourceCalendar(calendar))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [id, start, end]);

    return [loading, error, resourceCalendar];
};

export const useResourcesCalendar = (start, end) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [resourcesCalendar, setResourcesCalendar] = useState();

    useEffect(() => {
        resourcesService
            .getAllCalenders(start, end)
            .then(calendar => setResourcesCalendar(calendar))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [start, end]);

    return [loading, error, resourcesCalendar];
};
