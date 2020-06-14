import React, { useMemo } from "react";
import { SelectFilter } from "../tables/filters";
import { momentSort } from "../tables/sorters";
import { BaseTable } from "../tables";

const TIME_FORMAT = "DD/MM/YY";

const OutOfServicesTable = ({ outOfServices, handleClick }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Reason",
        accessor: "reason",
        Filter: SelectFilter,
        filter: "exactText",
      },
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
    placeholder: "Search out of services",
  };

  return (
    <BaseTable
      data={outOfServices}
      columns={columns}
      initialState={initialState}
      handleClick={handleClick}
      globalSearchOptions={globalSearchOptions}
    />
  );
};

export default OutOfServicesTable;
