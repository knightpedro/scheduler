import moment from 'moment';

export const getWeekDays = (startOfWeek) => {
    let weekDays = [];
    for(let i = 0; i < 7; i++) {
        weekDays.push(moment(startOfWeek).add(i, 'days'));
    }
    return weekDays;
};

export const getDatesBetween = (start, end) => {
    let days = [];
    let currentDate = start.clone();
    while(end.diff(currentDate, 'days') > 0) {
        days.push(currentDate.clone());
        currentDate.add(1, 'days');
    } 
    return days;
};

export const isFutureDate = (value) => {
    return value.isAfter(moment().subtract(1, 'day'));
};

export const isPastDate = (value) => {
    return value.isBefore(moment());
}

export const isWeekend = (day) => day === 0 || day === 6;

export const overlaps = (appointment, start, end) => {
    return appointment.start.isBefore(end) && appointment.end.isAfter(start);
};

export const overlapsDay = (appointment, day) => {
    const dayStart = day.clone().startOf('day');
    const dayEnd = day.clone().endOf('day');
    return appointment.start.isBefore(dayEnd) && appointment.end.isAfter(dayStart);
};

export const generateSchedule = (days, appointments) => { 
    return days.map(day => {
        let overlapping = appointments.filter(a => overlapsDay(a, day));

        // Adjust start and end times if appointment runs over multiple days.
        const dayStart = day.clone().startOf('day');
        const dayEnd = day.clone().endOf('day');
        return overlapping.map(a => {
            const start = a.start.isBefore(dayStart) ? dayStart : a.start;
            const end = a.end.isAfter(dayEnd) ? dayEnd : a.end;
            return {...a, start, end};
        });
    });
};