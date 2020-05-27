import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../ducks/loading";
import { workersSelectors, fetchCalendar } from "../../ducks/workers";
import { Grid, Header, Loader, ButtonGroup, Button } from "semantic-ui-react";
import ScheduleTable from "./ScheduleTable";
import { getWeekDays } from "../../utils/appointments";
import { useWeekPicker } from "./hooks";
import WeekPicker from "./WeekPicker";

const HEADER_FORMAT = "ddd D";

const loadingSelector = createLoadingSelector([fetchCalendar.typePrefix]);

const WorkerSchedule = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const {
    start,
    end,
    nextWeek,
    previousWeek,
    reset,
    setDate,
  } = useWeekPicker();

  const calendar = useSelector((state) =>
    workersSelectors.selectCalendar(state, start, end)
  );

  const weekDays = getWeekDays(start);

  const headers = weekDays.map((d) => d.format(HEADER_FORMAT));

  useEffect(() => {
    dispatch(fetchCalendar({ start, end }));
  }, [dispatch]);

  return (
    <Grid stackable padded relaxed="very">
      <Loader active={loading}>Loading</Loader>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Staff Schedule</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <Button onClick={() => reset()}>Today</Button>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <WeekPicker
            start={start}
            end={end}
            handleDateChange={(startDate) => setDate(startDate)}
          />
          <ScheduleTable calendar={calendar} headers={headers} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkerSchedule;
