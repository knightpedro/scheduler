import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { outOfServiceSelectors } from "../../ducks/outOfServices";
import { OutOfServiceFormContainer } from "../forms/containers";
import { OutOfServicesTable } from "../outOfServices";
import { Empty } from "../common";
import { Grid, Button } from "semantic-ui-react";

const ResourceOutOfServicesView = ({ id }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const outOfServices = useSelector((state) =>
    outOfServiceSelectors.selectByResource(state, id)
  );

  useEffect(() => {
    handleCloseForm();
  }, [id]);

  const handleAddClick = () => {
    setSelectedId();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedId();
  };

  const handleOutOfServiceClick = ({ id }) => {
    setSelectedId(id);
    setShowForm(true);
  };

  return (
    <Grid>
      {showForm && (
        <Grid.Row columns="equal">
          <Grid.Column>
            <OutOfServiceFormContainer
              id={selectedId}
              resourceId={id}
              closeForm={handleCloseForm}
              showDelete={true}
            />
          </Grid.Column>
        </Grid.Row>
      )}

      {outOfServices && outOfServices.length > 0 ? (
        <Grid.Row columns="equal">
          <Grid.Column>
            <Button
              color="teal"
              content="Add"
              onClick={handleAddClick}
              floated="right"
            />
            <OutOfServicesTable
              outOfServices={outOfServices}
              handleClick={handleOutOfServiceClick}
            />
          </Grid.Column>
        </Grid.Row>
      ) : (
        <>
          <Grid.Row>
            <Grid.Column width={16} textAlign="right">
              <Button color="teal" content="Add" onClick={handleAddClick} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Empty message="No out of services found" />
            </Grid.Column>
          </Grid.Row>
        </>
      )}
    </Grid>
  );
};

export default ResourceOutOfServicesView;
