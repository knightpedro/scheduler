import React, { useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import {
    BasicTable,
    SearchColumnFilter,
    SelectColumnFilter,
} from "../../common/tables";
import { ActiveStatus } from "../../common/status";

const status = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};

const WorkersList = ({ workers }) => {
    const createPath = id => generatePath(Routes.workers.DETAIL, { id });

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
                Cell: ({ row }) => (
                    <Link to={createPath(row.original.id)}>
                        {row.values.name}
                    </Link>
                ),
                Filter: SearchColumnFilter,
            },
            {
                Header: "Active",
                accessor: "status",
                className: "text-center",
                Cell: ({ cell: { value } }) => (
                    <ActiveStatus isActive={value === status.ACTIVE} />
                ),
                Filter: SelectColumnFilter,
                filter: "exactText",
            },
        ],
        []
    );

    const data = useMemo(
        () =>
            workers.map(worker => ({
                id: worker.id,
                name: worker.name,
                status: worker.isActive ? status.ACTIVE : status.INACTIVE,
            })),
        [workers]
    );

    const initialTableState = useMemo(
        () => ({
            sortBy: [
                {
                    id: "name",
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

export default WorkersList;
