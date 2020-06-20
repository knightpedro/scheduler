import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header, Grid, Button, Divider, Modal, Icon } from "semantic-ui-react";
import { IndividualSchedule } from "../schedules/schedule";
import { uiSelectors, setPeriod } from "../../ducks/ui";
import { useWeekPicker } from "../schedules/useWeekPicker";
import WeekPicker from "../schedules/WeekPicker";
import { selectCalendarForWorker } from "../../ducks/globalSelectors";
import WorkerEventsView from "./WorkerEventsView";
import { deleteWorker } from "../../ducks/workers";
import routes from "../../routes";
import { Empty } from "../common";
import WorkerFormContainer from "../forms/containers/WorkerFormContainer";

const WorkerDetail = ({ id }) => {
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const worker = useSelector((state) => selectCalendarForWorker(state, id));

  const period = useSelector(uiSelectors.selectPeriod);
  const { start, end, nextWeek, previousWeek, reset, setDate } = useWeekPicker(
    period.start
  );

  useEffect(() => {
    dispatch(setPeriod({ start, end }));
  }, [dispatch, start, end]);

  const handleDelete = () => {
    dispatch(deleteWorker(id)).then(() => {
      history.push(routes.workers.base);
    });
  };

  if (!worker) return <Empty basic message="Staff member not found" />;

  return (
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">
            <Icon
              name="user outline"
              color={worker.isActive ? "green" : "red"}
            />
            <Header.Content>{worker.name}</Header.Content>
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
            <WorkerFormContainer
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
            schedule={worker.schedule}
            start={start}
            end={end}
          />
        </Grid.Column>
      </Grid.Row>
      <Divider hidden />
      <Grid.Row columns="equal">
        <Grid.Column>
          <WorkerEventsView id={id} />
        </Grid.Column>
      </Grid.Row>

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Header content="Delete Staff Member" />
          <Modal.Content>
            Are you sure you want to delete {worker.name}?
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

export default WorkerDetail;
