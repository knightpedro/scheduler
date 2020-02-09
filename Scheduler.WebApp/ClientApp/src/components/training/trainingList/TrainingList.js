import React, { useMemo } from "react";
import moment from "moment";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { BasicTable, SearchColumnFilter } from "../../common/tables";

const TIME_FORMAT = "HH:mm DD/MM/YYYY";

const TrainingList = ({ training }) => {
  const createPath = id => generatePath(Routes.training.DETAIL, { id });

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ row }) => (
          <Link to={createPath(row.original.id)}>{row.values.description}</Link>
        ),
        Filter: SearchColumnFilter
      },
      {
        Header: "Start",
        accessor: "start",
        className: "text-center",
        Cell: ({ cell: { value } }) => value.format(TIME_FORMAT),
        disableFilters: true,
        sortType: "momentSort"
      },
      {
        Header: "End",
        accessor: "end",
        className: "text-center",
        Cell: ({ cell: { value } }) => value.format(TIME_FORMAT),
        disableFilters: true,
        sortType: "momentSort"
      }
    ],
    []
  );

  const data = useMemo(
    () =>
      training.map(t => ({
        id: t.id,
        description: t.description,
        start: moment(t.start),
        end: moment(t.end)
      })),
    [training]
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

export default TrainingList;
