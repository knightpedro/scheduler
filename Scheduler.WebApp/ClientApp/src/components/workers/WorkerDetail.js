import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Button } from "semantic-ui-react";
import { IndividualSchedule } from "../schedules/schedule";
import { uiSelectors, setPeriod } from "../../ducks/ui";
import { useWeekPicker } from "../schedules/hooks";
import WeekPicker from "../schedules/WeekPicker";
import { selectCalendarForWorker } from "../../ducks/globalSelectors";

const WorkerDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const worker = useSelector((state) => selectCalendarForWorker(state, id));
  const period = useSelector(uiSelectors.selectPeriod);
  const { start, end, nextWeek, previousWeek, reset, setDate } = useWeekPicker(
    period.start
  );

  useEffect(() => {
    dispatch(setPeriod({ start, end }));
  }, [dispatch, start, end]);

  if (!worker) return "Not found";

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">{worker.name}</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column textAlign="center" width={10}>
          <WeekPicker
            start={start}
            end={end}
            handleDateChange={(startDate) => setDate(startDate)}
            handleNext={nextWeek}
            handlePrevious={previousWeek}
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button basic onClick={reset}>
            Today
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <IndividualSchedule
            schedule={worker.schedule}
            start={start}
            end={end}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkerDetail;
