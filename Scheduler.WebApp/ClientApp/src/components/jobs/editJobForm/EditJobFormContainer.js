import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from '../../common/containers';
import Breadcrumb from '../../common/breadcrumb';
import axios from 'axios';
import { Loading, LoadingFailure } from '../../common/loading';
import EditJobForm from './EditJobForm';
import { JOBS_URL, COORDINATORS_URL } from '../../../api';
import { isEqual } from 'lodash';
import moment from 'moment';
import { generatePath } from 'react-router-dom';
import Routes from '../../../routes';

class EditJobFormContainer extends React.Component {

    state = {
        loading: true,
        loadingError: null,
        formError: null,
        job: null,
        coordinators: null
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        try {
            let coordinatorsRes = await axios.get(COORDINATORS_URL);
            let jobRes = await axios.get(`${JOBS_URL}/${id}`);
            this.setState({
                job: this.transformJobForForm(jobRes.data),
                coordinators: this.transformCoordinatorsForSelection(coordinatorsRes.data.coordinators), 
                loading: false
            })
        }
        catch (error) {
            this.setState({ 
                loadingError: error, 
                loading: false 
            });
        }
    }

    transformJobForForm(job) {
        const coordinator = job.coordinator ? { label: job.coordinator.name, value: job.coordinator.id } : null;
        const dateReceived = moment(job.dateReceived);
        return { ...job, coordinator, dateReceived };
    }

    transformCoordinatorsForSelection(coordinators) {
        const sorted = coordinators.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        return sorted.map(c => ({ label: c.name, value: c.id })); 
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = async (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const { job } = this.state;
        const { id } = this.props.match.params;

        const {coordinator, dateReceived, ...jobDetails } = values;

        const jobBody = {
            dateReceived: dateReceived.format(),
            ...jobDetails
        };

        const coordinatorBody = {
            coordinatorId: coordinator.value
        };


        if (isEqual(job, values)) {
            this.setState({ formError: { message: "No changes made" }});
            setSubmitting(false);
            return;
        }
        try {
            await axios.put(`${JOBS_URL}/${id}`, jobBody)
            await axios.put(`${JOBS_URL}/${id}/coordinator/`, coordinatorBody)
            const jobDetailPath = generatePath(Routes.jobs.DETAIL, { id });
            this.props.history.push(jobDetailPath);
        }
        catch (error) {
            this.setState({ formError: error });
            setSubmitting(false);
        }
    }

    renderBreadcrumb = () => (
        <Breadcrumb>
            <Breadcrumb.Item href={Routes.jobs.LIST}>Jobs</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
    );

    renderComponent(component) {
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Edit Job</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, job, coordinators } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError) return this.renderComponent(<LoadingFailure message={loadingError.message} />);

        return this.renderComponent(
            <>
            { formError && <Alert variant="danger">{formError.message}</Alert> }
            <EditJobForm job={job} coordinators={coordinators} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
            </>
        );
    }
}

export default EditJobFormContainer;