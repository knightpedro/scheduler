import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleRow from "./ScheduleRow";

const GroupSchedule = ({ start, end, resources }) => {
  return (
    <div>
      <div>
        <ScheduleHeader start={start} end={end} includeEmptyCell />
      </div>
      {resources.map((resource) => (
        <ScheduleRow
          key={resource.id}
          header={resource.name}
          schedule={resource.schedule}
          start={start}
          end={end}
        />
      ))}
    </div>
  );
};

export default GroupSchedule;
