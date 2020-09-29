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


function getNumNeighborMines(inputArray, currentI, currentJ) {
  let numberOfMines = 0 ;
  // In this function, you want to check the slots around
  // (currentI, currentJ) coordinates.
  // This function should use NO OTHER VARIABLES OUTSIDE THIS FUNCTIONS SCOPE
  // It should only use inputArray, currentI, currentJ.
  //let inputArray = [];
  //let currentI = 0;
  //let currentJ = 0;
  //let i = 1;
  //let j = 1;
  // You want to return a number.

  // console.log the following and think about what they mean.
  // console.log((inputArray[currentI + 1][currentJ + 1]));
  // inputArray[i + 1][j]
  // inputArray[i - 1][j - 1]
  // inputArray[i][j - 1]
  // inputArray[i][j + 1]

  // PLAN:
  // 1. Check all 8 theoretical possibilities
  // 2. Only count the ones that are not undefined
  const neighboringCoordinates = [
    [currentI - 1, currentJ],
    [currentI - 1, currentJ - 1],
    [currentI - 1, currentJ + 1],
    [currentI, currentJ + 1],
    [currentI, currentJ - 1],
    [currentI + 1, currentJ - 1],
    [currentI + 1, currentJ],
    [currentI + 1, currentJ + 1]
  ];
  // console.log(neighboringCoordinates);
  // Go through all the 8 possibilities, but only some of them will actually work.
  for (let k = 0; k < neighboringCoordinates.length; k++) {
    // Candidate is a potential [i, j] coordinate.
    const coordinates = neighboringCoordinates[k];
    // console.log(coordinates[0] , coordinates[1]);
    if (coordinates[0] < 0 || coordinates[0] >= inputArray.length || coordinates[1] < 0 || coordinates[1] >= inputArray[0].length){
      continue;
      }
      // console.log(inputArray[coordinates[0]][coordinates[1]]);
    if (inputArray[coordinates[0]][coordinates[1]] === 1){
      numberOfMines ++;
    }
    // TASK TWO.
    // Figure out the if-condition for if something is off the edge of the screen.
    // row -- candidate[0];
    // column -- candidate[1];
    // If the potential candidate is "off the edge of the screen", then skip it (use "continue")
    // Else check if it's a mine.
  
  }
  return numberOfMines;
}

function minesweeper(inputArray) {
  // Eventually going to a two dimensional array.
  const result = [];
  for (let i = 0; i < inputArray.length; i++) {
    // Need to push something to `result` to construct the two-dimensional array.
    result.push([])
    // Another for loop goes here.
    for (let j = 0; j < inputArray.length; j++) {
      // What does this variable contain? It contains either 0 or 1.
      const inputMine = inputArray[i][j];
      //console.log(inputMine);
      if(inputMine === 0) {
        
const numNeighborMines = getNumNeighborMines(inputArray, i, j);
result[i].push(numNeighborMines)
      }else{
        result[i].push(9)
      }
      
    }
  }
  return result;
} 

minesweeper(
[
   [0, 1, 0, 0],
   [0, 0, 1, 0],
   [0, 1, 0, 1],
   [1, 1, 0, 0],
 ]
);