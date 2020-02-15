import React from "react";
import CreateTrainingForm from "./CreateTrainingForm";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import axios from "axios";
import { TRAINING_URL, WORKERS_URL } from "../../../api";
import { Loading, LoadingFailure } from "../../common/loading";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";

class CreateTrainingFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        workers: null,
        formError: null,
    };

    componentDidMount() {
        axios
            .get(WORKERS_URL)
            .then(res => {
                const sorted = res.data.workers.sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                );
                const workers = sorted.map(w => ({
                    label: w.name,
                    value: w.id,
                }));
                this.setState({ workers, loading: false });
            })
            .catch(error =>
                this.setState({ loadingError: error, loading: false })
            );
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
            let trainingRes = await axios.post(TRAINING_URL, training);
            const trainingId = trainingRes.data.id;
            await axios.patch(
                `${TRAINING_URL}/${trainingId}/workers`,
                workersPatch
            );
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
