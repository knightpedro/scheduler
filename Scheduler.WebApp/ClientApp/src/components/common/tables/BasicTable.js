import React from "react";
import StyledTable from "./StyledTable";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import { sortTypes } from "./sortTypes";
import { Pagination, PAGE_SIZES } from "./Pagination";

const BasicTable = ({ columns, data, initialState, ...props }) => {
  const instance = useTable(
    {
      columns,
      data,
      sortTypes,
      initialState: {
        ...initialState,
        pageSize: PAGE_SIZES[0]
      },
      ...props
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    state: { pageSize }
  } = instance;

  return (
    <div className="mt-4">
      <div className="table-responsive shadow mb-4">
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    <span {...column.getSortByToggleProps()}>
                      <span>{column.render("Header")}</span>
                      {column.canSort ? (
                        column.isSorted ? (
                          <FontAwesomeIcon
                            icon={column.isSortedDesc ? faSortDown : faSortUp}
                          />
                        ) : (
                          <FontAwesomeIcon icon={faSort} />
                        )
                      ) : null}
                    </span>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps({
                        className: cell.column.className
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </div>
      {(pageCount > 1 || pageSize > PAGE_SIZES[0]) && (
        <Pagination {...instance} />
      )}
    </div>
  );
};

export default BasicTable;
