import React from "react";
import { Create } from "../../common/actions";
import { Loading, LoadingFailure } from "../../common/loading";
import CoordinatorsList from "./CoordinatorsList";
import { coordinatorsService } from "../../../services";
import { sortByName } from "../../../utils";
import Container from "../../common/containers";
import Routes from "../../../routes";

class CoordinatorsListContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        coordinators: null,
    };

    componentDidMount() {
        coordinatorsService
            .getAll()
            .then(coordinators => {
                this.setState({
                    loading: false,
                    coordinators: coordinators.sort(sortByName),
                });
            })
            .catch(error => {
                this.setState({ loading: false, error });
            });
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Manage Coordinators</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, error, coordinators } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (error)
            return this.renderComponent(
                <LoadingFailure message={error.message} />
            );

        return this.renderComponent(
            <>
                <Create path={Routes.coordinators.CREATE}>Coordinator</Create>
                <CoordinatorsList coordinators={coordinators} />
            </>
        );
    }
}

export default CoordinatorsListContainer;
