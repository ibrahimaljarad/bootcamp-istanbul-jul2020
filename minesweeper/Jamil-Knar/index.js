 
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
    // const up = -1, down = 1, right = +1, left = -1;
    // You want to return a number.
    // console.log the following and think about what they mean.
    // inputArray[i + 1][j]
    // inputArray[i - 1][j - 1]    
    let counter = 0;
    for (let i = -1; i < 2; i++) {
        let x = currentI + i;
        for (let j = -1; j < 2; j++) {
            let y = currentJ + j;

            if (inputArray[x] && inputArray[x][y]) {
                if (x === currentI && y === currentJ) continue

                if (inputArray[x][y] === 1) {
                    counter++;
                }
            }
        }
    }

    return counter;
}

function minesweeper(inputArray) {
    // Eventually going to a two dimensional array.
    // we should use the _.clone() lodash function to deep copy the array
    const resultArr = JSON.parse(JSON.stringify(inputArray));
    // const resultArr = [...inputArray];
    
    console.log(typeof JSON.stringify(inputArray))
    for (let i = 0; i < inputArray.length; i++) {

        for (let j = 0; j < inputArray[i].length; j++) {
            const input = inputArray[i][j];
            // console.log(inputArray)
            // What does this variable contain? It contains either 0 or 1.
            if (input === 0) {
                const numNeighborMines = getNumNeighborMines(inputArray, i, j);
                // resultArr[i].push(numNeighborMines);
                resultArr[i][j] = numNeighborMines;
            } else if (input === 1){
                resultArr[i][j] = 9;
            }
        }
    }
    return resultArr;
}

console.log(minesweeper(
    [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 1, 0, 0],
    ]
));





