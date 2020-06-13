import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Header,
  Grid,
  Button,
  Divider,
  Segment,
  Modal,
} from "semantic-ui-react";
import { IndividualSchedule } from "../schedules/schedule";
import { uiSelectors, setPeriod } from "../../ducks/ui";
import { useWeekPicker } from "../schedules/hooks";
import WeekPicker from "../schedules/WeekPicker";
import { selectCalendarForWorker } from "../../ducks/globalSelectors";
import WorkerEventsView from "./WorkerEventsView";
import WorkerForm from "../forms/WorkerForm";
import { updateWorker, deleteWorker } from "../../ducks/workers";
import routes from "../../routes";

const WorkerDetail = () => {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const workerId = parseInt(id);

  const dispatch = useDispatch();
  const history = useHistory();
  const worker = useSelector((state) =>
    selectCalendarForWorker(state, workerId)
  );

  const period = useSelector(uiSelectors.selectPeriod);
  const { start, end, nextWeek, previousWeek, reset, setDate } = useWeekPicker(
    period.start
  );

  useEffect(() => {
    dispatch(setPeriod({ start, end }));
  }, [dispatch, start, end]);

  const handleSubmit = (values) => {
    const { schedule, ...worker } = values;
    setEditing(false);
    dispatch(updateWorker(worker));
  };

  const handleDelete = () => {
    dispatch(deleteWorker(id));
    history.push(routes.workers.list);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  if (!worker) return "Not found";

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">{worker.name}</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button.Group>
            <Button icon="edit" onClick={handleEditClick} />
            <Button icon="trash" onClick={handleDeleteClick} />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      {editing && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <Segment padded>
              <WorkerForm
                values={worker}
                handleCancel={() => setEditing(false)}
                handleSubmit={handleSubmit}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )}
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
          <WorkerEventsView id={workerId} />
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
