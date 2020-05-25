import { useState } from "react";
import moment from "moment";

const getWeekStart = (date) =>
  moment.isMoment(date)
    ? date.clone().startOf("isoWeek")
    : moment().startOf("isoWeek");

export const useWeekPicker = (startDate) => {
  const [start, setStart] = useState(getWeekStart(startDate));
  const end = start.clone().add(1, "week");

  const advanceWeek = (n) => setStart((prev) => prev.clone().add(n, "weeks"));

  const nextWeek = () => advanceWeek(1);

  const previousWeek = () => advanceWeek(-1);

  const reset = () => setStart(getWeekStart());

  const setDate = (date) => setStart(getWeekStart(date));

  return { start, end, nextWeek, previousWeek, reset, setDate };
};
