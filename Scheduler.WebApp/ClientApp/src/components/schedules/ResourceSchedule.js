import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectResourcesCalendar } from "../../ducks/globalSelectors";
import { uiSelectors, setPeriod } from "../../ducks/ui";
import { Grid, Header, Button, Input, Dropdown } from "semantic-ui-react";
import { useWeekPicker } from "./hooks";
import WeekPicker from "./WeekPicker";
import { GroupSchedule } from "./schedule";
import { fetchAll } from "../../ducks/sharedActions";
import { appointmentTypes } from "../../constants";
import { openPortal, components } from "../../ducks/portal";

const ResourceSchedule = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState();
  const calendar = useSelector((state) =>
    selectResourcesCalendar(state, filter)
  );
  const period = useSelector(uiSelectors.selectPeriod);

  const { start, end, nextWeek, previousWeek, reset, setDate } = useWeekPicker(
    period.start
  );

  const createOptions = [
    { text: "Job task", value: appointmentTypes.JOB_TASK },
    { text: "Out of service", value: appointmentTypes.OUT_OF_SERVICE },
  ];

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPeriod({ start, end }));
  }, [dispatch, start, end]);

  const handleCreate = (_, { value }) => {
    if (value === appointmentTypes.JOB_TASK) {
      dispatch(openPortal(components.jobTaskForm));
    } else if (value === appointmentTypes.OUT_OF_SERVICE) {
      dispatch(openPortal(components.outOfServiceForm));
    }
  };

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Plant Schedule</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Input
            icon="search"
            placeholder="Search plant"
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
        <Grid.Column textAlign="right">
          <Dropdown
            text="Create"
            button
            basic
            options={createOptions}
            value=""
            onChange={handleCreate}
          />
          <Button basic onClick={reset}>
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

export default ResourceSchedule;
