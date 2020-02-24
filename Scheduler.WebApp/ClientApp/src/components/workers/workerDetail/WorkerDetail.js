import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Create } from "../../common/actions";
import JobTasksList from "../../jobTasks/jobTasksList";
import LeaveList from "../../leave/leaveList";
import TrainingList from "../../training/trainingList/TrainingList";
import { IndividualWeekSchedule, useWeekPicker } from "../../common/schedule";
import { EditDeleteGroup } from "../../common/actions";
import { generatePath } from "react-router-dom";
import Routes from "../../../routes";
import queryString from "query-string";
import Modal from "../../common/modals";
import { ActiveStatus } from "../../common/status";
import { createWorkerSchedule } from "../workersSchedule/workersCalendar";
import { appointmentTypes } from "../../../utils";
import moment from "moment";
import NoContent from "../../common/noContent";

const DELETE_MESSAGE = "Are you sure you want to delete this staff member?";

const WorkerDetail = ({ worker, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [start, end, next, previous, reset, setDate] = useWeekPicker();
    const schedule = createWorkerSchedule(worker, start, end);
    const jobTasks = worker.appointments.filter(
        a => a.type === appointmentTypes.JOB_TASK
    );
    const leave = worker.appointments.filter(
        a => a.type === appointmentTypes.LEAVE
    );
    const training = worker.appointments.filter(
        a => a.type === appointmentTypes.TRAINING
    );

    const createLeavePath = queryString.stringifyUrl({
        url: Routes.leave.CREATE,
        query: {
            workerId: worker.id,
        },
    });

    const editWorkerPath = generatePath(Routes.workers.EDIT, { id: worker.id });

    const handleDateChange = date => {
        if (date instanceof moment) setDate(date);
    };

    const handleModalSuccess = () => {
        setShowModal(false);
        handleDelete();
    };

    return (
        <>
            <div className="row align-items-center">
                <div className="col-auto">
                    <h2>{worker.name}</h2>
                </div>
                <div className="col mr-auto">
                    <ActiveStatus isActive={worker.isActive} showLabel={true} />
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col mr-auto">
                    <Create path={createLeavePath}>Leave</Create>
                </div>
                <div className="col-auto">
                    <EditDeleteGroup
                        editPath={editWorkerPath}
                        handleDeleteClick={() => setShowModal(true)}
                    />
                </div>
            </div>

            <IndividualWeekSchedule
                schedule={schedule}
                start={start}
                onNextWeek={next}
                onPreviousWeek={previous}
                onReset={reset}
                onDateChange={handleDateChange}
            />
            <Tabs>
                <Tab eventKey="tasks" title="Tasks">
                    {jobTasks.length > 0 ? (
                        <JobTasksList jobTasks={jobTasks} />
                    ) : (
                        <NoContent item="tasks" />
                    )}
                </Tab>
                <Tab eventKey="training" title="Training">
                    {training.length > 0 ? (
                        <TrainingList training={training} />
                    ) : (
                        <NoContent item="training" />
                    )}
                </Tab>
                <Tab eventKey="leave" title="Leave">
                    {leave.length > 0 ? (
                        <LeaveList leave={leave} />
                    ) : (
                        <NoContent item="leave" />
                    )}
                </Tab>
            </Tabs>
            <Modal
                show={showModal}
                title={`Delete ${worker.name}`}
                content={DELETE_MESSAGE}
                handleSuccess={handleModalSuccess}
                handleHide={() => setShowModal(false)}
            />
        </>
    );
};

export default WorkerDetail;
