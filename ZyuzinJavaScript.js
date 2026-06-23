// zyuzin used to get recursion number
var recursion_number;

const grid_test = [
[0,0,0,0,0,0,0,0,0],
[0,8,2,0,9,0,7,3,0],
[4,0,0,8,0,7,0,0,5],
[0,1,0,0,5,0,0,9,0],
[0,0,9,0,2,0,5,0,0],
[0,3,0,0,6,0,0,1,0],
[7,0,0,6,0,4,0,0,9],
[0,4,1,0,7,0,3,5,0],
[0,0,0,0,0,0,0,0,0]
];

const grid = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
];

const grid_tosolve = [
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,]
];

const grid_solution = [
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,],
  [,,,,,,,,]
];

function Test()
{
  let textfield = document.getElementById("TestManual");
  let value;
//  let value = getRandomInt9();
//  let emptycellsfield = document.getElementById("emptycells");
//  let value = emptycellsfield.value;
//  let id;
//  let value;
//  for (let i = 0; i < 1; i++)
//  {
//    for (let j = 0; j < 1; j++) 
//    {
//      id = "a" + i + j;
//      let field = document.getElementById("a" + i + j);
//      value = document.getElementById(id).value;
//    }
//  }
//  id = "a" + 0 + 0;
//  value = document.getElementById(id).value;
//  textfield.value = id + value;
//  textfield.value = value;
//  textfield.value = id;
//  textfield.value = value;

//  Test to check that numbers are distinct
//    const numbers = [0,0,0,0,0,0,0,0,0];
//    const numbers = [1,1,0,0,0,0,0,0,6];
//    const numbers = [7,1,4,3,9,5,2,8,6];
//    const numbers = [1,2,3,4,5,6,7,8,9];
//    if (isDistinctNumbers(numbers))
//    {
//      textfield.value = "Correct";
//    }
//    else
//    {
//      textfield.value = "Incorrect";
//    }
// end Test

  value = "" + grid_solution[0][0] + grid_solution[0][1] + grid_solution[0][2] + grid_solution[0][3] + grid_solution[0][4] + grid_solution[0][5] + + grid_solution[0][6] + grid_solution[0][7] + grid_solution[0][8];
  textfield.value = value;

}

function Debug(field_id, value)
{
  const field = document.getElementById(field_id);
  field.value = value;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function getRandomInt9()
{
  let result = Math.floor(Math.random() * 9) + 1;
  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateSudoku() 
{
  ClearGrid();
  sudokuGenerator();
  for (let i = 0; i < 9; i++) 
  {
    for (let j = 0; j < 9; j++) 
    {
      id = "a" + i + j;
      const field = document.getElementById(id);
      const value = grid[i][j];
      grid_tosolve[i][j] = grid[i][j];
      if (value !== undefined && value !== 0) 
      {
        field.value = value;
        field.style.backgroundColor = "lightblue";
        field.style.color = "#000064";
        field.setAttribute("readOnly", "true");
      }
      else
      {
        field.value = "";
// zyuzin !!!!! important
        grid_tosolve[i][j] = 0;
      }
    }
  }
}

function ClearGrid()
{
  for (let i = 0; i < 9; i++) 
  {
    for (let j = 0; j < 9; j++) 
    {
      grid[i][j] = 0;
      grid_tosolve[i][j] = 0;
      id = "a" + i + j;
      const field = document.getElementById(id);
      field.value = "";
      field.style.backgroundColor = "white";
      field.readOnly = false;
// zyuzin !!!!! check if needed
//      field.style.color = "#999999";
    }
  }
}

function ClearSudoku() 
{
  ClearGrid();
}

function SolveSudokuZyuzin()
{
// zyuzin used to get recursion number
  recursion_number = 0;

  for (let i = 0; i < 9; i++)
  {
    for (let j = 0; j < 9; j++) 
    {
      let id = "a" + i + j;
      let field = document.getElementById(id);
      let value = +field.value;
      if (value !== "")
      {
        grid_tosolve[i][j] = value;
        grid_solution[i][j] = value;
      }
      else
      {
        grid_tosolve[i][j] = 0;
        grid_solution[i][j] = 0;
      }
    }
  }

  solveSudoku(grid_solution);

  let iscorrect = isSudokuCorrect(grid_solution);

//  let value_check = "Sudoku status: " + grid_solution[0][0] + grid_solution[0][1] + grid_solution[0][2] + grid_solution[0][3] + grid_solution[0][4] + grid_solution[0][5] + + grid_solution[0][6] + grid_solution[0][7] + grid_solution[0][8] + iscorrect;
//    Debug("TestManual", value_check);

  if (!iscorrect)
  {
    alert("Sudoku does not have solution!");
    for (let i = 0; i < 9; i++)
    {
      for (let j = 0; j < 9; j++)
      {
        let id = "b" + i + j;
        let field = document.getElementById(id);
        field.style.color = "#000064";
        let value_grid = grid[i][j];
        if (value_grid > 0)
        {
          field.textContent = value_grid;
          field.style.backgroundColor = "#AAAAFF";
        }
        else
        {
          field.textContent = "";
          field.style.backgroundColor = "#FFEEFF";
        }
      }
    }
    return;
  }
  else
  {
// zyuzin !!!!!!!!!!
//  let value_check = "Sudoku correct?: " + grid_solution[0][0] + grid_solution[0][1] + grid_solution[0][2] + grid_solution[0][3] + grid_solution[0][4] + grid_solution[0][5] + + grid_solution[0][6] + grid_solution[0][7] + grid_solution[0][8];
//    Debug("TestManual", value_check);
  }

  for (let i = 0; i < 9; i++)
  {
    for (let j = 0; j < 9; j++)
    {
      let id = "b" + i + j;
      let field = document.getElementById(id);
      field.style.color = "#000064";
      let value_tosolve = grid_tosolve[i][j];
      let value_solution = grid_solution[i][j];
      field.textContent = value_solution;
      if (value_tosolve === value_solution)
      {
        field.style.backgroundColor = "#AAAAFF";
      }
      else
      {
        field.style.backgroundColor = "#FFEEFF";
      }
    }
  }

// zyuzin !!!!!
//  Debug("TestAutomated", "Rec Number: " + recursion_number);
}

function ClearSolution() 
{
  for (let i = 0; i < 9; i++) 
  {
    for (let j = 0; j < 9; j++) 
    {
      id = "b" + i + j;
      const field = document.getElementById(id);
      field.textContent = "";
      field.style.backgroundColor = "white";
    }
  }
}

/////////////////

// Generate a Sudoku grid with K empty cells
function sudokuGenerator() 
{
  for (let i = 0; i < 9; i++)
  {
    for (let j = 0; j < 9; j++)
    {
      grid[i][j] = 0;
    }
  }
// Fill the diagonal 3x3 matrices
  fillDiagonal(grid);

// Fill the remaining blocks in the grid
  fillRemaining(grid, 0, 0);

// Remove K digits randomly to create the puzzle
  const emptycellsfield = document.getElementById("emptycells");
  let emptycells = emptycellsfield.value;
  removeKDigits(grid, emptycells);
}

// Fill the diagonal 3x3 matrices
// The diagonal blocks are filled to simplify the process
function fillDiagonal(grid) {
    
    for (let i = 0; i < 9; i += 3) {
        
        // Fill each 3x3 subgrid diagonally
        fillBox(grid, i, i);
    }
}

// Fill a 3x3 matrix
// Assign valid random numbers to the 3x3 subgrid
function fillBox(grid, row, col) 
{
  let num;
  for (let i = 0; i < 3; i++) 
  {
    for (let j = 0; j < 3; j++) 
    {
      for (let z = 0; z < 100; z++)
      {
        num = getRandomInt9();
        if (!NumberExist(grid, row, col, num))
        {
          grid[row + i][col + j] = num;
          break;
        }
      }
    }
  }
}

function NumberExist(grid, row, col, num)
{
  for (let i = 0; i < 3; i++) 
  {
    for (let j = 0; j < 3; j++) 
    {
      if (grid[row + i][col + j] === num) 
      {
        return true;
      }
    }
  }
  return false;
}

// Fill remaining blocks in the grid
// Recursively fill the remaining cells with valid numbers
function fillRemaining(grid, i, j) {
    
    // If we've reached the end of the grid
    if (i === 9) {
        return true;
    }

    // Move to next row when current row is finished
    if (j === 9) {
        return fillRemaining(grid, i + 1, 0);
    }

    // Skip if cell is already filled
    if (grid[i][j] !== 0) {
        return fillRemaining(grid, i, j + 1);
    }

    // Try numbers 1-9 in current cell
    for (let num = 1; num <= 9; num++)
    {
        let check = checkIfSafe(grid, i, j, num);
      if (checkIfSafe(grid, i, j, num))
      {
        grid[i][j] = num;
        if (fillRemaining(grid, i, j + 1)) 
        {
          return true;
        }
        grid[i][j] = 0;
      }
    }

    return false;
}

function checkIfSafe(grid, i, j, num) {
    return unUsedInRow(grid, i, num) && unUsedInCol(grid, j, num) &&
           unUsedInBox(grid, i - (i % 3), j - (j % 3), num);
}

function unUsedInRow(grid, i, num) {
    for (let j = 0; j < 9; j++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if it's safe to put num in column j
// Ensure num is not already used in the column
function unUsedInCol(grid, j, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Returns false if given 3x3 block contains num
// Ensure the number is not used in the box
function unUsedInBox(grid, rowStart, colStart, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[rowStart + i][colStart + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Remove K digits randomly from the grid
// This will create a Sudoku puzzle by removing digits
function removeKDigits(grid, k) {
    while (k > 0) {
        
        // Pick a random cell
        let cellId = Math.floor(Math.random() * 81);

        // Get the row index
        let i = Math.floor(cellId / 9);

        // Get the column index
        let j = cellId % 9;

        // Remove the digit if the cell is not already empty
        if (grid[i][j] !== 0) {
            // Empty the cell
            grid[i][j] = 0;

            // Decrease the count of digits to remove
            k--;
        }
    }
}

////////////////////

function solveSudoku(matrix)
{
// zyuzin !!!!! modify
  for (let i = 0; i < 9; i++)
  {
    for (let j = 0; j < 9; j++)
    {
      matrix[i][j] = grid_tosolve[i][j];
    }
  }
  solveSudokuRec(matrix, 0, 0);
}

function solveSudokuRec(mat, row, col)
{
// zyuzin used to get recursion number
  recursion_number++;
// no solution

// zyuzin !!!!! fix to increase recursion_number
//  if (recursion_number > 1000000)
  if (recursion_number > 1000000000)
  {
    return false;
  }

  if (row === 8 && col === 9)
    return true;
  if (col === 9) {
    row++;
    col = 0;
  }
  if (mat[row][col] !== 0)
    return solveSudokuRec(mat, row, col + 1);
  
  for (let num = 1; num <= 9; num++) 
  {
    if (isSafe(mat, row, col, num))
    {
       mat[row][col] = num;
       if (solveSudokuRec(mat, row, col + 1))
       return true;
       mat[row][col] = 0;
    }
  }
  return false;
}

// Function to check if it is safe to place num at matrix[row][col]
function isSafe(matrix, row, col, num)
{
// Check if num exists in the row or col
  for (let x = 0; x < 9; x++)
  {
    if (matrix[row][x] === num || matrix[x][col] === num)
    {
      return false;
    }
  }
// Check if num exists in the 3x3 sub-matrix
  const startRow = row - (row % 3), startCol = col - (col % 3);
  for (let i = 0; i < 3; i++)
  {
    for (let j = 0; j < 3; j++)
    {
      if (matrix[i + startRow][j + startCol] === num)
      {
        return false;
      }
    }
  }
  return true;
}

////////////////////
// Check if sudoku is correct

function isSudokuCorrect(matrix)
{
// zyuzin !!!!! remove return true
//  return true;

  let isCorrect = false;
  for (let i = 0; i < 9; i++)
  {
    const numbers_row = [0,0,0,0,0,0,0,0,0];
    for (let j = 0; j < 9; j++)
    {
      numbers_row[j] = matrix[i][j];
    }
    if (!isDistinctNumbers(numbers_row))
    {
      return false;
    }
    const numbers_column = [0,0,0,0,0,0,0,0,0];
    for (let j = 0; j < 9; j++)
    {
      numbers_column[j] = matrix[j][i];
    }
    if (!isDistinctNumbers(numbers_column))
    {
      return false;
    }
  }
  isCorrect = true;
  return isCorrect;
}

function isDistinctNumbers(numbers)
{
  const distinctNumbers = [...new Set(numbers)];
  if (numbers.length === distinctNumbers.length)
  {
    return true;
  }
  return false;
}
