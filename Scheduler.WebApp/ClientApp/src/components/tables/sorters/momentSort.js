export default function (rowA, rowB, columnId) {
  const a = rowA.values[columnId];
  const b = rowB.values[columnId];
  return a.unix() - b.unix();
}
