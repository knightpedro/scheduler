import React from "react";
import axios from "axios";
import { TRAINING_URL } from "../../../api";
import { Loading, LoadingFailure } from "../../common/loading";
import TrainingDetail from "./TrainingDetail";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import moment from "moment";
import { sortByName } from "../../../utils";
import Routes from "../../../routes";
import { Link } from "react-router-dom";

const DATE_FORMAT = "HH:mm D/MM/YYYY";

class TrainingDetailContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        training: null,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get(`${TRAINING_URL}/${id}`)
            .then(res =>
                this.setState({
                    loading: false,
                    training: {
                        ...res.data,
                        workers: res.data.workers.sort(sortByName),
                        start: moment(res.data.start).format(DATE_FORMAT),
                        end: moment(res.data.end).format(DATE_FORMAT),
                    },
                })
            )
            .catch(error =>
                this.setState({
                    loading: false,
                    error,
                })
            );
    }

    handleDelete = () => {
        const id = this.state.training.id;
        axios
            .delete(`${TRAINING_URL}/${id}`)
            .then(() => this.props.history.push(Routes.training.LIST))
            .catch(error => this.setState({ error }));
    };

    renderBreadcrumb(training) {
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.training.LIST}>
                    Training
                </Link>
                <Breadcrumb.Item active>{training.description}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return <Container>{component}</Container>;
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
                {this.renderBreadcrumb(training)}
                <TrainingDetail
                    training={training}
                    handleDelete={this.handleDelete}
                />
            </>
        );
    }
}

export default TrainingDetailContainer;
