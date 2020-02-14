const momentSort = (rowA, rowB, columnId) => {
    const a = rowA.values[columnId];
    const b = rowB.values[columnId];
    if (a.isSame(b)) return 0;
    if (a.isBefore(b)) return -1;
    if (a.isAfter(b)) return 1;
};

export const sortTypes = {
    momentSort: momentSort,
};
