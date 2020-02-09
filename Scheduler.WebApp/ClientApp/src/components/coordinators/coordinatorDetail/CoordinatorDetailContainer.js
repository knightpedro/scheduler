import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { COORDINATORS_URL, JOBS_URL } from '../../../api';
import queryString from 'query-string';
import Routes from '../../../routes';
import Breadcrumb from '../../common/breadcrumb';
import Container from '../../common/containers';
import { Loading, LoadingFailure } from '../../common/loading';
import CoordinatorDetail from './CoordinatorDetail';

const CoordinatorDetailContainer = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [coordinator, setCoordinator] = useState();
    const coordinatorId = props.match.params.id;
    const jobsQueryUrl = queryString.stringifyUrl({
        url: JOBS_URL,
        query: {
            coordinatorId
        }
    });
    
    const deleteCoordinator = () => {
        axios.delete(`${COORDINATORS_URL}/${coordinatorId}`)
        .then(() => props.history.push(Routes.coordinators.LIST))
        .catch(error => setError(error));
    }

    useEffect(() => {
        const fetchCoordinator = async () => {
            try {
                let coordinatorRes = await axios.get(`${COORDINATORS_URL}/${coordinatorId}`);
                let jobsRes = await axios.get(jobsQueryUrl);
                setCoordinator({
                    ...coordinatorRes.data, 
                    jobs: jobsRes.data.jobs 
                });
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchCoordinator();
    }, [coordinatorId, jobsQueryUrl]);

    const renderBreadcrumb = () => (
        <Breadcrumb>
            <Breadcrumb.Item href={Routes.coordinators.LIST}>Coordinators</Breadcrumb.Item>
            <Breadcrumb.Item active>{coordinator.name}</Breadcrumb.Item>
        </Breadcrumb>
    );

    const renderComponent = component => (
        <Container>
            {coordinator && renderBreadcrumb()}
            {component}
        </Container>
    );

    if (loading) return renderComponent(<Loading />);
    if (error) return renderComponent(<LoadingFailure message={error.message} />)
    return renderComponent(
        <CoordinatorDetail coordinator={coordinator} handleDelete={deleteCoordinator} />
    );
}

export default CoordinatorDetailContainer;