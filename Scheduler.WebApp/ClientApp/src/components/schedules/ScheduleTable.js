import React from "react";
import { Table, Statistic } from "semantic-ui-react";

const ScheduleTable = ({ days, calendar }) => {
  return (
    <Table celled columns="8">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {days.map((day, i) => (
            <Table.HeaderCell key={i} textAlign="center">
              <Statistic size="tiny">
                <Statistic.Label>{day.format("ddd")}</Statistic.Label>
                <Statistic.Value>{day.format("D")}</Statistic.Value>
              </Statistic>
            </Table.HeaderCell>
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
