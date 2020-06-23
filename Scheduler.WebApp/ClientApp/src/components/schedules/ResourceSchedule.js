import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectResourcesCalendar } from "../../ducks/globalSelectors";
import { uiSelectors, setPeriod } from "../../ducks/ui";
import {
  Grid,
  Header,
  Button,
  Input,
  Dropdown,
  Modal,
} from "semantic-ui-react";
import { useWeekPicker } from "./useWeekPicker";
import WeekPicker from "./WeekPicker";
import { GroupSchedule } from "./schedule";
import { fetchAll } from "../../ducks/sharedActions";
import { appointmentTypes } from "../../constants";
import routes from "../../routes";
import formContainerLookup from "./formContainerLookup";

const ResourceSchedule = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState();
  const [createType, setCreateType] = useState();
  const calendar = useSelector((state) =>
    selectResourcesCalendar(state, filter)
  );
  const period = useSelector(uiSelectors.selectPeriod);

  const { start, end, nextWeek, previousWeek, reset, setDate } = useWeekPicker(
    period.start
  );

  const createOptions = [
    { key: 1, text: "Task", value: appointmentTypes.JOB_TASK },
    {
      key: 2,
      text: "Out of service",
      value: appointmentTypes.OUT_OF_SERVICE,
    },
  ];

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPeriod({ start, end }));
  }, [dispatch, start, end]);

  const renderFormContainer = () => {
    const FormContainer = formContainerLookup[createType];
    if (FormContainer)
      return (
        <Modal dimmer="inverted" open={createType != null}>
          <FormContainer closeForm={() => setCreateType()} showDelete />
        </Modal>
      );
    return null;
  };

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h1">Plant Schedule</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Input
            fluid
            icon="search"
            placeholder="Search plant"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid.Column>
        <Grid.Column textAlign="center" width={7}>
          <WeekPicker
            start={start}
            end={end}
            handleDateChange={(startDate) => setDate(startDate)}
            handleNext={nextWeek}
            handlePrevious={previousWeek}
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Dropdown text="Create" button basic>
            <Dropdown.Menu>
              {createOptions.map((opt) => (
                <Dropdown.Item
                  {...opt}
                  onClick={() => setCreateType(opt.value)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button basic onClick={reset}>
            Today
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <GroupSchedule
            resources={calendar}
            start={start}
            end={end}
            detailPath={routes.resources.detail}
          />
        </Grid.Column>
      </Grid.Row>
      {renderFormContainer()}
    </Grid>
  );
};

export default ResourceSchedule;
