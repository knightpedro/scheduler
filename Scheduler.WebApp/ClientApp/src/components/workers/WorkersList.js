import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkers,
  workersSelectors,
  fetchIndividualCalendar,
} from "../../ducks/workers";
import { createErrorsSelector, clearAllErrors } from "../../ducks/errors";
import { createLoadingSelector } from "../../ducks/loading";
import { Icon, Grid, Loader, Message, List, Header } from "semantic-ui-react";

const loadingSelector = createLoadingSelector([
  fetchWorkers.typePrefix,
  fetchIndividualCalendar.typePrefix,
]);
const errorSelector = createErrorsSelector([
  fetchWorkers.typePrefix,
  fetchIndividualCalendar.typePrefix,
]);

const WorkersList = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const errors = useSelector(errorSelector);
  const workers = useSelector(workersSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchWorkers());
    dispatch(fetchIndividualCalendar({ id: 1 }));
  }, [dispatch]);

  return (
    <Grid stackable container>
      <Loader active={loading}>Loading</Loader>

      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Staff</Header>
        </Grid.Column>
      </Grid.Row>

      {errors.length > 0 && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <Message
              negative
              header="Errors"
              list={errors}
              onDismiss={() => dispatch(clearAllErrors())}
            ></Message>
          </Grid.Column>
        </Grid.Row>
      )}

      <List selection>
        {workers.map((w) => (
          <List.Item key={w.id}>
            <Icon name="user outline" color={w.isActive ? "green" : "red"} />
            <List.Content>
              <List.Header>{w.name}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Grid>
  );
};

export default WorkersList;
