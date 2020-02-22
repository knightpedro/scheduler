import React, { useState, useEffect } from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import EditLeaveForm from "./EditLeaveForm";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import moment from "moment";
import { isEqual } from "lodash";
import { Delete } from "../../common/actions";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { leaveService, workersService } from "../../../services";

const EditLeaveFormContainer = props => {
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState();
    const [formError, setFormError] = useState();
    const [leave, setLeave] = useState();
    const [leaveTypes, setLeaveTypes] = useState();
    const leaveId = props.match.params.id;

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const leave = await leaveService.getById(leaveId);
                const leaveTypes = await leaveService.getTypes();
                const worker = await workersService.getById(leave.workerId);
                const start = moment(leave.start);
                const end = moment(leave.end);
                const leaveType = {
                    label: leave.leaveType,
                    value: leave.leaveType,
                };
                setLeave({
                    ...leave,
                    start,
                    end,
                    leaveType,
                    worker,
                });
                setLeaveTypes(
                    leaveTypes.sort().map(l => ({ label: l, value: l }))
                );
            } catch (error) {
                setLoadingError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeave();
    }, [leaveId]);

    const handleCancel = () => props.history.goBack();

    const handleDelete = () => {
        leaveService
            .destroy(leave.id)
            .then(() => props.history.goBack())
            .catch(error => setFormError(error));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setFormError(null);
        if (isEqual(values, leave)) {
            setFormError({ message: "No changes made" });
            setSubmitting(false);
            return;
        }

        const putBody = {
            id: values.id,
            workerId: values.workerId,
            leaveType: values.leaveType.value,
            start: values.start.format(),
            end: values.end.format(),
        };

        leaveService
            .edit(putBody)
            .then(() => props.history.goBack())
            .catch(error => {
                setFormError(error);
                setSubmitting(false);
            });
    };

    const renderBreadcrumb = () => {
        const workerPath = generatePath(Routes.workers.DETAIL, {
            id: leave.worker.id,
        });
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.jobs.LIST}>
                    Staff
                </Link>
                <Link className="breadcrumb-item" to={workerPath}>
                    {leave.worker.name}
                </Link>
                <Breadcrumb.Item active>Edit Leave</Breadcrumb.Item>
            </Breadcrumb>
        );
    };

    const renderComponent = component => (
        <Container>
            {leave && renderBreadcrumb()}
            <div className="row align-items-center">
                <div className="col ml-auto">
                    <h2>Edit Leave</h2>
                </div>
                <div className="col-auto">
                    {leave && <Delete handleClick={handleDelete} />}
                </div>
            </div>
            {formError && <Alert variant="danger">{formError.message}</Alert>}
            {component}
        </Container>
    );

    if (loading) return renderComponent(<Loading />);
    if (loadingError)
        return renderComponent(
            <LoadingFailure message={loadingError.message} />
        );
    return renderComponent(
        <EditLeaveForm
            leave={leave}
            leaveTypes={leaveTypes}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        />
    );
};

export default EditLeaveFormContainer;
