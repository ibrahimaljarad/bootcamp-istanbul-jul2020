// Instructions For The Exercise

// Minesweeper Number of Neighbouring Mines

// Create a function that takes an array representation of a Minesweeper board, and returns another board where the value of each cell is the amount of its neighbouring mines.

// Notes:

// Since in the output the numbers 0-8 are used to determine the amount of adjacent mines, the number 9 will be used to identify the mines instead.
// A wikipedia page explaining how Minesweeper works is available in the Resources tab.
// If you get stuck on a challenge please search it online and try to find resources
// If you are really stuck, please ask your Instructors.

// Examples

// [
//   [0, 1, 0, 0],
//   [0, 0, 1, 0],
//   [0, 1, 0, 1],
//   [1, 1, 0, 0],
// ]
// The 0 represents an empty space . The 1 represents a mine.
// You will have to replace each mine with a 9 and each empty space with the number of adjacent mines, the output will look like this:

// [
//   [1, 9, 2, 1],
//   [2, 3, 9, 2],
//   [3, 9, 4, 9],
//   [9, 9, 3, 1],
// ]

// (1, 1) (zero-indexed)

// Input: two-dimensional array
// Output: two-dimensional array

// My thought process: this problem looks kinda hard. Let's do a for-loop because it's the easiest to understand my own code.

// Create something to store the results
// Iterate through each slot of the input array
// For each slot:
//    If it is not a mine:
//      Visit the neighboring slots
//      Sum the number of mines around it
//      Store the number of mines around it in the output
//    If it IS a mine:
//      Store a 9 in the output
// Return the output
//

function getNumNeighborMines(inputArray, currentI, currentJ) {
  // In this function, you want to check the slots around
  // (currentI, currentJ) coordinates.
  // This function should use NO OTHER VARIABLES OUTSIDE THIS FUNCTIONS SCOPE
  // It should only use inputArray, currentI, currentJ.

  // You want to return a number.

  // console.log the following and think about what they mean.
  // [i] [j]
  // [i] [j + 1]
  // [i] [j - 1]
  // [i + 1] [j + 1]
  // [i + 1] [j]
  // [i + 1] [j - 1]
  // [i - 1] [j - 1]
  // [i - 1] [j + 1]
  // [i - 1] [j]

  // minesweeper(
  // [
  //    [0, 1, 0, 0],
  //    [0, 0, 1, 0],
  //    [0, 1, 0, 1],
  //    [1, 1, 0, 0],
  //  ]
  // );

  let sumOfMines = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      // We are checking the neighbors here.
      const isNeighborWithinLeftSideX = currentI + i > -1;
      const isNeighborWithinRightSideX = currentI + i < inputArray.length;
      const isNeighborWithinTopY = currentJ + j > -1;

      if (
        isNeighborWithinLeftSideX &&
        isNeighborWithinRightSideX &&
        isNeighborWithinTopY &&
        currentJ + j < inputArray[0].length
      ) {
        //console.log(i)
        // console.log(inputArray[0].length)
        if (inputArray[currentI + i][currentJ + j] === 1) {
          sumOfMines++;
        }
        // console.log(inputArray[currentI + i][currentJ + j])
        // console.log(currentI + i,currentJ + j)
      }
    }
  }
  return sumOfMines;
}

function minesweeper(inputArray) {
  // Eventually going to a two dimensional array.
  const result = [];
  for (let i = 0; i < inputArray.length; i++) {
    // Need to push something to `result` to construct the two-dimensional array.
    // Another for loop goes here.
    result.push([]);
    for (let j = 0; j < inputArray[i].length; j++) {
      // What does this variable contain? It contains either 0 or 1.
      if (inputArray[i][j] === 1) {
        result[i].push(9);
      } else {
        const numNeighborMines = getNumNeighborMines(inputArray, i, j);

        result[i].push(numNeighborMines);
      }

      // console.log(inputArray[i + 1][j])
      // console.log(inputArray[i - 1][j - 1])
    }
  }

  return result;
}

minesweeper([
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
]);
