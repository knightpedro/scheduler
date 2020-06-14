import React from "react";
import { Icon, Table, Label, Button } from "semantic-ui-react";
import { Link, generatePath } from "react-router-dom";
import { jobStatus } from "../../constants";
import routes from "../../routes";

const DATE_FORMAT = "DD/MM/YYYY";

const JobDetailTable = ({ job, handleToggleComplete }) => (
  <Table basic="very" collapsing>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Icon
            name={job.isComplete ? "check" : "refresh"}
            color={job.isComplete ? "green" : "blue"}
          />
          {job.isComplete ? jobStatus.COMPLETE : jobStatus.IN_PROGRESS}
        </Table.Cell>
        <Table.Cell>
          <Button size="tiny" compact onClick={handleToggleComplete}>
            {job.isComplete ? "Mark uncomplete" : "Mark complete"}
          </Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={2}>
          <Icon name="map marker alternate" />
          {job.location}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name="user outline" />
          Coordinator
        </Table.Cell>
        <Table.Cell>
          {job.coordinator ? (
            <Link
              to={generatePath(routes.coordinators.detail, {
                id: job.coordinatorId,
              })}
            >
              {job.coordinator.name}
            </Link>
          ) : (
            "Not assigned"
          )}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name="calendar alternate outline" />
          Received
        </Table.Cell>
        <Table.Cell>
          {job.dateReceived ? job.dateReceived.format(DATE_FORMAT) : "-"}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name="calendar alternate outline" />
          Scheduled
        </Table.Cell>
        <Table.Cell>
          {job.dateScheduled ? job.dateScheduled.format(DATE_FORMAT) : "-"}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default JobDetailTable;
