import React from "react";
import ResourcesList from "./ResourcesList";
import { Create } from "../../common/actions";
import Container from "../../common/containers";
import { Loading, LoadingFailure } from "../../common/loading";
import { sortByName } from "../../../utils";
import Routes from "../../../routes";
import { resourcesService } from "../../../services";

class ResourcesListContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        resources: null,
    };

    componentDidMount() {
        resourcesService
            .getAll()
            .then(resources =>
                this.setState({
                    resources: resources.sort(sortByName),
                })
            )
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Manage Plant</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, error, resources } = this.state;

        if (loading) return this.renderComponent(<Loading />);
        if (error)
            return this.renderComponent(
                <LoadingFailure message={error.message} />
            );

        return this.renderComponent(
            <>
                <Create path={Routes.resources.CREATE}>Plant</Create>
                <ResourcesList resources={resources} />
            </>
        );
    }
}

export default ResourcesListContainer;
