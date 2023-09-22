class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
  }

  letterToNumber(row) {
    let letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let convertedLetterToNumber = letterArray.indexOf(row.toUpperCase());
    if (convertedLetterToNumber === -1) {
      return "none";
    } else {
      return convertedLetterToNumber + 1;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.gridisize(puzzleString);
    row = this.letterToNumber(row);

    if (grid[row - 1][column - 1] == value) {
      return true;
    }

    if (
      grid[row - 1][column - 1] !== 0 &&
      grid[row - 1][column - 1] !== value
    ) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.gridisize(puzzleString);
    row = this.letterToNumber(row);

    if (grid[row - 1][column - 1] == value) {
      return true;
    }

    if (
      grid[row - 1][column - 1] !== 0 &&
      grid[row - 1][column - 1] !== value
    ) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (grid[i][column - 1] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.gridisize(puzzleString);
    row = this.letterToNumber(row);

    if (grid[row - 1][column - 1] == value) {
      return true;
    }

    if (
      grid[row - 1][column - 1] !== 0 &&
      grid[row - 1][column - 1] !== value
    ) {
      return false;
    }

    let startRow = row - (row % 3),
      startCol = column - (column % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == value) {
          return false;
        } else {
          return true;
        }
  }

  solveSuduko(grid, row, column) {
    const N = 9;

    if (row == N - 1 && column == N) return grid;

    if (column == N) {
      row++;
      column = 0;
    }

    if (grid[row][column] != 0) return this.solveSuduko(grid, row, column + 1);

    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, column, num)) {
        grid[row][column] = num;

        if (this.solveSuduko(grid, row, column + 1)) return grid;
      }

      grid[row][column] = 0;
    }
    return false;
  }

  isSafe(grid, row, column, num) {
    // Return false if value already in row
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

    // Return false if value already in column
    for (let x = 0; x <= 8; x++) if (grid[x][column] == num) return false;

    // Return false if value already in 3 x 3 region
    let startRow = row - (row % 3),
      startCol = column - (column % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;

    return true;
  }

  gridisize(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let row = -1;
    let column = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++;
      }
      if (column % 9 == 0) {
        column = 0;
      }

      grid[row][column] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      column++;
    }
    return grid;
  }

  degridisize(grid) {
    return grid.flat().join("");
  }

  solve(puzzleString) {
    let validation = this.validate(puzzleString);
    if (validation === false) {
      return false;
    }

    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    let grid = this.gridisize(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0);
    if (!solved) {
      return false;
    }
    let solvedString = this.degridisize(solved);
    return solvedString;
  }
}

module.exports = SudokuSolver;