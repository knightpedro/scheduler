import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Breadcrumb from '../../common/breadcrumb';
import Container from '../../common/containers';
import { isEqual } from 'lodash';
import axios from 'axios';
import { COORDINATORS_URL } from '../../../api';
import { Loading, LoadingFailure } from '../../common/loading';
import EditCoordinatorForm from './EditCoordinatorForm';
import Routes from '../../../routes';
import { generatePath } from 'react-router-dom';


class EditCoordinatorFormContainer extends React.Component {

    state = {
        loading: true,
        loadingError: null,
        formError: null,
        coordinator: null
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`${COORDINATORS_URL}/${id}`)
            .then(res => this.setState({ coordinator: res.data, loading: false}))
            .catch(error => this.setState({ loading: false, loadingError: error }))
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const { coordinator } = this.state;
        if (isEqual(coordinator, values)) {
            this.setState({ formError: { message: "No changes made."}})
            setSubmitting(false);
        }
        else {
            axios.put(`${COORDINATORS_URL}/${coordinator.id}`, values)
            .then(() => {
                const detailPath = generatePath(Routes.coordinators.DETAIL, { id: coordinator.id });
                this.props.history.push(detailPath);
            })
            .catch(error => {
                this.setState({ formError: error });
                setSubmitting(false);;
            });
        }
    }

    renderBreadcrumb = () => (
        <Breadcrumb>
            <Breadcrumb.Item href={Routes.coordinators.LIST}>Coordinators</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
    );

    renderComponent(component) {
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Edit Coordinator</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, coordinator } = this.state;
        if (loading) return this.renderComponent(<Loading />)
        if (loadingError) return this.renderComponent(<LoadingFailure message={loadingError.message} />)

        return this.renderComponent(
            <>
                { formError && <Alert variant="danger">{formError.message}</Alert> }
                <EditCoordinatorForm coordinator={coordinator} handleCancel={this.handleCancel} handleSubmit={this.handleSubmit} />
            </>
        );
    }

}

export default EditCoordinatorFormContainer;