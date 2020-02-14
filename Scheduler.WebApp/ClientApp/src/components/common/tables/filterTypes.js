import moment from "moment";

const momentFilter = (rows, ids, filterValue) => {
    const [start, end] = filterValue || [];
    rows = rows.filter(row => {
        return ids.some(id => {
            const rowValue = row.values[id];
            return (
                rowValue.isSameOrAfter(start) && rowValue.isSameOrBefore(end)
            );
        });
    });
    return rows;
};

momentFilter.autoRemove = val => !(val instanceof moment);

export const filterTypes = {
    momentFilter: momentFilter,
};
