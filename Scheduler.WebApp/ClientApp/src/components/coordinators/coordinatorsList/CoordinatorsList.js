import React, { useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import {
  BasicTable,
  SearchColumnFilter,
  SelectColumnFilter
} from "../../common/tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const status = {
  ACTIVE: "Active",
  INACTIVE: "Inactive"
};

const CoordinatorsList = ({ coordinators }) => {
  const createPath = id => generatePath(Routes.coordinators.DETAIL, { id });

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Link to={createPath(row.original.id)}>{row.values.name}</Link>
        ),
        Filter: SearchColumnFilter
      },
      {
        Header: "Active",
        accessor: "status",
        className: "text-center",
        Cell: ({ cell: { value } }) => (
          <FontAwesomeIcon
            icon={value === status.ACTIVE ? faCheck : faTimes}
            color={value === status.ACTIVE ? "green" : "red"}
          />
        ),
        Filter: SelectColumnFilter,
        filter: "exactText"
      }
    ],
    []
  );

  const data = useMemo(
    () =>
      coordinators.map(coordinator => ({
        id: coordinator.id,
        name: coordinator.name,
        status: coordinator.isActive ? status.ACTIVE : status.INACTIVE
      })),
    [coordinators]
  );

  const initialTableState = useMemo(
    () => ({
      sortBy: [
        {
          id: "name"
        }
      ]
    }),
    []
  );

  return (
    <BasicTable
      columns={columns}
      data={data}
      initialState={initialTableState}
    />
  );
};

export default CoordinatorsList;
