import React from "react";
import { List } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { resourcesSelectors } from "../../ducks/resources";
import { Empty } from "../common";

const ResourcesList = ({ activeId, filter, handleClick }) => {
  const resources = useSelector((state) =>
    resourcesSelectors.selectFiltered(state, filter)
  );

  if (resources.length === 0) return <Empty message="No plant found" />;

  return (
    <List selection verticalAlign="middle">
      {resources.map((r) => (
        <List.Item
          key={r.id}
          onClick={() => handleClick(r.id)}
          active={r.id === activeId}
        >
          <List.Icon
            name="truck"
            color={r.isActive ? "green" : "red"}
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header>{r.name}</List.Header>
            <List.Description>{r.description}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ResourcesList;
