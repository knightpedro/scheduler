import React, { useState } from 'react';
import { JobTasksList } from '../../jobTasks';
import { Create, EditDeleteGroup } from '../../common/actions';
import { CentredModal } from '../../common/modals';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import Routes from '../../../routes';
import { CompletionStatus } from '../../common/status';
import Title from '../../common/title';
import NoContent from '../../common/noContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const DELETE_MESSAGE = 'Are you sure you want to delete this job?';

const JobDetail = ({ job, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const jobQuery = queryString.stringify({jobid: job.id});
    const editJobPath = generatePath(Routes.jobs.EDIT, { id: job.id });

    const handleModalSuccess = () => {
        setShowModal(false);
        handleDelete();
    }

    const renderCoordinator = () => {
        const coordinatorPath = generatePath(Routes.coordinators.DETAIL, { id: job.coordinator.id });
        return <Link to={coordinatorPath}>{job.coordinator.name}</Link>;
    }

    return (
        <>
        <Title>
            <h2>Job {job.jobNumber}</h2>
            <CompletionStatus isComplete={job.isComplete} />
            <EditDeleteGroup editPath={editJobPath} handleDeleteClick={() => setShowModal(true)} />
        </Title>
    
        <h5>{job.description}</h5>
        <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
            {job.location}
        </p>
        <p>Coordinator: {job.coordinator ? renderCoordinator() : 'Not assigned'}</p>
        <CentredModal show={showModal} title={`Delete Job ${job.jobNumber}`} content={DELETE_MESSAGE} handleSuccess={handleModalSuccess} handleHide={() => setShowModal(false)} />

        <h4>Tasks</h4>
        <Create path={{pathname: Routes.jobTasks.CREATE, search: jobQuery}}>Task</Create>
        {job.jobTasks.length > 0 ? <JobTasksList jobTasks={job.jobTasks}/> : <NoContent item="tasks" /> }
        </>
    );
};

export default JobDetail;