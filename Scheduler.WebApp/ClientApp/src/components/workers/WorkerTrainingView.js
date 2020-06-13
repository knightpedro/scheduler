import React from "react";
import { useSelector } from "react-redux";
import { workerTrainingSelectors } from "../../ducks/training";
import { TrainingTable } from "../training";
import { Empty } from "../common";
import { generatePath, useHistory } from "react-router-dom";
import routes from "../../routes";

const WorkerTrainingView = ({ id }) => {
  const history = useHistory();
  const training = useSelector((state) =>
    workerTrainingSelectors.selectTrainingForWorker(state, id)
  );

  const handleTrainingClick = ({ id }) => {
    const path = generatePath(routes.training.detail, { id });
    history.push(path);
  };

  return (
    <>
      {training && training.length > 0 ? (
        <TrainingTable training={training} handleClick={handleTrainingClick} />
      ) : (
        <Empty message="No training found" />
      )}
    </>
  );
};

export default WorkerTrainingView;
