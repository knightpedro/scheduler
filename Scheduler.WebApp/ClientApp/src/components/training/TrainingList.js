import React from "react";
import { useSelector } from "react-redux";
import { trainingSelectors } from "../../ducks/training";
import { Empty } from "../common";
import { List } from "semantic-ui-react";

const TrainingList = ({ activeId, filter, handleClick }) => {
  const training = useSelector((state) =>
    trainingSelectors.selectFiltered(state, filter)
  );

  if (training.length === 0) return <Empty message="No training found" />;

  return (
    <List selection divided>
      {training.map((t) => (
        <List.Item
          key={t.id}
          active={t.id === activeId}
          onClick={() => handleClick(t.id)}
        >
          <List.Content>
            <List.Header>{t.description}</List.Header>
            <List.Description>{t.location}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default TrainingList;
