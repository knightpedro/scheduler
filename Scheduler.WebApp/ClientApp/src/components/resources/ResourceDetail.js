import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Button, Divider, Modal, Icon } from "semantic-ui-react";
import { IndividualSchedule } from "../schedules/schedule";
import { uiSelectors, setPeriod } from "../../ducks/ui";
import { useWeekPicker } from "../schedules/hooks";
import WeekPicker from "../schedules/WeekPicker";
import { selectCalendarForResource } from "../../ducks/globalSelectors";
import routes from "../../routes";
import { Empty } from "../common";
import { deleteResource } from "../../ducks/resources";
import { ResourceFormContainer } from "../forms/containers";
import ResourceEventsView from "./ResourceEventsView";

const ResourceDetail = ({ id }) => {
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const resource = useSelector((state) => selectCalendarForResource(state, id));

  const period = useSelector(uiSelectors.selectPeriod);
  const { start, end, nextWeek, previousWeek, reset, setDate } = useWeekPicker(
    period.start
  );

  useEffect(() => {
    dispatch(setPeriod({ start, end }));
  }, [dispatch, start, end]);

  const handleDelete = () => {
    dispatch(deleteResource(id)).then(() => {
      history.push(routes.resources.base);
    });
  };

  if (!resource) return <Empty basic message="Plant not found" />;

  return (
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">
            <Icon name="truck" color={resource.isActive ? "green" : "red"} />
            <Header.Content>
              {resource.name}
              <Header.Subheader>{resource.description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button.Group>
            <Button icon="edit" onClick={() => setEditing(true)} />
            <Button icon="trash" onClick={() => setShowModal(true)} />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>

      {editing && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <ResourceFormContainer
              id={id}
              closeForm={() => setEditing(false)}
              showHeader={false}
            />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row columns="equal">
        <Grid.Column>
          <Button basic onClick={reset}>
            Today
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="center" width={10}>
          <WeekPicker
            start={start}
            end={end}
            handleDateChange={(startDate) => setDate(startDate)}
            handleNext={nextWeek}
            handlePrevious={previousWeek}
          />
        </Grid.Column>
        <Grid.Column textAlign="right"></Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <IndividualSchedule
            schedule={resource.schedule}
            start={start}
            end={end}
          />
        </Grid.Column>
      </Grid.Row>
      <Divider hidden />
      <Grid.Row columns="equal">
        <Grid.Column>
          <ResourceEventsView id={id} />
        </Grid.Column>
      </Grid.Row>

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Header content="Delete Plant" />
          <Modal.Content>
            Are you sure you want to delete {resource.name}?
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setShowModal(false)} content="Cancel" />
            <Button onClick={handleDelete} content="Delete" negative />
          </Modal.Actions>
        </Modal>
      )}
    </Grid>
  );
};

export default ResourceDetail;
