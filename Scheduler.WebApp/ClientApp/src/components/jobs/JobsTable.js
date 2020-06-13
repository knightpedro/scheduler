import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Table, TableCell, Icon, Pagination, Header } from "semantic-ui-react";
import { GlobalSearchFilter, SelectFilter } from "../tables/filters";
import { momentSort } from "../tables/sorters";
import { jobStatus } from "../../constants";
import routes from "../../routes";
import { useHistory, generatePath } from "react-router-dom";

const TIME_FORMAT = "DD/MM/YY";

const JobsTable = ({ jobs }) => {
  const history = useHistory();
  const data = useMemo(
    () =>
      jobs.map((j) => ({
        ...j,
        coordinator: j.coordinator ? j.coordinator.name : "",
        status: j.isComplete ? jobStatus.COMPLETE : jobStatus.IN_PROGRESS,
      })),
    [jobs]
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: () => null,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Job #",
        accessor: "jobNumber",
        Cell: ({ value }) => <Header as="h5">{value}</Header>,
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <Icon
            name={value === jobStatus.COMPLETE ? "check" : "refresh"}
            color={value === jobStatus.COMPLETE ? "green" : "blue"}
          />
        ),
        Filter: SelectFilter,
        filter: "exactText",
        disableGlobalFilter: true,
      },
      {
        Header: "Coordinator",
        accessor: "coordinator",
        Filter: SelectFilter,
        filter: "exactText",
      },
      {
        Header: "Received",
        accessor: "dateReceived",
        Cell: ({ value }) => (value ? value.format(TIME_FORMAT) : ""),
        disableGlobalFilter: true,
        sortType: momentSort,
      },
      {
        Header: "Scheduled",
        accessor: "dateScheduled",
        Cell: ({ value }) => (value ? value.format(TIME_FORMAT) : ""),
        disableGlobalFilter: true,
        sortType: momentSort,
      },
    ],
    []
  );

  const handleRowClick = (row) => {
    const path = generatePath(routes.jobs.detail, {
      id: row.original.id,
    });
    history.push(path);
  };

  const initialState = {
    pageSize: 20,
    sortBy: [{ id: "dateReceived", desc: true }],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    state: { globalFilter, pageIndex },
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    { columns, data, defaultColumn, initialState },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <GlobalSearchFilter
        fluid
        placeholder="Search jobs"
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()} selectable>
        <Table.Header>
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Table.HeaderCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  title={null}
                >
                  <div className="tableHeaderCellWrapper">
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.isSorted ? (
                        <Icon
                          color="teal"
                          name={column.isSortedDesc ? "caret down" : "caret up"}
                        />
                      ) : null}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </div>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Table.Row
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
              >
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {pageCount > 1 && (
        <Pagination
          activePage={pageIndex + 1}
          totalPages={pageCount}
          firstItem={null}
          lastItem={null}
          onPageChange={(_, { activePage }) => gotoPage(activePage - 1)}
        />
      )}
    </>
  );
};

export default JobsTable;
