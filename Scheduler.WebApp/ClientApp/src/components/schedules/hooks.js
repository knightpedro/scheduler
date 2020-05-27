import { useState } from "react";
import moment from "moment";

const getWeekStart = (date) => moment(date).startOf("isoWeek");

export const useWeekPicker = (startDate) => {
  const [start, setStart] = useState(getWeekStart(startDate));
  const end = moment(start).endOf("isoWeek");

  const advanceWeek = (n) => setStart((prev) => moment(prev).add(n, "weeks"));

  const nextWeek = () => advanceWeek(1);

  const previousWeek = () => advanceWeek(-1);

  const reset = () => setStart(getWeekStart());

  const setDate = (date) => setStart(getWeekStart(date));

  return { start, end, nextWeek, previousWeek, reset, setDate };
};
