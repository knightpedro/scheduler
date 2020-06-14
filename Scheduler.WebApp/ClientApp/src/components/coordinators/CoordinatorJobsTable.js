import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { Empty } from "../common";
import { Icon } from "semantic-ui-react";
import { SelectFilter } from "../tables/filters";
import { momentSort } from "../tables/sorters";
import { jobStatus } from "../../constants";
import { BaseTable } from "../tables";
import { useHistory, generatePath } from "react-router-dom";
import routes from "../../routes";

const TIME_FORMAT = "DD/MM/YY";

const CoordinatorJobsTable = ({ id }) => {
  const history = useHistory();
  const jobs = useSelector((state) =>
    jobsSelectors.selectByCoordinator(state, id)
  );

  const data = useMemo(
    () =>
      jobs.map((j) => ({
        ...j,
        status: j.isComplete ? jobStatus.COMPLETE : jobStatus.IN_PROGRESS,
      })),
    [jobs]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Job #",
        accessor: "jobNumber",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <Icon
            name={value === jobStatus.COMPLETE ? "check" : "refresh"}
            color={value === jobStatus.COMPLETE ? "green" : "blue"}
          />
        ),
        Filter: SelectFilter,
        filter: "exactText",
        disableGlobalFilter: true,
      },
      {
        Header: "Received",
        accessor: "dateReceived",
        Cell: ({ value }) => (value ? value.format(TIME_FORMAT) : ""),
        disableGlobalFilter: true,
        sortType: momentSort,
      },
      {
        Header: "Scheduled",
        accessor: "dateScheduled",
        Cell: ({ value }) => (value ? value.format(TIME_FORMAT) : ""),
        disableGlobalFilter: true,
        sortType: momentSort,
      },
    ],
    []
  );

  const handleClick = ({ id }) => {
    const path = generatePath(routes.jobs.detail, { id });
    history.push(path);
  };

  const initialState = {
    pageSize: 10,
    sortBy: [{ id: "dateReceived", desc: true }],
  };

  const globalSearchOptions = {
    placeholder: "Search jobs",
  };

  if (jobs.length === 0) return <Empty message="No jobs found" />;

  return (
    <BaseTable
      data={data}
      columns={columns}
      initialState={initialState}
      handleClick={handleClick}
      globalSearchOptions={globalSearchOptions}
    />
  );
};

export default CoordinatorJobsTable;
