import React from "react";
import CreateOutOfServiceForm from "./CreateOutOfServiceForm";
import Container from "../../common/containers";
import Alert from "../../common/alert";
import { Loading, LoadingFailure } from "../../common/loading";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";
import queryString from "query-string";
import { entitiesSelect } from "../../../utils";
import { oosService, resourcesService } from "../../../services";

class OutOfServiceFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        reasons: [],
        resources: [],
        initialResource: null,
    };

    componentDidMount() {
        const resourceId = queryString.parse(this.props.location.search)
            .resourceId;

        Promise.all([oosService.getReasons(), resourcesService.getAll()])
            .then(([reasons, resources]) => {
                const selectResources = entitiesSelect(resources);
                const selectReasons = this.transformReasonsForSelect(reasons);
                const initialResource = resourceId
                    ? selectResources.find(
                          r => r.value.toString() === resourceId
                      )
                    : null;
                this.setState({
                    reasons: selectReasons,
                    resources: selectResources,
                    initialResource,
                });
            })
            .catch(error =>
                this.setState({
                    loadingError: error,
                })
            )
            .finally(() => this.setState({ loading: false }));
    }

    transformReasonsForSelect(reasons) {
        reasons.sort();
        return reasons.map(r => ({ label: r, value: r }));
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

        oosService
            .create(postBody)
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
