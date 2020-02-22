import { useState, useEffect } from "react";
import { workersService } from "../../../services";
import {
    createAppointment,
    getDatesBetween,
    generateSchedule,
    sortByName,
} from "../../../utils";
import { generatePath } from "react-router-dom";
import Routes from "../../../routes";

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
        schedule: createWorkerSchedule(worker, start, end),
    }));
};

export const useWorkerCalendar = (id, start, end) => {
    const [loading, setLoading] = useState(true);
    const [workerCalendar, setWorkerCalendar] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        workersService
            .getIndividualCalendar(id, start, end)
            .then(calendar => {
                setWorkerCalendar(calendar);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, start, end]);

    return [loading, error, workerCalendar];
};

export const useWorkersCalendar = (start, end) => {
    const [loading, setLoading] = useState(true);
    const [workersCalendar, setWorkersCalendar] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        workersService
            .getAllCalenders(start, end)
            .then(calendar => {
                setWorkersCalendar(calendar);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [start, end]);

    return [loading, error, workersCalendar];
};
