import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { ActiveStatus } from "../../common/status";
import { Create } from "../../common/actions";
import JobTasksList from "../../jobTasks/jobTasksList";
import { createResourceSchedule } from "../resourcesSchedule/resourcesCalendar";
import { IndividualWeekSchedule, useWeekPicker } from "../../common/schedule";
import { EditDeleteGroup } from "../../common/actions";
import { generatePath } from "react-router-dom";
import Routes from "../../../routes";
import queryString from "query-string";
import { CentredModal } from "../../common/modals";
import OutOfServicesList from "../../outOfServices/outOfServicesList";
import moment from "moment";
import { appointmentTypes } from "../../../utils";
import NoContent from "../../common/noContent";

const DELETE_MESSAGE = "Are you sure you want to delete this resource?";

const ResourceDetail = ({ resource, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [start, end, next, previous, reset, setDate] = useWeekPicker();
    const schedule = createResourceSchedule(resource, start, end);
    const jobTasks = resource.appointments.filter(
        a => a.type === appointmentTypes.JOB_TASK
    );
    const outOfServices = resource.appointments.filter(
        a => a.type === appointmentTypes.OUT_OF_SERVICE
    );

    const createOutOfServicePath = queryString.stringifyUrl({
        url: Routes.outOfServices.CREATE,
        query: {
            resourceId: resource.id,
        },
    });

    const editResourcePath = generatePath(Routes.resources.EDIT, {
        id: resource.id,
    });

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
                    <h2>{resource.name}</h2>
                </div>
                <div className="col mr-auto">
                    <ActiveStatus isActive={resource.isActive} />
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col mr-auto">
                    <Create path={createOutOfServicePath}>
                        Out Of Service
                    </Create>
                </div>
                <div className="col-auto">
                    <EditDeleteGroup
                        editPath={editResourcePath}
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
                <Tab eventKey="outOfServices" title="Out Of Services">
                    {outOfServices.length > 0 ? (
                        <OutOfServicesList outOfServices={outOfServices} />
                    ) : (
                        <NoContent item="out of services" />
                    )}
                </Tab>
            </Tabs>
            <CentredModal
                show={showModal}
                title={`Delete ${resource.name}`}
                content={DELETE_MESSAGE}
                handleSuccess={handleModalSuccess}
                handleHide={() => setShowModal(false)}
            />
        </>
    );
};

export default ResourceDetail;
