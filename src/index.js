module.exports = function solveSudoku(matrix) {

  const numbers = [1, 2 ,3 ,4, 5, 6, 7, 8, 9];

  function checkRow(number, row){
   return !matrix[row].includes(number); 
  }

  function checkColumn(number, col) {
    for (let i = 0; i <= matrix.length -1; i++) {
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
        return [...candidates];
      }
  }
 
 console.log(matrix);
  let tempMatrix = matrix;
  for (let i = 0; i < tempMatrix.length; i++) {
    for (let j = 0; j < tempMatrix[0].length; j++) {
      if (tempMatrix[i][j] === 0) {
       let candidates = findSectionCandidates(i, j);
       console.log('found zero, and candidates for them at row', i, 'col', j, candidates);
          for (let k = candidates.length-1; k >= 0; k--) {
            if (checkRow(candidates[k],i) && checkColumn(candidates[k],j)) {
            console.log(checkRow(candidates[k],i) , checkColumn(candidates[k],j));
            
            tempMatrix[i][j] = candidates[k];

            console.log(tempMatrix);
          } 
        }      
      }
          
    } 
      
  }
  console.log(tempMatrix);
  return tempMatrix;
}
   

   /**0 [0 1 2] [3 4 5] [6 7 8]
  **1 [0 1 2] [3 4 5] [6 7 8]
  **2 [0 1 2] [3 4 5] [6 7 8]

  **3 [0 1 2] [3 4 5] [6 7 8]
  **4 [0 1 2] [3 4 5] [6 7 8]
  **5 [0 1 2] [3 4 5] [6 7 8]

  **6 [0 1 2] [3 4 5] [6 7 8]
  **7 [0 1 2] [3 4 5] [6 7 8]
  **8 [0 1 2] [3 4 5] [6 7 8] */
