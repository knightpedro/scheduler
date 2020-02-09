import React from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import TrainingList from "./TrainingList";
import axios from "axios";
import { TRAINING_URL } from "../../../api";
import Container from "../../common/containers";
import { Create } from "../../common/actions";
import Routes from "../../../routes";

class TrainingListContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    training: null
  };

  componentDidMount() {
    axios
      .get(TRAINING_URL)
      .then(res =>
        this.setState({
          loading: false,
          training: res.data.training
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error
        })
      );
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
      return this.renderComponent(<LoadingFailure message={error.message} />);

    return this.renderComponent(
      <>
        <Create path={Routes.training.CREATE}>Training</Create>
        <TrainingList training={training} />
      </>
    );
  }
}

export default TrainingListContainer;
