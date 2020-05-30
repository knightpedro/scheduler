import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../ducks/loading";
import { workersSelectors, fetchCalendar } from "../../ducks/workers";
import { Grid, Header, Loader, Button, Input } from "semantic-ui-react";
import { useWeekPicker } from "./hooks";
import WeekPicker from "./WeekPicker";
import { GroupSchedule } from "./schedule";

const loadingSelector = createLoadingSelector([fetchCalendar.typePrefix]);

const WorkerSchedule = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState();
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
    workersSelectors.selectFilteredCalendar(state, start, end, filter)
  );

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

      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Input
            icon="search"
            placeholder="Search staff"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <WeekPicker
            start={start}
            end={end}
            handleDateChange={(startDate) => setDate(startDate)}
            handleNext={nextWeek}
            handlePrevious={previousWeek}
          />
        </Grid.Column>
        <Grid.Column>
          <Button basic floated="right" onClick={reset}>
            Today
          </Button>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <GroupSchedule resources={calendar} start={start} end={end} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkerSchedule;
