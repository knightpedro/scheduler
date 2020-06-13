export default function (rowA, rowB, columnId) {
  const a = rowA.values[columnId];
  const b = rowB.values[columnId];
  if (a && b) return a.unix() - b.unix();
  return (a != null) - (b != null);
}
