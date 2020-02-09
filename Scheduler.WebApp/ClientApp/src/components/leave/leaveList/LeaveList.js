import React, { useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import moment from "moment";
import { BasicTable, SelectColumnFilter } from "../../common/tables";

const TIME_FORMAT = "HH:mm DD/MM/YYYY";

const LeaveList = ({ leave }) => {
  const createPath = id => generatePath(Routes.leave.EDIT, { id });

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ row }) => (
          <Link to={createPath(row.original.id)}>{row.values.type}</Link>
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
      leave.map(l => {
        return {
          id: l.id,
          type: l.description,
          start: moment(l.start),
          end: moment(l.end)
        };
      }),
    [leave]
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

export default LeaveList;
