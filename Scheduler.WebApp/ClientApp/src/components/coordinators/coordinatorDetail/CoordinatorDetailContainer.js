import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coordinatorsService } from "../../../services";
import Routes from "../../../routes";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import { Loading, LoadingFailure } from "../../common/loading";
import CoordinatorDetail from "./CoordinatorDetail";

const CoordinatorDetailContainer = props => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [coordinator, setCoordinator] = useState();
    const coordinatorId = props.match.params.id;

    const deleteCoordinator = () => {
        coordinatorsService
            .destroy(coordinatorId)
            .then(() => props.history.push(Routes.coordinators.LIST))
            .catch(error => setError(error));
    };

    useEffect(() => {
        coordinatorsService
            .getWithJobs(coordinatorId)
            .then(c => setCoordinator(c))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [coordinatorId]);

    const renderBreadcrumb = () => (
        <Breadcrumb>
            <Link className="breadcrumb-item" to={Routes.coordinators.LIST}>
                Coordinators
            </Link>
            <Breadcrumb.Item active>{coordinator.name}</Breadcrumb.Item>
        </Breadcrumb>
    );

    const renderComponent = component => (
        <Container>
            {coordinator && renderBreadcrumb()}
            {component}
        </Container>
    );

    if (loading) return renderComponent(<Loading />);
    if (error)
        return renderComponent(<LoadingFailure message={error.message} />);
    return renderComponent(
        <CoordinatorDetail
            coordinator={coordinator}
            handleDelete={deleteCoordinator}
        />
    );
};

export default CoordinatorDetailContainer;
