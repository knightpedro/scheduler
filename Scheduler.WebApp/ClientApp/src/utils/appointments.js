import moment from "moment";
import routes from "../routes";
import { generatePath } from "react-router-dom";
import { appointmentTypes } from "../constants";

export const createAppointment = (appointment) => {
  return {
    ...appointment,
    start: moment(appointment.start),
    end: moment(appointment.end),
  };
};

export const createAppointmentPath = (id, type) => {
  let route;
  switch (type) {
    case appointmentTypes.LEAVE:
      route = routes.leave.EDIT;
      break;
    case appointmentTypes.OUT_OF_SERVICE:
      route = routes.outOfServices.EDIT;
      break;
    case appointmentTypes.TRAINING:
      route = routes.training.DETAIL;
      break;
    default:
      route = routes.jobTasks.DETAIL;
      break;
  }
  return generatePath(route, { id });
};

export const getWeekDays = (date) => {
  const start = moment(date).startOf("isoWeek");
  let weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(moment(start).add(i, "days"));
  }
  return weekDays;
};

export const getDatesBetween = (start, end) => {
  let days = [];
  let currentDate = moment(start);
  while (currentDate.isSameOrBefore(end)) {
    days.push(moment(currentDate));
    currentDate.add(1, "days");
  }
  return days;
};

export const overlaps = (appointment, start, end) =>
  appointment.start.isBefore(end) && appointment.end.isAfter(start);

export const overlapsDay = (appointment, date) => {
  const start = moment(date).startOf("day");
  const end = moment(date).endOf("day");
  return overlaps(appointment, start, end);
};

export const transformDatesToMoments = (appointment) => ({
  ...appointment,
  start: moment(appointment.start),
  end: moment(appointment.end),
});

export const transformMomentsToDates = (appointment) => ({
  ...appointment,
  start: appointment.start.format(),
  end: appointment.end.format(),
});
