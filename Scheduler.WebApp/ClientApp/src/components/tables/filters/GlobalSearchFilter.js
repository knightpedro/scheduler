import React from "react";
import { Input } from "semantic-ui-react";

const GlobalSearchFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  ...props
}) => {
  return (
    <Input
      icon="search"
      placeholder={`Search ${preGlobalFilteredRows.length} records`}
      value={globalFilter || ""}
      onChange={(_, { value }) => setGlobalFilter(value || "")}
      {...props}
    />
  );
};

export default GlobalSearchFilter;
