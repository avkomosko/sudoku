module.exports = function solveSudoku(matrix) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function checkRow(number, row) {
    return !matrix[row].includes(number);
  }

  function checkColumn(number, col) {
    for (let i = 0; i <= matrix.length - 1; i++) {
      if (matrix[i][col] === number) {
        return false;
      } else {
        return true;
      }
    }
  }

  function findSectionCandidates(row, col) {
    let candidates = new Set(numbers);
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[row + i][col + j] !== 0) {
          candidates.delete(matrix[row + i][col + j]);
        }
      }
    }
    if (candidates.size === 0) {
      return -1;
    } else {
      return candidates;
    }
  }

  function findRowCandidates(row) {
    let rowSet = new Set(numbers);
    for (let num of matrix[row]) {
      if (num !== 0) {
        rowSet.delete(num);
      }
    }
    if (rowSet.size === 0) {
      return -1;
    } else {
      return rowSet;
    }
  }

  function findColumnCandidates(col) {
    let colSet = new Set(numbers);
    for (let row of matrix) {
      if (row[col] !== 0) {
        colSet.delete(row[col]);
      }
    }
    if (colSet.size === 0) {
      return -1;
    } else {
      return colSet;
    }
  }

  function isSolved(matrix) {
    function iaArrayOfUnic(arr) {
      let set = new Set(arr);
      return set.size === arr.length && !set.has(0);
    }
    return matrix.every(iaArrayOfUnic);
  }

  function unsolvedAmount(matrix) {
    let result = 0;
    for (let item of matrix) {
      for (let el of item) {
        if (el === 0) {
          result++;
        }
      }
    }
    return result;
  }

  function checkCandidates(row, col) {
    let candidates = findSectionCandidates(row, col);
    let rowCandidates = findRowCandidates(row);
    let colCandidates = findColumnCandidates(col);
      for (let num of candidates) {
        if (!rowCandidates.has(num) || !colCandidates.has(num)) {
          candidates.delete(num);
        }
      } 
    candidates = [...candidates];
    return candidates;
  }
    
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === 0) {
          let candidates = checkCandidates(i,j);
          if (candidates.length === 1 && !!candidates[0]) {
            matrix[i][j] = candidates[0];
          } else {
            for (let num of candidates) {
              if (checkRow(num, i) && checkColumn(num, j)) {
                let unsolved = unsolvedAmount(matrix);
                if (unsolved >=0) {
                  matrix[i][j] = candidates[num];
                }
              } 
            }
          }
        }     
      }
    } 
  if (isSolved(matrix)) {
    return matrix;
  }
}
