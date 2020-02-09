import React, { useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import moment from "moment";
import { BasicTable, SelectColumnFilter } from "../../common/tables";

const TIME_FORMAT = "HH:mm DD/MM/YYYY";

const OutOfServicesList = ({ outOfServices }) => {
  const createPath = id => generatePath(Routes.outOfServices.EDIT, { id });

  const columns = useMemo(
    () => [
      {
        Header: "Reason",
        accessor: "reason",
        Cell: ({ row }) => (
          <Link to={createPath(row.original.id)}>{row.values.reason}</Link>
        ),
        Filter: SelectColumnFilter
      },
      {
        Header: "Start",
        accessor: "start",
        className: "text-center",
        sortType: "momentSort",
        disableFilters: true,
        Cell: ({ cell: { value } }) => value.format(TIME_FORMAT)
      },
      {
        Header: "End",
        accessor: "end",
        className: "text-center",
        sortType: "momentSort",
        disableFilters: true,
        Cell: ({ cell: { value } }) => value.format(TIME_FORMAT)
      }
    ],
    []
  );

  const data = useMemo(
    () =>
      outOfServices.map(outOfService => ({
        id: outOfService.id,
        reason: outOfService.description,
        start: moment(outOfService.start),
        end: moment(outOfService.end)
      })),
    [outOfServices]
  );

  const initialTableState = useMemo(
    () => ({
      sortBy: [
        {
          id: "start",
          desc: true
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

export default OutOfServicesList;
