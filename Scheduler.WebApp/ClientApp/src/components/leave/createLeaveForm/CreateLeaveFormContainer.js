import React from 'react';
import CreateLeaveForm from './CreateLeaveForm';
import Container from '../../common/containers';
import axios from 'axios';
import { LEAVE_URL, WORKERS_URL } from '../../../api';
import Alert from 'react-bootstrap/Alert';
import queryString from 'query-string';
import { entitiesSelect } from '../../../utils';
import { Loading, LoadingFailure } from '../../common/loading';
import Routes from '../../../routes';
import { generatePath } from 'react-router-dom';


const LEAVE_TYPES_URL = LEAVE_URL + '/leave-types';

class CreateLeaveFormContainer extends React.Component {
    state = {
        loading: true, 
        loadingError: null,
        formError: null,
        leaveTypes: [],
        workers: [],
        initialWorker: null,
    }

    componentDidMount = async () => {
        const workerId = queryString.parse(this.props.location.search).workerId;

        try {
            let leaveTypesRes = await axios.get(LEAVE_TYPES_URL);
            let workersRes = await axios.get(WORKERS_URL);
            const workers = entitiesSelect(workersRes.data.workers); 
            this.setState({
                leaveTypes: this.transformLeaveTypesForSelect(leaveTypesRes.data), 
                workers,
                initialWorker: workers.find(w => w.value.toString() === workerId),
                loading: false
            });
        }
        catch (error) {
            this.setState({ loading: false, loadingError: error });
        }
    }

    transformLeaveTypesForSelect(leaveTypes) {
        leaveTypes.sort();
        return leaveTypes.map(l => ({ label: l, value: l}));
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        const postBody = {
            start: values.start.format(),
            end: values.end.format(),
            workerId: values.worker.value,
            leaveType: values.leaveType.value
        };

        this.setState({ 
            formError: null
        });

        const workerDetailPath = generatePath(Routes.workers.DETAIL, { id: postBody.workerId });
        axios.post(LEAVE_URL, postBody)
            .then(() => {
                this.props.history.push(workerDetailPath);
            })
            .catch(error => { 
                setSubmitting(false);
                this.setState({ formError: error });
            });
    };

    renderComponent(component) {
        return (
            <Container>
                <h2>Add Leave</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, leaveTypes, workers, initialWorker } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError) return this.renderComponent(<LoadingFailure message={loadingError.message} />);

        return this.renderComponent(
            <>
                { formError && <Alert variant='danger'>{formError.message}</Alert> }
                <CreateLeaveForm workerOptions={workers} leaveTypes={leaveTypes} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} worker={initialWorker} />
            </>
    
        );
    } 
}

export default CreateLeaveFormContainer;