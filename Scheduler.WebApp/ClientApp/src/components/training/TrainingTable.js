import React, { useMemo } from "react";
import { momentSort } from "../tables/sorters";
import { BaseTable } from "../tables";

const TIME_FORMAT = "DD/MM/YY";

const TrainingTable = ({ training, handleClick }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Location",
        accessor: "location",
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
    placeholder: "Search training",
  };

  return (
    <BaseTable
      data={training}
      columns={columns}
      initialState={initialState}
      handleClick={handleClick}
      globalSearchOptions={globalSearchOptions}
    />
  );
};

export default TrainingTable;
