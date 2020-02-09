import React from 'react';
import { Create } from '../../common/actions';
import {Loading, LoadingFailure } from '../../common/loading';
import WorkersList from './WorkersList';
import Container from '../../common/containers';
import axios from 'axios';
import { WORKERS_URL } from '../../../api';
import { sortByName } from '../../../utils';
import Routes from '../../../routes';


class WorkersListContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        workers: null
    }

    componentDidMount() {
        axios.get(WORKERS_URL)
        .then(res => this.setState({
            loading: false, 
            workers: res.data.workers.sort(sortByName)
        }))
        .catch(error => this.setState({
            loading: false,
            error
        }));
    }

    renderComponent = (component)  =>{
        return (
            <Container>
                <h2>Manage Staff</h2>
                {component}
            </Container>
        );
    };

    render() {
        const {loading, error, workers} = this.state;
        if (loading) return this.renderComponent(<Loading />)
        if (error) return this.renderComponent(<LoadingFailure message={error.message} />)

        return this.renderComponent(
            <>
                <Create path={Routes.workers.CREATE}>Staff</Create>
                <WorkersList workers={workers} />
            </>
        );
    }
}

export default WorkersListContainer;