import React from 'react';
import JobTaskDetail from './JobTaskDetail';
import { Loading, LoadingFailure } from '../../common/loading';
import { JOBS_URL, JOBTASKS_URL } from '../../../api';
import axios from 'axios';
import Breadcrumb from '../../common/breadcrumb';
import Container from '../../common/containers';
import moment from 'moment';
import { sortByName } from '../../../utils';
import Routes from '../../../routes';
import { generatePath } from 'react-router-dom';


const DATE_FORMAT = "HH:mm D/MM/YYYY";

class JobTaskDetailContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        jobTask: null
    }

    componentDidMount = async () => {
        const jobTaskId = this.props.match.params.id;
        try {
            let jobTaskRes = await axios.get(`${JOBTASKS_URL}/${jobTaskId}`);
            let jobRes = await axios.get(`${JOBS_URL}/${jobTaskRes.data.jobId}`);
            const jobTask = {
                ...jobTaskRes.data, 
                job: jobRes.data, 
                workers: jobTaskRes.data.workers.sort(sortByName),
                resources: jobTaskRes.data.resources.sort(sortByName),
                start: moment(jobTaskRes.data.start).format(DATE_FORMAT), 
                end: moment(jobTaskRes.data.end).format(DATE_FORMAT) 
            };
            this.setState({ loading: false, jobTask });
        }
        catch (error) {
            this.setState({ loading: false, error })
        }
    }

    handleDelete = () => {
        const { jobTask } = this.state;
        const jobPath = generatePath(Routes.jobs.DETAIL, { id: jobTask.job.id})
        axios.delete(`${JOBTASKS_URL}/${jobTask.id}`)
        .then(() => this.props.history.push(jobPath))
        .catch(error => this.setState({ error }));
    }

    renderBreadcrumb(jobTask) {
        const jobPath = generatePath(Routes.jobs.DETAIL, { id: jobTask.job.id });
        return (
            <Breadcrumb>
                <Breadcrumb.Item href={Routes.jobs.LIST}>Jobs</Breadcrumb.Item>
                <Breadcrumb.Item href={jobPath}>{jobTask.job.jobNumber}</Breadcrumb.Item>
                <Breadcrumb.Item active>{jobTask.description}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                {component}
            </Container>
        )
    }

    render() {
        const { loading, error, jobTask } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (error) return this.renderComponent(<LoadingFailure message={error.message} />);

        return this.renderComponent(
            <>
                {this.renderBreadcrumb(jobTask)}
                <JobTaskDetail jobTask={jobTask} handleDelete={this.handleDelete} />
            </>
        );
    }
}

export default JobTaskDetailContainer;