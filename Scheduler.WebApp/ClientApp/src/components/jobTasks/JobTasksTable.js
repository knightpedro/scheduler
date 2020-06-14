import React, { useMemo } from "react";
import { momentSort } from "../tables/sorters";
import { BaseTable } from "../tables";

const TIME_FORMAT = "DD/MM/YY";

const JobTasksTable = ({ jobTasks, handleClick }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Start",
        accessor: "start",
        Cell: ({ value }) => value.format(TIME_FORMAT),
        disableGlobalFilter: true,
        sortType: momentSort,
      },
      {
        Header: "End",
        accessor: "end",
        Cell: ({ value }) => value.format(TIME_FORMAT),
        disableGlobalFilter: true,
        sortType: momentSort,
      },
    ],
    []
  );

  const initialState = {
    pageSize: 10,
    sortBy: [{ id: "start", desc: true }],
  };

  const globalSearchOptions = {
    placeholder: "Search tasks",
  };

  return (
    <BaseTable
      data={jobTasks}
      columns={columns}
      handleClick={handleClick}
      initialState={initialState}
      globalSearchOptions={globalSearchOptions}
    />
  );
};

export default JobTasksTable;
