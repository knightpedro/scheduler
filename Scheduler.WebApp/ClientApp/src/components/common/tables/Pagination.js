import React from "react";
import styled from "styled-components";

export const PAGE_SIZES = [10, 20, 30, 40, 50];
const PAGE_BUTTON_LIMIT = 7;

const PaginationWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  height: 100%;
  padding: 3px 10px;

  &:hover {
    background: #e3e3e3;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #f5f5f5;
  }

  &.selected {
    color: ${props => props.theme.colours.navItem};
    background: ${props => props.theme.colours.nav};
  }

  :not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
`;

const PageButtonGroup = styled.div`
  display: flex;
  border: 1px solid #e0e0e0;
  width: fit-content;
`;

const PageSelectGroup = styled.div`
  position: absolute;
  right: 0;
`;

const PageSelect = styled.select`
  margin-left: 10px;
`;

export const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize }
}) => {
  const createPageButton = (key, page) => (
    <PageButton
      key={key}
      className={page === pageIndex ? "selected" : null}
      onClick={() => gotoPage(page)}
    >
      {page + 1}
    </PageButton>
  );

  const createDisabledPageButton = key => (
    <PageButton key={key} disabled>
      ...
    </PageButton>
  );

  const renderPageButtons = () => {
    const pageButtonCount = Math.min(pageCount, PAGE_BUTTON_LIMIT);
    const pageButtonIndices = Array(pageButtonCount).fill();

    if (pageCount <= PAGE_BUTTON_LIMIT)
      return pageButtonIndices.map((_, i) => createPageButton(i, i));

    if (pageIndex < PAGE_BUTTON_LIMIT - 2) {
      return pageButtonIndices.map((_, i) => {
        switch (i) {
          case PAGE_BUTTON_LIMIT - 2:
            return createDisabledPageButton(i);
          case PAGE_BUTTON_LIMIT - 1:
            return createPageButton(i, pageCount - 1);
          default:
            return createPageButton(i, i);
        }
      });
    }

    if (pageIndex > pageCount - PAGE_BUTTON_LIMIT + 1) {
      return pageButtonIndices.map((_, i) => {
        switch (i) {
          case 0:
            return createPageButton(i, i);
          case 1:
            return createDisabledPageButton(i);
          default:
            return createPageButton(i, pageCount - PAGE_BUTTON_LIMIT + i);
        }
      });
    }

    return pageButtonIndices.map((_, i) => {
      switch (i) {
        case 0:
          return createPageButton(i, i);
        case 1:
          return createDisabledPageButton(i);
        case PAGE_BUTTON_LIMIT - 2:
          return createDisabledPageButton(i);
        case PAGE_BUTTON_LIMIT - 1:
          return createPageButton(i, pageCount - 1);
        default:
          return createPageButton(i, pageIndex + i - 3);
      }
    });
  };

  return (
    <PaginationWrapper>
      <PageButtonGroup>
        <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
          Prev
        </PageButton>{" "}
        {renderPageButtons()}
        <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </PageButton>
      </PageButtonGroup>
      <PageSelectGroup>
        Show
        <PageSelect
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {PAGE_SIZES.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </PageSelect>
      </PageSelectGroup>
    </PaginationWrapper>
  );
};
