import React, { useMemo } from "react";
import { SelectFilter } from "../tables/filters";
import { momentSort } from "../tables/sorters";
import { BaseTable } from "../tables";

const TIME_FORMAT = "DD/MM/YY";

const LeaveTable = ({ leave, handleClick }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "leaveType",
        Filter: SelectFilter,
        filter: "exactText",
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
    placeholder: "Search leave",
  };

  return (
    <BaseTable
      data={leave}
      columns={columns}
      initialState={initialState}
      handleClick={handleClick}
      globalSearchOptions={globalSearchOptions}
    />
  );
};

export default LeaveTable;
