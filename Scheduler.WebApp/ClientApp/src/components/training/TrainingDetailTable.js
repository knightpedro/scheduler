import React from "react";
import { Icon, Table } from "semantic-ui-react";

const DATE_FORMAT = "Do MMM YYYY";
const TIME_FORMAT = "h:mm a";

const TrainingDetailTable = ({ training }) => (
  <Table basic="very" collapsing>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Icon name="clock outline" />
          Start
        </Table.Cell>
        <Table.Cell>{training.start.format(TIME_FORMAT)}</Table.Cell>
        <Table.Cell textAlign="right">
          {training.start.format(DATE_FORMAT)}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name="clock outline" />
          Finish
        </Table.Cell>
        <Table.Cell>{training.end.format(TIME_FORMAT)}</Table.Cell>
        <Table.Cell textAlign="right">
          {training.end.format(DATE_FORMAT)}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default TrainingDetailTable;
