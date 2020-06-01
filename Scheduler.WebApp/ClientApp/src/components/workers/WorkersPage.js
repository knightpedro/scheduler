import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorker,
  updateWorker,
  fetchWorkers,
  workersSelectors,
} from "../../ducks/workers";
import { fetchAll } from "../../ducks/combined";
import { createLoadingSelector } from "../../ducks/loading";
import {
  Grid,
  Input,
  Loader,
  Message,
  Header,
  Button,
} from "semantic-ui-react";
import WorkersList from "./WorkersList";
import {
  JobForm,
  LeaveForm,
  WorkerForm,
  TrainingForm,
  JobTaskForm,
} from "../forms";

const loadingSelector = createLoadingSelector([fetchWorkers.typePrefix]);

const WorkersPage = () => {
  const [filter, setFilter] = useState();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState();
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const workers = useSelector((state) =>
    workersSelectors.selectFiltered(state, filter)
  );

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const closeForm = () => {
    setShowForm(false);
    setEditing();
  };

  const handleAddClick = () => {
    setEditing();
    setShowForm(true);
  };

  const handleWorkerClick = (worker) => {
    setEditing(worker);
    setShowForm(true);
  };

  const handleCreateWorker = (values) => {
    dispatch(createWorker(values));
  };

  const handleEditWorker = (values) => {
    dispatch(updateWorker(values));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (values.id) {
      handleEditWorker(values);
    } else {
      handleCreateWorker(values);
    }
    setSubmitting(false);
    closeForm();
  };

  return (
    <Grid stackable container>
      <Loader active={loading}>Loading</Loader>

      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Staff</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <Input
            fluid
            icon="search"
            placeholder={`Search ${workers.length} records`}
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid.Column>
        <Button icon="add" onClick={handleAddClick} />
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6}>
          <WorkersList workers={workers} handleClick={handleWorkerClick} />
        </Grid.Column>
        <JobTaskForm />
        <JobForm />
        <LeaveForm />
        <TrainingForm />
        {showForm && (
          <Grid.Column width={10}>
            <Header>{editing ? "Edit" : "Add"} Worker</Header>
            <WorkerForm
              handleSubmit={handleSubmit}
              handleCancel={closeForm}
              values={editing}
            />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default WorkersPage;
