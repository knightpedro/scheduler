import React, { useState, useEffect } from "react";
import PeriodPicker from "./PeriodPicker";
import { Grid } from "semantic-ui-react";
import JobsCard from "./cards/JobsCard";
import { useDispatch } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";
import CoordinatorWorkLoadChart from "./charts/CoordinatorWorkLoadChart";
import TrainingAttendanceChart from "./charts/TrainingAttendanceChart";
import LeaveChart from "./charts/LeaveChart";
import OutOfServiceChart from "./charts/OutOfServiceChart";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState({ start: null, end: null });

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row columns="equal">
        <Grid.Column>
          <PeriodPicker onChange={(period) => setPeriod(period)} />
          <JobsCard {...period} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <CoordinatorWorkLoadChart {...period} />
        </Grid.Column>
        <Grid.Column>
          <TrainingAttendanceChart {...period} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <LeaveChart {...period} />
        </Grid.Column>
        <Grid.Column>
          <OutOfServiceChart {...period} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default ReportsPage;
