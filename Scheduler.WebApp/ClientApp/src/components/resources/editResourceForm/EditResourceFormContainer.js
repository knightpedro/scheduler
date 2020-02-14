import React from "react";
import EditResourceForm from "./EditResourceForm";
import Alert from "react-bootstrap/Alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { Loading, LoadingFailure } from "../../common/loading";
import axios from "axios";
import { isEqual } from "lodash";
import { RESOURCES_URL } from "../../../api";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";

class EditResourceFormContainer extends React.Component {
    state = {
        loading: true,
        resource: null,
        loadingError: null,
        formError: null,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get(`${RESOURCES_URL}/${id}`)
            .then(res => this.setState({ resource: res.data, loading: false }))
            .catch(error =>
                this.setState({ loadingError: error, loading: false })
            );
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ formError: null });

        const { resource } = this.state;
        if (isEqual(values, resource)) {
            this.setState({ formError: { message: "No changes made." } });
            setSubmitting(false);
        } else {
            axios
                .put(`${RESOURCES_URL}/${resource.id}`, values)
                .then(() => {
                    const resourceDetailPath = generatePath(
                        Routes.resources.DETAIL,
                        { id: resource.id }
                    );
                    this.props.history.push(resourceDetailPath);
                })
                .catch(error => {
                    this.setState({ formError: error });
                    setSubmitting(false);
                });
        }
    };

    renderBreadcrumb(resource) {
        const resourcePath = generatePath(Routes.resources.DETAIL, {
            id: resource.id,
        });
        return (
            <Breadcrumb>
                <Breadcrumb.Item href={Routes.resources.LIST}>
                    Plant
                </Breadcrumb.Item>
                <Breadcrumb.Item href={resourcePath}>
                    {resource.name}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Edit Plant</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, resource } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return (
            <Container>
                {this.renderBreadcrumb(resource)}
                <h2>Edit Plant</h2>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <EditResourceForm
                    resource={resource}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default EditResourceFormContainer;
