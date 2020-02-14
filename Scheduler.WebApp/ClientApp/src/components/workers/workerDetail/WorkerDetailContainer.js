import React, { useState } from "react";
import axios from "axios";
import { Loading, LoadingFailure } from "../../common/loading";
import { WORKERS_URL } from "../../../api";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import WorkerDetail from "./WorkerDetail";
import Routes from "../../../routes";
import { useWorkerCalendar } from "../workersSchedule/workersCalendar";
import Alert from "react-bootstrap/Alert";

const WorkerDetailContainer = props => {
    const id = props.match.params.id;
    const [loading, loadingError, worker] = useWorkerCalendar(id);
    const [deleteError, setDeleteError] = useState();

    const handleDelete = () => {
        setDeleteError(null);
        axios
            .delete(`${WORKERS_URL}/${id}`)
            .then(() => props.history.push(Routes.workers.LIST))
            .catch(error => setDeleteError(error));
    };

    const renderBreadcrumb = () => (
        <Breadcrumb>
            <Breadcrumb.Item href={Routes.workers.LIST}>Staff</Breadcrumb.Item>
            <Breadcrumb.Item active>{worker.name}</Breadcrumb.Item>
        </Breadcrumb>
    );

    const renderComponent = component => <Container>{component}</Container>;

    if (loading) return renderComponent(<Loading />);
    if (loadingError)
        return renderComponent(
            <LoadingFailure message={loadingError.message} />
        );

    return renderComponent(
        <>
            {renderBreadcrumb()}
            {deleteError && (
                <Alert
                    className="mt-4"
                    variant="danger"
                    dismissible
                    onClose={() => setDeleteError(null)}
                >
                    Delete failed: {deleteError.message}
                </Alert>
            )}
            <WorkerDetail worker={worker} handleDelete={handleDelete} />
        </>
    );
};

export default WorkerDetailContainer;
