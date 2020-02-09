import React from 'react';
import ResourcesList from './ResourcesList';
import { Create } from '../../common/actions';
import Container from '../../common/containers';
import { RESOURCES_URL } from '../../../api';
import axios from 'axios';
import { Loading, LoadingFailure } from '../../common/loading';
import { sortByName } from '../../../utils';
import Routes from '../../../routes';

class ResourcesListContainer extends React.Component {

    state = {
        loading: true,
        error: null,
        resources: null
    };

    componentDidMount() {
        axios.get(RESOURCES_URL)
            .then(res => this.setState({ 
                resources: res.data.resources.sort(sortByName), 
                loading: false 
            }))
            .catch(error => this.setState({ error, loading: false }))
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Manage Plant</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, error, resources } = this.state;

        if (loading) return this.renderComponent(<Loading />)
        if (error) return this.renderComponent(<LoadingFailure message={error.message} />)

        return this.renderComponent(
            <>
                <Create path={Routes.resources.CREATE}>Plant</Create>
                <ResourcesList resources={resources} />
            </>
        );
    }
}

export default ResourcesListContainer;