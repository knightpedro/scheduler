import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../ducks/loading";
import { workersSelectors, fetchCalendar } from "../../ducks/workers";
import moment from "moment";
import { Grid, Header, Loader } from "semantic-ui-react";
import ScheduleTable from "./ScheduleTable";
import { getDatesBetween } from "../../utils/appointments";

const loadingSelector = createLoadingSelector([fetchCalendar.typePrefix]);

const WorkerSchedule = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const start = moment().startOf("isoWeek");
  const end = start.clone().add(1, "week");
  const calendar = useSelector((state) =>
    workersSelectors.selectCalendar(state, start, end)
  );

  useEffect(() => {
    dispatch(fetchCalendar({ start, end }));
  }, [dispatch]);

  return (
    <Grid stackable>
      <Loader active={loading}>Loading</Loader>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Staff Schedule</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <ScheduleTable
            calendar={calendar}
            headers={getDatesBetween(start, end).map((d) => d.format("ddd D"))}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkerSchedule;
