import React, { useState } from 'react';
import { EditDeleteGroup } from '../../common/actions';
import Routes from '../../../routes';
import { generatePath } from 'react-router-dom';
import { CentredModal } from '../../common/modals';
import JobsList from '../../jobs/jobsList/JobsList';
import { ActiveStatus } from '../../common/status';
import Title from '../../common/title';
import NoContent from '../../common/noContent';

const DELETE_MESSAGE = "Are you sure you want to delete this coordinator?";

const CoordinatorDetail = ({ coordinator, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const editPath = generatePath(Routes.coordinators.EDIT, { id: coordinator.id });

    const handleModalSuccess = () => {
        setShowModal(false);
        handleDelete();
    }

    return (
        <>
            <Title>
                <h2>{coordinator.name}</h2>
                <ActiveStatus isActive={coordinator.isActive} />
                <EditDeleteGroup editPath={editPath} handleDeleteClick={() => setShowModal(true)} />
            </Title>
            
            {coordinator.jobs.length > 0 ? <JobsList jobs={coordinator.jobs} /> : <NoContent item="jobs" /> }
            <CentredModal show={showModal} title={`Delete ${coordinator.name}`} content={DELETE_MESSAGE} handleSuccess={handleModalSuccess} handleHide={() => setShowModal(false)} />
        </>
    )
};

export default CoordinatorDetail;