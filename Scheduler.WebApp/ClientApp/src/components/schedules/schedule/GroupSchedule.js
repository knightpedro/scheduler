import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleRow from "./ScheduleRow";
import styled from "styled-components";
import { Segment, Header } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const GroupSchedule = ({ start, end, resources }) => {
  if (!resources || resources.length === 0) {
    return (
      <Segment placeholder basic textAlign="center">
        <Header>No results</Header>
      </Segment>
    );
  }
  return (
    <div>
      <HeaderWrapper>
        <ScheduleHeader start={start} end={end} includeEmptyCell />
      </HeaderWrapper>
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
