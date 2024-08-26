function highlight(table) {
  Array.from(table.rows).forEach((row) => {
    Array.from(row.cells).forEach((cell) => {
      switch (cell.cellIndex) {
        case 1:
          if (cell.textContent < 18) {
            row.style.textDecoration = 'line-through';
          }
          break;
        case 2:
          if (cell.textContent == 'm') {
            row.classList.add('male');
          } else if (cell.textContent == 'f') {
            row.classList.add('female');
          }
          break;
        case 3:
          if (cell.dataset.available == 'true') {
            row.classList.add('available');
          } else if (cell.dataset.available == 'false') {
            row.classList.add('unavailable');
          } else {
            row.hidden = true;
          }
          break;
      }
    });
  });
}
