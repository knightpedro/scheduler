import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../ducks/loading";
import { workersSelectors, fetchCalendar } from "../../ducks/workers";
import { Grid, Header, Loader, Button, Dropdown } from "semantic-ui-react";
import ScheduleTable from "./ScheduleTable";
import { getWeekDays } from "../../utils/appointments";
import { useWeekPicker } from "./hooks";
import WeekPicker from "./WeekPicker";

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

  useEffect(() => {
    dispatch(fetchCalendar({ start, end }));
  }, [dispatch, start, end]);

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
          <Button.Group>
            <Button basic icon="angle left" onClick={previousWeek} />
            <WeekPicker
              start={start}
              end={end}
              handleDateChange={(startDate) => setDate(startDate)}
            />
            <Button basic icon="angle right" onClick={nextWeek} />
          </Button.Group>
          <Button basic floated="right" onClick={reset}>
            Today
          </Button>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <ScheduleTable calendar={calendar} days={weekDays} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkerSchedule;
