function makeDiagonalRed(table) {
  Array.from(table.rows).forEach((row, rowIndex) => {
    Array.from(row.cells).forEach((cell, cellIndex) => {
      if (cellIndex == rowIndex) {
        cell.style.backgroundColor = 'red';
      }
    });
  });
}
