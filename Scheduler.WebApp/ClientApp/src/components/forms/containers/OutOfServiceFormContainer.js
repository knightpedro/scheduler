import React from "react";
import { OutOfServiceForm } from "../";
import { useDispatch, useSelector } from "react-redux";
import {
  outOfServiceSelectors,
  deleteOutOfService,
  updateOutOfService,
  createOutOfService,
} from "../../../ducks/outOfServices";
import { resourcesSelectors } from "../../../ducks/resources";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";

const OutOfServiceFormContainer = ({
  id,
  resourceId,
  closeForm,
  showHeader = true,
  showDelete = false,
}) => {
  const dispatch = useDispatch();
  const oos = useSelector((state) =>
    outOfServiceSelectors.selectById(state, id)
  );
  const values = { resourceId, ...oos };

  const oosTypeOptions = useSelector(
    outOfServiceSelectors.selectOutOfServiceTypeOptions
  );
  const resourceOptions = useSelector(resourcesSelectors.selectOptions);

  const handleDelete = () => {
    dispatch(deleteOutOfService(id));
    closeForm();
  };

  const handleSubmit = (values) => {
    if (id) dispatch(updateOutOfService(values));
    else dispatch(createOutOfService(values));
    closeForm();
  };

  return (
    <Segment padded>
      <Grid>
        {showHeader && (
          <Grid.Row columns="equal">
            <Grid.Column>
              <Header>{id ? "Edit" : "Add"} Out of Service</Header>
            </Grid.Column>
            {showDelete && id && (
              <Grid.Column textAlign="right">
                <Icon name="trash" link onClick={handleDelete} />
              </Grid.Column>
            )}
          </Grid.Row>
        )}
        <Grid.Row columns="equal">
          <Grid.Column>
            <OutOfServiceForm
              values={values}
              handleCancel={closeForm}
              handleSubmit={handleSubmit}
              outOfServiceTypeOptions={oosTypeOptions}
              resourceOptions={resourceOptions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default OutOfServiceFormContainer;
