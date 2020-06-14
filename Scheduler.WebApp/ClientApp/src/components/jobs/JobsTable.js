import React, { useMemo } from "react";
import { Icon, Header } from "semantic-ui-react";
import { SelectFilter } from "../tables/filters";
import { momentSort } from "../tables/sorters";
import { jobStatus } from "../../constants";
import { BaseTable } from "../tables";

const TIME_FORMAT = "DD/MM/YY";

const JobsTable = ({ jobs, handleClick }) => {
  const data = useMemo(
    () =>
      jobs.map((j) => ({
        ...j,
        coordinator: j.coordinator ? j.coordinator.name : "",
        status: j.isComplete ? jobStatus.COMPLETE : jobStatus.IN_PROGRESS,
      })),
    [jobs]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Job #",
        accessor: "jobNumber",
        Cell: ({ value }) => <Header as="h5">{value}</Header>,
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
        Header: "Coordinator",
        accessor: "coordinator",
        Filter: SelectFilter,
        filter: "exactText",
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

  const initialState = {
    pageSize: 20,
    sortBy: [{ id: "dateReceived", desc: true }],
  };

  const globalSearchOptions = {
    placeholder: "Search jobs",
  };

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

export default JobsTable;
