import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleRow from "./ScheduleRow";

const IndividualSchedule = ({ start, end, schedule }) => {
  return (
    <div>
      <ScheduleHeader start={start} end={end} />
      <ScheduleRow start={start} end={end} schedule={schedule} />
    </div>
  );
};

export default IndividualSchedule;
