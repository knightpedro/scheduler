import React, { useState } from "react";
import { EditDeleteGroup } from "../../common/actions";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";
import { CentredModal } from "../../common/modals";
import JobsList from "../../jobs/jobsList/JobsList";
import { ActiveStatus } from "../../common/status";
import NoContent from "../../common/noContent";

const DELETE_MESSAGE = "Are you sure you want to delete this coordinator?";

const CoordinatorDetail = ({ coordinator, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const editPath = generatePath(Routes.coordinators.EDIT, {
    id: coordinator.id
  });

  const handleModalSuccess = () => {
    setShowModal(false);
    handleDelete();
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-auto">
          <h2>{coordinator.name}</h2>
        </div>
        <div className="col mr-auto">
          <ActiveStatus isActive={coordinator.isActive} />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col mr-auto"></div>
        <div className="col-auto">
          <EditDeleteGroup
            editPath={editPath}
            handleDeleteClick={() => setShowModal(true)}
          />
        </div>
      </div>

      {coordinator.jobs.length > 0 ? (
        <JobsList jobs={coordinator.jobs} />
      ) : (
        <NoContent item="jobs" />
      )}
      <CentredModal
        show={showModal}
        title={`Delete ${coordinator.name}`}
        content={DELETE_MESSAGE}
        handleSuccess={handleModalSuccess}
        handleHide={() => setShowModal(false)}
      />
    </>
  );
};

export default CoordinatorDetail;
