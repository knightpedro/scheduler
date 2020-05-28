import React from "react";
import { Table, Statistic, Header } from "semantic-ui-react";
import { Appointment } from "./Appointment";
import moment from "moment";

const ScheduleTable = ({ days, calendar }) => {
  const today = moment();
  return (
    <Table celled columns="8">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {days.map((day, i) => (
            <Table.HeaderCell key={i} textAlign="center">
              <Statistic
                size="tiny"
                color={today.isSame(day, "day") ? "teal" : null}
              >
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
            <Table.Cell>
              <Header as="h4">{resource.name}</Header>
            </Table.Cell>
            {resource.schedule.map((day, i) => (
              <Table.Cell key={i}>
                {day.map((d) => (
                  <Appointment key={`${d.id}${d.type}`} {...d} />
                ))}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ScheduleTable;
