import React from "react";
import { List } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { useParams } from "react-router-dom";
import { Empty } from "../common";

const JobsList = ({ handleClick, filter }) => {
  const jobs = useSelector((state) =>
    jobsSelectors.selectFiltered(state, filter)
  );
  const { id } = useParams();
  const activeId = parseInt(id);
  if (!jobs || jobs.length === 0) return <Empty message="No jobs found" />;
  return (
    <List selection>
      {jobs.map((j) => (
        <List.Item
          key={j.id}
          onClick={() => handleClick(j.id)}
          active={j.id === activeId}
        >
          <List.Content>
            <List.Header>{j.jobNumber}</List.Header>
            <List.Description>{j.description}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default JobsList;
