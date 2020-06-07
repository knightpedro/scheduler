import React from "react";
import OutOfServiceForm from "../OutOfServiceForm";
import { useSelector, useDispatch } from "react-redux";
import {
  outOfServiceSelectors,
  deleteOutOfService,
  updateOutOfService,
  createOutOfService,
} from "../../../ducks/outOfServices";
import { resourcesSelectors } from "../../../ducks/resources";
import { closePortal } from "../../../ducks/portal";
import { Grid, Header, Icon } from "semantic-ui-react";

const OutOfServiceFormPortal = ({ id }) => {
  const dispatch = useDispatch();
  const outOfService = useSelector((state) =>
    outOfServiceSelectors.selectById(state, id)
  );
  const outOfServiceOptions = useSelector(
    outOfServiceSelectors.selectOutOfServiceTypeOptions
  );
  const resourceOptions = useSelector(resourcesSelectors.selectOptions);

  const handleCancel = () => {
    dispatch(closePortal());
  };

  const handleDelete = () => {
    dispatch(closePortal());
    dispatch(deleteOutOfService(id));
  };

  const handleSubmit = (values) => {
    dispatch(closePortal());
    if (id) {
      dispatch(updateOutOfService(values));
    } else {
      dispatch(createOutOfService(values));
    }
  };

  return (
    <Grid>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header>{id ? "Edit " : "Add "}Out Of Service</Header>
        </Grid.Column>
        {id && <Icon link name="trash" onClick={handleDelete} />}
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <OutOfServiceForm
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            values={outOfService}
            outOfServiceTypeOptions={outOfServiceOptions}
            resourceOptions={resourceOptions}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default OutOfServiceFormPortal;
