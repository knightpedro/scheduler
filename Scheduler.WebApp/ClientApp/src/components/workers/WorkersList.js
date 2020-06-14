import React from "react";
import { Icon, List } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { workersSelectors } from "../../ducks/workers";
import { Empty } from "../common";

const WorkersList = ({ activeId, filter, handleClick }) => {
  const workers = useSelector((state) =>
    workersSelectors.selectFiltered(state, filter)
  );

  if (workers.length === 0) return <Empty message="No staff found" />;

  return (
    <List selection>
      {workers.map((w) => (
        <List.Item
          key={w.id}
          onClick={() => handleClick(w.id)}
          active={w.id === activeId}
        >
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
