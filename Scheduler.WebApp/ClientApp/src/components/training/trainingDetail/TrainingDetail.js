import React, { useState } from "react";
import { EditDeleteGroup } from "../../common/actions";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { CentredModal } from "../../common/modals";
import Title from "../../common/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const DELETE_MESSAGE = "Are you sure you want to delete this training?";

const TrainingDetail = ({ training, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const editPath = generatePath(Routes.training.EDIT, { id: training.id });

  const handleModalSuccess = () => {
    setShowModal(false);
    handleDelete();
  };

  const renderWorker = worker => {
    const workerPath = generatePath(Routes.workers.DETAIL, { id: worker.id });
    return (
      <li key={worker.id}>
        <Link to={workerPath}>{worker.name}</Link>
      </li>
    );
  };

  return (
    <>
      <Title>
        <h2>{training.description}</h2>
        <EditDeleteGroup
          editPath={editPath}
          handleDeleteClick={() => setShowModal(true)}
        />
      </Title>

      <p>
        <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
        {training.location}
      </p>
      <p>Start: {training.start}</p>
      <p>Finish: {training.end}</p>
      <h5>Attendees</h5>
      <ul>{training.workers.map(worker => renderWorker(worker))}</ul>
      <CentredModal
        show={showModal}
        title={`Delete ${training.description}`}
        content={DELETE_MESSAGE}
        handleSuccess={handleModalSuccess}
        handleHide={() => setShowModal(false)}
      />
    </>
  );
};

export default TrainingDetail;
