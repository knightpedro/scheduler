import React from "react";
import { Icon, List } from "semantic-ui-react";

const WorkersList = ({ workers, handleClick }) => {
  return (
    <List selection>
      {workers.map((w) => (
        <List.Item key={w.id} onClick={() => handleClick(w)}>
          <Icon name="user outline" color={w.isActive ? "green" : "red"} />
          <List.Content>
            <List.Header>{w.name}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default WorkersList;
