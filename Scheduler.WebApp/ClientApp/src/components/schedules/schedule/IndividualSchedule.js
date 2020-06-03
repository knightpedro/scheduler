import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleRow from "./ScheduleRow";

const IndividualSchedule = ({ start, end, schedule }) => {
  return (
    <div>
      <ScheduleHeader start={start} end={end} schedule={schedule} />
      <ScheduleRow start={start} end={end} />
    </div>
  );
};

export default IndividualSchedule;
