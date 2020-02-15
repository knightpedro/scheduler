import React from "react";
import CreateOutOfServiceForm from "./CreateOutOfServiceForm";
import Container from "../../common/containers";
import axios from "axios";
import { OUTOFSERVICE_URL, RESOURCES_URL } from "../../../api";
import Alert from "../../common/alert";
import { Loading, LoadingFailure } from "../../common/loading";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";
import queryString from "query-string";

const REASONS_URL = OUTOFSERVICE_URL + "/reasons";

class OutOfServiceFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        reasons: [],
        resources: [],
        initialResource: null,
    };

    async componentDidMount() {
        const resourceId = queryString.parse(this.props.location.search)
            .resourceId;
        const reasonsRequest = axios.get(REASONS_URL);
        const resourcesRequest = axios.get(RESOURCES_URL);

        try {
            const [reasonsResponse, resourcesResponse] = await Promise.all([
                reasonsRequest,
                resourcesRequest,
            ]);
            const resources = this.transformResourcesForSelect(
                resourcesResponse.data.resources
            );
            const reasons = this.transformReasonsForSelect(
                reasonsResponse.data
            );
            this.setState({
                loading: false,
                reasons,
                resources,
                initialResource: resources.find(
                    r => r.value.toString() === resourceId
                ),
            });
        } catch (error) {
            this.setState({
                loading: false,
                loadingError: error,
            });
        }
    }

    transformReasonsForSelect(reasons) {
        reasons.sort();
        return reasons.map(r => ({ label: r, value: r }));
    }

    transformResourcesForSelect(resources) {
        const sorted = resources.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        return sorted.map(r => ({ label: r.name, value: r.id }));
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const resourceId = values.resource.value;

        const postBody = {
            resourceId,
            description: values.description,
            reason: values.reason.value,
            start: values.start.format(),
            end: values.end.format(),
        };

        axios
            .post(OUTOFSERVICE_URL, postBody)
            .then(() => {
                const resourceDetailPath = generatePath(
                    Routes.resources.DETAIL,
                    { id: resourceId }
                );
                this.props.history.push(resourceDetailPath);
            })
            .catch(error => {
                this.setState({ formError: error });
                setSubmitting(false);
            });
    };

    renderComponent(component) {
        return (
            <Container>
                <h2>Out Of Service</h2>
                {component}
            </Container>
        );
    }

    render() {
        const {
            loading,
            loadingError,
            formError,
            reasons,
            resources,
            initialResource,
        } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return this.renderComponent(
            <>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <CreateOutOfServiceForm
                    resourceOptions={resources}
                    resource={initialResource}
                    reasons={reasons}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </>
        );
    }
}

export default OutOfServiceFormContainer;
