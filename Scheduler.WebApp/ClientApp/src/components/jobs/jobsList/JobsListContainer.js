import React from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import { JOBS_URL } from "../../../api";
import Container from "../../common/containers";
import JobsList from "./JobsList";
import axios from "axios";
import { Create } from "../../common/actions";
import Routes from "../../../routes";

class JobsListContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    jobs: null
  };

  componentDidMount() {
    axios
      .get(JOBS_URL)
      .then(res =>
        this.setState({
          jobs: res.data.jobs,
          loading: false
        })
      )
      .catch(error =>
        this.setState({
          error,
          loading: false
        })
      );
  }

  renderComponent(component) {
    return (
      <Container>
        <h2>Manage Jobs</h2>
        {component}
      </Container>
    );
  }

  render() {
    const { loading, error, jobs } = this.state;
    if (loading) return this.renderComponent(<Loading />);
    if (error)
      return this.renderComponent(<LoadingFailure message={error.message} />);

    return this.renderComponent(
      <>
        <Create path={Routes.jobs.CREATE}>Job</Create>
        <JobsList jobs={jobs} />
      </>
    );
  }
}

export default JobsListContainer;
