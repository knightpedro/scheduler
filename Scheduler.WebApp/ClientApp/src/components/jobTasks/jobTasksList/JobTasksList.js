import React, { useMemo } from "react";
import moment from "moment";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { BasicTable, SearchColumnFilter } from "../../common/tables";

const TIME_FORMAT = "HH:mm DD/MM/YYYY";

const JobTasksList = ({ jobTasks }) => {
    const createPath = id => generatePath(Routes.jobTasks.DETAIL, { id });

    const columns = useMemo(
        () => [
            {
                Header: "Description",
                accessor: "description",
                Cell: ({ row }) => (
                    <Link to={createPath(row.original.id)}>
                        {row.values.description}
                    </Link>
                ),
                Filter: SearchColumnFilter,
            },
            {
                Header: "Start",
                accessor: "start",
                className: "text-center",
                Cell: ({ cell: { value } }) => value.format(TIME_FORMAT),
                disableFilters: true,
                sortType: "momentSort",
            },
            {
                Header: "End",
                accessor: "end",
                className: "text-center",
                Cell: ({ cell: { value } }) => value.format(TIME_FORMAT),
                disableFilters: true,
                sortType: "momentSort",
            },
        ],
        []
    );

    const data = useMemo(
        () =>
            jobTasks.map(task => ({
                id: task.id,
                description: task.description,
                start: moment(task.start),
                end: moment(task.end),
            })),
        [jobTasks]
    );

    const initialTableState = useMemo(
        () => ({
            sortBy: [
                {
                    id: "start",
                    desc: true,
                },
            ],
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

export default JobTasksList;
