import React from "react";
import CreateCoordinatorForm from "./CreateCoordinatorForm";
import Container from "../../common/containers";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { COORDINATORS_URL } from "../../../api";
import Routes from "../../../routes";
import Breadcrumb from "../../common/breadcrumb";

class CreateCoordinatorFormContainer extends React.Component {
  state = {
    error: null
  };

  handleCancel = () => this.props.history.goBack();

  handleSubmit = (values, { setSubmitting }) => {
    this.setState({ error: null });
    axios
      .post(COORDINATORS_URL, values)
      .then(() => this.props.history.push(Routes.coordinators.LIST))
      .catch(error => {
        this.setState({ error });
        setSubmitting(false);
      });
  };

  renderBreadcrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href={Routes.coordinators.LIST}>
          Coordinators
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  render() {
    const { error } = this.state;
    return (
      <Container>
        {this.renderBreadcrumb()}
        <h2>Add Coordinator</h2>
        {error && <Alert variant="danger">{error.message}</Alert>}
        <CreateCoordinatorForm
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </Container>
    );
  }
}

export default CreateCoordinatorFormContainer;
