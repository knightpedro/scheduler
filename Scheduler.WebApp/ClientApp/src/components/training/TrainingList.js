import React from "react";
import { useSelector } from "react-redux";
import { trainingSelectors } from "../../ducks/training";
import { Empty } from "../common";
import { List, Segment } from "semantic-ui-react";

const DATETIME_FORMAT = "h:mma Do MMM YYYY";
const MAXIMUM_DISPLAYED = 10;

const TrainingList = ({ activeId, filter, handleClick }) => {
  const training = useSelector((state) =>
    trainingSelectors.selectFiltered(state, filter)
  );

  const trainingCount = useSelector(trainingSelectors.selectTotal);

  if (!training || training.length === 0)
    return <Empty basic message="No training found" />;

  return (
    <Segment>
      <div style={{ color: "rgba(0,0,0,0.5)" }}>
        <small>
          Showing {Math.min(training.length, MAXIMUM_DISPLAYED)} of{" "}
          {trainingCount} records
        </small>
      </div>
      <List selection>
        {training.slice(0, MAXIMUM_DISPLAYED).map((t) => (
          <List.Item
            key={t.id}
            active={t.id === activeId}
            onClick={() => handleClick(t.id)}
          >
            <List.Content>
              <List.Header>{t.description}</List.Header>
              <List.Description>
                {t.start.format(DATETIME_FORMAT)}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default TrainingList;
