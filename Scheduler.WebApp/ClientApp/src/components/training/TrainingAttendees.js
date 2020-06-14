import React from "react";
import { List } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { workerTrainingSelectors } from "../../ducks/training";
import { Link, generatePath } from "react-router-dom";
import routes from "../../routes";

const TrainingAttendees = ({ id }) => {
  const attendees = useSelector((state) =>
    workerTrainingSelectors.selectWorkersForTraining(state, id)
  );

  return (
    <List bulleted>
      {attendees.map((a) => (
        <List.Item key={a.id}>
          <Link to={generatePath(routes.workers.detail, { id: a.id })}>
            {a.name}
          </Link>
        </List.Item>
      ))}
    </List>
  );
};

export default TrainingAttendees;
