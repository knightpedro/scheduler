import React from "react";
import CreateTrainingForm from "../createTrainingForm/CreateTrainingForm";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import axios from "axios";
import { TRAINING_URL, WORKERS_URL } from "../../../api";
import { Loading, LoadingFailure } from "../../common/loading";
import { createPatch, entitiesSelect } from "../../../utils";
import { isEmpty } from "lodash";
import moment from "moment";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";

class EditTrainingFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        training: null,
        workers: null,
    };

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        try {
            let trainingRes = await axios.get(`${TRAINING_URL}/${id}`);
            let workersRes = await axios.get(WORKERS_URL);
            this.setState({
                loading: false,
                training: this.transformTraining(trainingRes.data),
                workers: entitiesSelect(workersRes.data.workers),
            });
        } catch (error) {
            this.setState({
                loading: false,
                loadingError: error,
            });
        }
    };

    transformTraining(training) {
        return {
            ...training,
            start: moment(training.start),
            end: moment(training.end),
            selectedWorkers: entitiesSelect(training.workers),
        };
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = async (values, { setSubmitting }) => {
        this.setState({ formError: null });

        const { training } = this.state;

        const putBody = {
            id: training.id,
            description: values.description,
            location: values.location,
            start: values.start.format(),
            end: values.end.format(),
        };

        try {
            await axios.put(`${TRAINING_URL}/${training.id}`, putBody);
            const initialWorkers = training.selectedWorkers.map(w => w.value);
            const finalWorkers = values.selectedWorkers.map(w => w.value);
            const workersPatch = createPatch(initialWorkers, finalWorkers);
            if (!isEmpty(workersPatch)) {
                await axios.patch(
                    `${TRAINING_URL}/${training.id}/workers`,
                    workersPatch
                );
            }

            this.props.history.push(
                generatePath(Routes.training.DETAIL, { id: training.id })
            );
        } catch (error) {
            this.setState({ formError: error });
            setSubmitting(false);
        }
    };

    renderBreadcrumb(training) {
        const trainingPath = generatePath(Routes.training.DETAIL, {
            id: training.id,
        });
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.training.LIST}>
                    Training
                </Link>
                <Link className="breadcrumb-item" to={trainingPath}>
                    {training.description}
                </Link>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Edit Training</h2>
                {component}
            </Container>
        );
    }

    render() {
        const {
            loading,
            loadingError,
            formError,
            training,
            workers,
        } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return (
            <Container>
                {this.renderBreadcrumb(training)}
                <h2>Edit Training</h2>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <CreateTrainingForm
                    training={training}
                    workers={workers}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default EditTrainingFormContainer;
