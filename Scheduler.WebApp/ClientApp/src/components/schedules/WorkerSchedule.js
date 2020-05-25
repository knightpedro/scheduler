import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../ducks/loading";
import { workersSelectors, fetchCalendar } from "../../ducks/workers";
import { Grid, Header, Loader, ButtonGroup, Button } from "semantic-ui-react";
import ScheduleTable from "./ScheduleTable";
import { getWeekDays } from "../../utils/appointments";
import { useWeekPicker } from "./hooks";
import moment from "moment";
import DayPicker from "react-day-picker";

const HEADER_FORMAT = "ddd D";

const loadingSelector = createLoadingSelector([fetchCalendar.typePrefix]);

const WorkerSchedule = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const [hoverRange, setHoverRange] = useState();

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

  const selectedDays = { from: weekDays[0].toDate(), to: weekDays[6].toDate() };

  const handleDayLeave = () => setHoverRange();

  const handleDayEnter = (date) => {
    const hoverWeek = getWeekDays(moment(date));
    setHoverRange({ from: hoverWeek[0].toDate(), to: hoverWeek[6].toDate() });
  };

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
          <div>
            <Button onClick={() => reset()}>Today</Button>{" "}
            <ButtonGroup>
              <Button icon="left arrow" onClick={() => previousWeek()} />
              <Button icon="right arrow" onClick={() => nextWeek()} />
            </ButtonGroup>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <div>
            <DayPicker
              onDayMouseEnter={handleDayEnter}
              onDayMouseLeave={handleDayLeave}
              modifiers={{ hoverRange }}
              selectedDays={selectedDays}
              firstDayOfWeek={1}
              onDayClick={(date) => setDate(moment(date))}
            />
            <ScheduleTable calendar={calendar} headers={headers} />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkerSchedule;
