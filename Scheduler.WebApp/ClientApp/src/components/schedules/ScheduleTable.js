import React from "react";
import { Table } from "semantic-ui-react";

const ScheduleTable = ({ headers, calendar }) => {
  return (
    <Table celled columns="8">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {headers.map((h) => (
            <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calendar.map((resource) => (
          <Table.Row key={resource.id}>
            <Table.Cell>{resource.name}</Table.Cell>
            {resource.schedule.map((day, i) => (
              <Table.Cell key={i}></Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ScheduleTable;
