import React from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import TrainingList from "./TrainingList";
import Container from "../../common/containers";
import { Create } from "../../common/actions";
import Routes from "../../../routes";
import { trainingService } from "../../../services";

class TrainingListContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        training: null,
    };

    componentDidMount() {
        trainingService
            .getAll()
            .then(training =>
                this.setState({
                    training,
                })
            )
            .catch(error =>
                this.setState({
                    error,
                })
            )
            .finally(() => this.setState({ loading: false }));
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Manage Training</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, error, training } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (error)
            return this.renderComponent(
                <LoadingFailure message={error.message} />
            );

        return this.renderComponent(
            <>
                <Create path={Routes.training.CREATE}>Training</Create>
                <TrainingList training={training} />
            </>
        );
    }
}

export default TrainingListContainer;
