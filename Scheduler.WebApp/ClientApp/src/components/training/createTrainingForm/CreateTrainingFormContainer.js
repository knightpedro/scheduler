import React from "react";
import CreateTrainingForm from "./CreateTrainingForm";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { Loading, LoadingFailure } from "../../common/loading";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { workersService, trainingService } from "../../../services";
import { entitiesSelect } from "../../../utils";

class CreateTrainingFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        workers: null,
        formError: null,
    };

    componentDidMount() {
        workersService
            .getAll()
            .then(workers => {
                this.setState({
                    workers: entitiesSelect(workers),
                });
            })
            .catch(error => this.setState({ loadingError: error }))
            .finally(() => this.setState({ loading: false }));
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = async (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const { selectedWorkers, ...training } = values;
        training.start = training.start.format();
        training.end = training.end.format();

        const workersPatch = {
            add: selectedWorkers.map(w => w.value),
        };

        try {
            const trainingId = await trainingService.create(training);
            await trainingService.patchWorkers(trainingId, workersPatch);
            const trainingDetailPath = generatePath(Routes.training.DETAIL, {
                id: trainingId,
            });
            this.props.history.push(trainingDetailPath);
        } catch (error) {
            this.setState({ formError: error });
            setSubmitting(false);
        }
    };

    renderBreadcrumb() {
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.training.LIST}>
                    Training
                </Link>
                <Breadcrumb.Item active>Create</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Add Training</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, workers } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return this.renderComponent(
            <>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <CreateTrainingForm
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    workers={workers}
                />
            </>
        );
    }
}

export default CreateTrainingFormContainer;
