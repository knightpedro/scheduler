import {useState, useEffect} from 'react';
import { RESOURCES_URL } from '../../../api';
import axios from 'axios';
import { generatePath } from 'react-router-dom';
import Routes from '../../../routes';
import queryString from 'query-string';
import { createAppointment, getDatesBetween, generateSchedule, sortByName } from "../../../utils";

const DATE_REQUEST_FORMAT = "YYYY-MM-DD";

export const createResourceSchedule = (resource, start, end) => {
    const days = getDatesBetween(start, end);
    const appointments = resource.appointments.map(a => createAppointment(a));
    return generateSchedule(days, appointments);
}

export const createResourcesSchedule = (resources, start, end) => {
    resources.sort(sortByName);
    return resources.map(resource => ({
        id: resource.id,
        name: resource.name,
        path: generatePath(Routes.resources.DETAIL, { id: resource.id }),
        schedule: createResourceSchedule(resource, start, end)
    }));
}

export const useResourceCalendar = (id, start, end) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [resourceCalendar, setResourceCalendar] = useState();

    useEffect(() => {
        const startQuery = start ? start.format(DATE_REQUEST_FORMAT) : start;
        const endQuery = end ? end.format(DATE_REQUEST_FORMAT) : end;
        const queryUrl = queryString.stringifyUrl({
            url: `${RESOURCES_URL}/${id}/calendar`,
            query: { start: startQuery, end: endQuery }
        });
        axios.get(queryUrl)
        .then(res => {
            setResourceCalendar(res.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })

    }, [id, start, end]);

    return [loading, error, resourceCalendar];
}

export const useResourcesCalendar = (start, end) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [resourcesCalendar, setResourcesCalendar] = useState();

    useEffect(() => {
        const startQuery = start.format(DATE_REQUEST_FORMAT);
        const endQuery = end.format(DATE_REQUEST_FORMAT);
        axios.get(`${RESOURCES_URL}/calendar/${startQuery}/${endQuery}`)
        .then(res => {
            setResourcesCalendar(res.data.resources);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [start, end]);

    return [loading, error, resourcesCalendar];
};