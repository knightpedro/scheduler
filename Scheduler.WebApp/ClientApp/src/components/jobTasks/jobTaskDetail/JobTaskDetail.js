import React, { useState } from "react";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { EditDeleteGroup } from "../../common/actions";
import { CentredModal } from "../../common/modals";
import Title from "../../common/title";

const DELETE_MESSAGE = "Are you sure you want to delete this task?";

const JobTaskDetail = ({ jobTask, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const editPath = generatePath(Routes.jobTasks.EDIT, { id: jobTask.id });

  const handleModalSuccess = () => {
    setShowModal(false);
    handleDelete();
  };

  const renderResource = resource => {
    const resourcePath = generatePath(Routes.resources.DETAIL, {
      id: resource.id
    });
    return (
      <li key={resource.id}>
        <Link to={resourcePath}>{resource.name}</Link>
      </li>
    );
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
        <h2>{jobTask.description}</h2>
        <EditDeleteGroup
          editPath={editPath}
          handleDeleteClick={() => setShowModal(true)}
        />
      </Title>
      <p>Start: {jobTask.start}</p>
      <p>Finish: {jobTask.end}</p>
      {jobTask.workers.length > 0 && (
        <>
          <p className="font-weight-bold">Staff</p>
          <ul>{jobTask.workers.map(worker => renderWorker(worker))}</ul>
        </>
      )}
      {jobTask.resources.length > 0 && (
        <>
          <p className="font-weight-bold">Plant</p>
          <ul>{jobTask.resources.map(resource => renderResource(resource))}</ul>
        </>
      )}
      <CentredModal
        show={showModal}
        title={`Delete task ${jobTask.description}`}
        content={DELETE_MESSAGE}
        handleSuccess={handleModalSuccess}
        handleHide={() => setShowModal(false)}
      />
    </>
  );
};

export default JobTaskDetail;
