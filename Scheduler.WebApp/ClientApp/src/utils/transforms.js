import { difference } from "lodash";
import moment from "moment";
import Routes from "../routes";
import { generatePath } from "react-router-dom";

export const appointmentTypes = {
    JOB_TASK: "JobTask",
    LEAVE: "Leave",
    OUT_OF_SERVICE: "OutOfService",
    TRAINING: "Training",
};

export const sortByName = (a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : b.name.toLowerCase() > a.name.toLowerCase()
        ? -1
        : 0;

export const entitiesSelect = entities => {
    const sorted = entities.slice().sort(sortByName);
    return sorted.map(entity => ({ value: entity.id, label: entity.name }));
};

export const createPatch = (initial, final) => {
    let patch = {};
    const add = difference(final, initial);
    const remove = difference(initial, final);
    if (add.length > 0) patch.add = add;
    if (remove.length > 0) patch.remove = remove;
    return patch;
};

export const createAppointment = appointment => {
    return {
        ...appointment,
        path: createAppointmentPath(appointment.id, appointment.type),
        start: moment(appointment.start),
        end: moment(appointment.end),
    };
};

export const createAppointmentPath = (id, type) => {
    let route;
    if (type === appointmentTypes.JOB_TASK) route = Routes.jobTasks.DETAIL;
    else if (type === appointmentTypes.LEAVE) route = Routes.leave.EDIT;
    else if (type === appointmentTypes.OUT_OF_SERVICE)
        route = Routes.outOfServices.EDIT;
    else if (type === appointmentTypes.TRAINING) route = Routes.training.DETAIL;
    return generatePath(route, { id });
};
