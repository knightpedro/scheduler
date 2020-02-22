import React, { useState } from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import ResourceDetail from "./ResourceDetail";
import Routes from "../../../routes";
import { useResourceCalendar } from "../resourcesSchedule/resourcesCalendar";
import Alert from "../../common/alert";
import { Link } from "react-router-dom";
import { resourcesService } from "../../../services";

const ResourceDetailContainer = props => {
    const id = props.match.params.id;
    const [loading, loadingError, resource] = useResourceCalendar(id);
    const [deleteError, setDeleteError] = useState();

    const handleDelete = () => {
        setDeleteError(null);
        resourcesService
            .destroy(id)
            .then(() => props.history.push(Routes.resources.LIST))
            .catch(error => setDeleteError(error));
    };

    const renderBreadcrumb = () => (
        <Breadcrumb>
            <Link className="breadcrumb-item" to={Routes.resources.LIST}>
                Plant
            </Link>
            <Breadcrumb.Item active>{resource.name}</Breadcrumb.Item>
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
            <ResourceDetail resource={resource} handleDelete={handleDelete} />
        </>
    );
};

export default ResourceDetailContainer;
