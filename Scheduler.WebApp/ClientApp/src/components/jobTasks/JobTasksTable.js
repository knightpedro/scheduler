import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Table, TableCell, Icon, Pagination } from "semantic-ui-react";
import { GlobalSearchFilter } from "../tables/filters";
import { momentSort } from "../tables/sorters";

const TIME_FORMAT = "DD/MM/YY";

const JobTasksTable = ({ jobTasks }) => {
  const data = useMemo(() => jobTasks, [jobTasks]);

  const defaultColumn = useMemo(
    () => ({
      Filter: () => null,
    }),
    []
  );

  const columns = useMemo(
    () => [
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
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()}>
        <Table.Header>
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Table.HeaderCell
                  width={1}
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
              <Table.Row {...row.getRowProps()}>
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

export default JobTasksTable;
