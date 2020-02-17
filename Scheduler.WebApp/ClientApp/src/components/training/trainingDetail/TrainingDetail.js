import React, { useState } from "react";
import { EditDeleteGroup } from "../../common/actions";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { CentredModal } from "../../common/modals";
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
        const workerPath = generatePath(Routes.workers.DETAIL, {
            id: worker.id,
        });
        return (
            <li key={worker.id}>
                <Link to={workerPath}>{worker.name}</Link>
            </li>
        );
    };

    return (
        <>
            <div className="row align-items-center">
                <div className="col ml-auto">
                    <h2>{training.description}</h2>
                </div>
                <div className="col-auto">
                    <EditDeleteGroup
                        editPath={editPath}
                        handleDeleteClick={() => setShowModal(true)}
                    />
                </div>
            </div>

            <p>
                <FontAwesomeIcon
                    className="mr-2"
                    icon={faMapMarkerAlt}
                    fixedWidth
                />
                {training.location}
            </p>
            <h6>Start</h6>
            <p>{training.start}</p>
            <h6>Finish</h6>
            <p>{training.end}</p>
            <div className="mt-5">
                <h5>Attendees</h5>
                <ul>{training.workers.map(worker => renderWorker(worker))}</ul>
            </div>
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
