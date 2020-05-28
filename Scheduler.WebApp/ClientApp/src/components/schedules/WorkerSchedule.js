import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../ducks/loading";
import { workersSelectors, fetchCalendar } from "../../ducks/workers";
import { Grid, Header, Loader, Button, Dropdown } from "semantic-ui-react";
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

  console.log(calendar);

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
          <WeekPicker
            start={start}
            end={end}
            handleDateChange={(startDate) => setDate(startDate)}
            handlePreviousClick={previousWeek}
            handleNextClick={nextWeek}
          />{" "}
          <Button onClick={reset}>Today</Button>
          <Dropdown
            button
            className="icon right floated"
            floating
            labeled
            icon="add"
            text="Create"
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Job" />
              <Dropdown.Item text="Leave" />
              <Dropdown.Item text="Training" />
            </Dropdown.Menu>
          </Dropdown>
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
