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

const ResourcesList = ({ resources }) => {
    const createPath = id => generatePath(Routes.resources.DETAIL, { id });

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
                Header: "Description",
                accessor: "description",
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
            resources.map(resource => ({
                id: resource.id,
                name: resource.name,
                description: resource.description,
                status: resource.isActive ? status.ACTIVE : status.INACTIVE,
            })),
        [resources]
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

export default ResourcesList;
