import React from "react";
import { useSelector } from "react-redux";
import { coordinatorsSelectors } from "../../ducks/coordinators";
import { Empty } from "../common";
import { List } from "semantic-ui-react";

const CoordinatorsList = ({ activeId, filter, handleClick }) => {
  const coordinators = useSelector((state) =>
    coordinatorsSelectors.selectFiltered(state, filter)
  );

  if (coordinators.length === 0)
    return <Empty basic message="No coordinators found" />;

  return (
    <List selection>
      {coordinators.map((c) => (
        <List.Item
          key={c.id}
          onClick={() => handleClick(c.id)}
          active={c.id === activeId}
        >
          <List.Icon
            name="user"
            color={c.isActive ? "green" : "red"}
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header>{c.name}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default CoordinatorsList;
