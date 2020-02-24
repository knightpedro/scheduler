import React, { useState } from "react";
import { EditDeleteGroup } from "../../common/actions";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import Modal from "../../common/modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const DELETE_MESSAGE = "Are you sure you want to delete this training?";

const TimeWrapper = styled.div`
    background-color: #f9f9f9;

    h4 {
        color: ${props => props.theme.colours.secondary};
    }

    p {
        font-weight: 400;
    }
`;

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

            <TimeWrapper className="row mt-5 p-5 align-items-center">
                <div className="col-md">
                    <h4>Start</h4>
                    <p className="lead">{training.start}</p>
                </div>
                <div className="col-md">
                    <h4>Finish</h4>
                    <p className="lead">{training.end}</p>
                </div>
            </TimeWrapper>
            <div className="row mt-5">
                <div className="col">
                    <h5>Attendees</h5>
                    <ul>
                        {training.workers.map(worker => renderWorker(worker))}
                    </ul>
                </div>
            </div>
            <Modal
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
