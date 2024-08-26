function makeDiagonalRed(table) {
  Array.from(table.rows).forEach((row) => {
    Array.from(row.cells).forEach((cell) => {
      if (cell.cellIndex == row.rowIndex) {
        cell.style.backgroundColor = 'red';
      }
    });
  });
}
