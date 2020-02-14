import React, { useMemo } from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
    margin-top: 5px;
    width: 100%;
`;

const FilterSelect = styled.select`
    width: 100%;
    height: 25px;
    padding-left: 5px;
    border: none;
`;

const FilterInput = styled.input`
    width: 100%;
    height: 25px;
    padding-left: 5px;
    border: none;
`;

export const SearchColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
        <FilterWrapper>
            <FilterInput
                value={filterValue || ""}
                onChange={e => setFilter(e.target.value || undefined)}
                placeholder={"Search..."}
            />
        </FilterWrapper>
    );
};

export const SelectColumnFilter = ({
    column: { id, filterValue, preFilteredRows, setFilter },
}) => {
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
            options.add(row.values[id]);
        });
        return [...options.values()].sort();
    }, [id, preFilteredRows]);

    return (
        <FilterWrapper>
            <FilterSelect
                value={filterValue}
                onChange={e => setFilter(e.target.value || undefined)}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </FilterSelect>
        </FilterWrapper>
    );
};
