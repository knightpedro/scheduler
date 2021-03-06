import React from "react";
import { Segment, Statistic, Icon, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../../ducks/jobs";

const JobsCard = ({ start, end }) => {
  const jobs = useSelector((state) =>
    jobsSelectors.selectByDate(state, start, end)
  );

  const received = jobs ? jobs.length : 0;
  const completed = jobs ? jobs.filter((job) => job.isComplete).length : 0;

  return (
    <div>
      <Segment attached="top" secondary>
        <Header as="h5">Jobs</Header>
      </Segment>
      <Segment attached="bottom" padded textAlign="center">
        <Statistic.Group widths={2}>
          <Statistic color="blue">
            <Statistic.Value>
              <Icon name="mail outline" />
              {received}
            </Statistic.Value>
            <Statistic.Label>Received</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>
              <Icon name="check circle outline" />
              {completed}
            </Statistic.Value>
            <Statistic.Label>Completed</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </div>
  );
};

export default JobsCard;
