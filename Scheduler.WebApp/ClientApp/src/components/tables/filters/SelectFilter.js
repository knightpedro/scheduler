import React, { useMemo } from "react";
import { Dropdown } from "semantic-ui-react";

const SelectFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      if (row.values[id]) {
        options.add(row.values[id]);
      }
    });
    return [...options.values()].sort((a, b) => a.localeCompare(b));
  }, [id, preFilteredRows]);

  return (
    <Dropdown
      button
      compact
      basic
      icon="filter"
      className="icon"
      clearable
      labeled={filterValue != null}
      text={filterValue}
      value={filterValue || null}
      onChange={(_, { value }) => setFilter(value)}
    >
      <Dropdown.Menu>
        <Dropdown.Header>Filter</Dropdown.Header>
        <Dropdown.Divider />
        {options.map((option) => (
          <Dropdown.Item
            key={option}
            text={option}
            value={option}
            onClick={(_, { value }) => setFilter(value)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectFilter;
