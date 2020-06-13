import React from "react";
import { Icon, List } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { useParams } from "react-router-dom";

const JobsList = ({ handleClick }) => {
  const jobs = useSelector(jobsSelectors.selectAll);
  const { id } = useParams();
  const activeId = parseInt(id);
  if (!jobs || jobs.length === 0) return "No jobs found";
  return (
    <List selection>
      {jobs.map((j) => (
        <List.Item
          key={j.id}
          onClick={() => handleClick(j.id)}
          active={j.id === activeId}
        >
          <List.Content>
            <List.Header>{`${j.jobNumber} - ${j.description}`}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default JobsList;
