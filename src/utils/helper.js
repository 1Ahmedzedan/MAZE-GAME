export function generateMaze(level) {
  
  let levels = [
    { rows: 3, cols: 3 },
    { rows: 4, cols: 4 },
    { rows: 4, cols: 5 },
    { rows: 4, cols: 6 },
    { rows: 5, cols: 5 },
    { rows: 6, cols: 6 },
    { rows: 6, cols: 7 },
    { rows: 7, cols: 7 },
    { rows: 7, cols: 8 },
    { rows: 7, cols: 9 },
  ];

  let rows = levels[level].rows,
    cols = levels[level].cols;
  // Initialize maze grid
  let maze = [];
  
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      maze[i][j] = 1; // 1 represents a blocked cell
    }
  }

  generatePath(0, 0, maze, rows, cols);

  return maze;
}

// Implement recursive backtracking algorithm to generate path
function generatePath(row, col, maze, rows, cols) {
  // base case
  if (row === rows - 1 && col === cols - 1) {
    // Reached the end cell
    maze[row][col] = 0;
    return true;
  }

  maze[row][col] = 0; // 0 represents an open cell

  // Define possible moves (up, down, left, right)
  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  moves.sort(() => Math.random() - 0.5); // Randomize the order of moves

  for (const move of moves) {
    const newRow = row + move[0];
    const newCol = col + move[1];
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      maze[newRow][newCol] === 1
    ) {
      if (generatePath(newRow, newCol, maze, rows, cols)) {
        return true;
      }
    }
  }

  // No valid moves, backtrack
  maze[row][col] = 1;
  return false;
}

// Define directions: up, down, left, right
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// Function to check if a cell is valid and not visited
const isValid = (grid, row, col, visited) => {
  const rows = grid.length;
  const cols = grid[0].length;
  return (
    row >= 0 &&
    row < rows &&
    col >= 0 &&
    col < cols &&
    grid[row][col] === 0 &&
    !visited[row][col]
  );
};

// Function to find shortest path in a grid using DFS
export const findShortestPath = (grid, startRow, startCol) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const endRow = rows - 1;
  const endCol = cols - 1;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const path = [];
  const shortestPath = [];

  dfsShortestPath(
    grid,
    startRow,
    startCol,
    endRow,
    endCol,
    visited,
    path,
    shortestPath
  );

  return shortestPath;
};


// Depth First Search for finding shortest path
const dfsShortestPath = (
  grid,
  row,
  col,
  endRow,
  endCol,
  visited,
  path,
  shortestPath
) => {
  // base case
  if (row === endRow && col === endCol) {
    if (shortestPath.length === 0 || path.length < shortestPath.length) {
      shortestPath.splice(0, shortestPath.length, ...path); 
      // shortestPath = path ; 
    }
    return;
  }

  visited[row][col] = true;
  path.push([row, col]);  // do

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (isValid(grid, newRow, newCol, visited)) {
      dfsShortestPath(
        grid,
        newRow,
        newCol,
        endRow,
        endCol,
        visited,
        path,
        shortestPath
      );
    }
  }

  visited[row][col] = false;
  path.pop(); //undo
};



export const isPathExist = (multiArrays, array) => {
  for (let i = 0; i < multiArrays.length; i++) {
    if (JSON.stringify(multiArrays[i]) === JSON.stringify(array)) {
      return true;
    }
  }
  return false;
};
