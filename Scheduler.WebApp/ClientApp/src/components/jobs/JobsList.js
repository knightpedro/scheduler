import React from "react";
import { List, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { Empty } from "../common";

const MAXIMUM_DISPLAYED = 10;

const JobsList = ({ activeId, handleClick, filter }) => {
  const jobs = useSelector((state) =>
    jobsSelectors.selectFiltered(state, filter)
  );
  const jobsCount = useSelector(jobsSelectors.selectTotal);

  if (!jobs || jobs.length === 0) return <Empty message="No jobs found" />;

  return (
    <Segment>
      <div style={{ color: "rgba(0,0,0,0.5)" }}>
        <small>
          Showing {Math.min(jobs.length, MAXIMUM_DISPLAYED)} of {jobsCount} jobs
        </small>
      </div>
      <List selection>
        {jobs.slice(0, MAXIMUM_DISPLAYED).map((j) => (
          <List.Item
            key={j.id}
            onClick={() => handleClick(j.id)}
            active={j.id === activeId}
          >
            <List.Icon
              verticalAlign="middle"
              name={j.isComplete ? "check" : "refresh"}
              color={j.isComplete ? "green" : "blue"}
            />
            <List.Content>
              <List.Header>{j.jobNumber}</List.Header>
              <List.Description>{j.description}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default JobsList;
