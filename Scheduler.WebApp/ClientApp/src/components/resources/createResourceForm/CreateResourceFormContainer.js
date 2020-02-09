import React from 'react';
import CreateResourceForm from './CreateResourceForm';
import Alert from 'react-bootstrap/Alert';
import Container from '../../common/containers';
import Breadcrumb from '../../common/breadcrumb';
import axios from 'axios';
import { RESOURCES_URL } from '../../../api';
import Routes from '../../../routes';
import { generatePath } from 'react-router-dom';


class CreateResourceFormContainer extends React.Component {

    state = {
        error: null
    };

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ error: null });
        axios.post(RESOURCES_URL, values)
            .then(res => {
                const resourceDetailPath = generatePath(Routes.resources.DETAIL, { id: res.data.id });
                this.props.history.push(resourceDetailPath)
            })
            .catch(error => {
                this.setState({ error });
                setSubmitting(false);
            });
    };

    renderBreadcrumb() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item href={Routes.resources.LIST}>Plant</Breadcrumb.Item>
                <Breadcrumb.Item active>Create</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    render() {
        const { error } = this.state;
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Add Plant</h2>
                { error && <Alert variant="danger">{error.message}</Alert> }
                <CreateResourceForm handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
            </Container>
        )
    }
}

export default CreateResourceFormContainer;