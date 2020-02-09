import {useState, useEffect} from 'react';
import { WORKERS_URL } from  '../../../api';
import axios from 'axios';
import { createAppointment, getDatesBetween, generateSchedule, sortByName } from '../../../utils';
import { generatePath } from 'react-router-dom';
import Routes from '../../../routes';
import queryString from 'query-string';

const DATE_REQUEST_FORMAT = "YYYY-MM-DD";

export const createWorkerSchedule = (worker, start, end) => {
    const days = getDatesBetween(start, end);
    const appointments = worker.appointments.map(a => createAppointment(a));
    return generateSchedule(days, appointments);
};

export const createWorkersSchedule = (workers, start, end) => {
    workers.sort(sortByName);
    return workers.map(worker => ({
        id: worker.id,
        name: worker.name,
        path: generatePath(Routes.workers.DETAIL, { id: worker.id }),
        schedule: createWorkerSchedule(worker, start, end)
    }))
};

export const useWorkerCalendar = (id, start, end) => {
    const [loading, setLoading] = useState(true);
    const [workerCalendar, setWorkerCalendar] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const startQuery = start ? start.format(DATE_REQUEST_FORMAT) : start;
        const endQuery = end ? end.format(DATE_REQUEST_FORMAT) : end;
        const queryUrl = queryString.stringifyUrl({
            url: `${WORKERS_URL}/${id}/calendar`,
            query: { start: startQuery, end: endQuery }
        });
        axios.get(queryUrl)
        .then(res => {
            setWorkerCalendar(res.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [id, start, end]);
    
    return [loading, error, workerCalendar]
}

export const useWorkersCalendar = (start, end) => {
    const [loading, setLoading] = useState(true);
    const [workersCalendar, setWorkersCalendar] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const startQuery= start.format(DATE_REQUEST_FORMAT);
        const endQuery = end.format(DATE_REQUEST_FORMAT);
        axios.get(`${WORKERS_URL}/calendar/${startQuery}/${endQuery}`)
        .then(res => {
            setWorkersCalendar(res.data.workers);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [start, end]);

    return [loading, error, workersCalendar];
};