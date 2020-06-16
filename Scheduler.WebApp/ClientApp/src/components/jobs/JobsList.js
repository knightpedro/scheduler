import React from "react";
import { List } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { Empty } from "../common";

const JobsList = ({ activeId, handleClick, filter }) => {
  const jobs = useSelector((state) =>
    jobsSelectors.selectFiltered(state, filter)
  );
  if (!jobs || jobs.length === 0) return <Empty message="No jobs found" />;

  return (
    <List selection>
      {jobs.map((j) => (
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
  );
};

export default JobsList;
