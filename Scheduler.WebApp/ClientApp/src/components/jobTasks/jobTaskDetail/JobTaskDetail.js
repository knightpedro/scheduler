import React, { useState } from "react";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { EditDeleteGroup } from "../../common/actions";
import Modal from "../../common/modals";
import styled from "styled-components";

const DELETE_MESSAGE = "Are you sure you want to delete this task?";

const TimeWrapper = styled.div`
    background-color: #f9f9f9;

    h4 {
        color: ${props => props.theme.colours.secondary};
    }

    p {
        font-weight: 400;
    }
`;

const JobTaskDetail = ({ jobTask, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const editPath = generatePath(Routes.jobTasks.EDIT, { id: jobTask.id });

    const handleModalSuccess = () => {
        setShowModal(false);
        handleDelete();
    };

    const renderResource = resource => {
        const resourcePath = generatePath(Routes.resources.DETAIL, {
            id: resource.id,
        });
        return (
            <li key={resource.id}>
                <Link to={resourcePath}>{resource.name}</Link>
            </li>
        );
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
                    <h2>{jobTask.description}</h2>
                </div>
                <div className="col-auto">
                    <EditDeleteGroup
                        editPath={editPath}
                        handleDeleteClick={() => setShowModal(true)}
                    />
                </div>
            </div>

            <TimeWrapper className="row mt-5 p-5 align-items-center">
                <div className="col-md">
                    <h4>Start</h4>
                    <p className="lead">{jobTask.start}</p>
                </div>
                <div className="col-md">
                    <h4>Finish</h4>
                    <p className="lead">{jobTask.end}</p>
                </div>
            </TimeWrapper>

            <div className="row mt-5">
                <div className="col">
                    {jobTask.workers.length > 0 && (
                        <>
                            <h5>Staff</h5>
                            <ul>
                                {jobTask.workers.map(worker =>
                                    renderWorker(worker)
                                )}
                            </ul>
                        </>
                    )}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    {jobTask.resources.length > 0 && (
                        <>
                            <h5>Plant</h5>
                            <ul>
                                {jobTask.resources.map(resource =>
                                    renderResource(resource)
                                )}
                            </ul>
                        </>
                    )}
                </div>
            </div>
            <Modal
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
