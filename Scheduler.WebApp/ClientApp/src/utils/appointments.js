import moment from "moment";
import routes from "../routes";
import { generatePath } from "react-router-dom";

export const appointmentTypes = {
  JOB_TASK: "JobTask",
  LEAVE: "Leave",
  OUT_OF_SERVICE: "OutOfService",
  TRAINING: "Training",
};

export const createAppointment = (appointment) => {
  return {
    ...appointment,
    path: createAppointmentPath(appointment.id, appointment.type),
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

export const generateSchedule = (days, appointments) => {
  return days.map((day) => {
    let overlapping = appointments.filter((a) => overlapsDay(a, day));

    // Adjust start and end times if appointment runs over multiple days.
    const dayStart = day.clone().startOf("day");
    const dayEnd = day.clone().endOf("day");
    return overlapping
      .map((a) => {
        const start = a.start.isBefore(dayStart) ? dayStart : a.start;
        const end = a.end.isAfter(dayEnd) ? dayEnd : a.end;
        return { ...a, start, end };
      })
      .sort((a, b) => a.start.unix() - b.start.unix());
  });
};

export const getWeekDays = (startOfWeek) => {
  let weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(moment(startOfWeek).add(i, "days"));
  }
  return weekDays;
};

export const getDatesBetween = (start, end) => {
  let days = [];
  let currentDate = start.clone();
  while (end.diff(currentDate, "days") > 0) {
    days.push(currentDate.clone());
    currentDate.add(1, "days");
  }
  return days;
};

export const overlapsDay = (appointment, date) => {
  const start = date.clone().startOf("day");
  const end = date.clone().endOf("day");
  return appointment.start.isBefore(end) && appointment.end.isAfter(start);
};
