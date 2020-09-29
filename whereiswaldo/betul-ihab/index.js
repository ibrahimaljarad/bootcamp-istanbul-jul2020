// Where's Waldo?

// Return the coordinates ([row, col]) of the element that differs from the rest.

// Notes:

// Rows and columns are 1-indexed (not zero-indexed).
// If you get stuck on a challenge please search it online and try to find resources
// If you are really stuck, please ask your Instructors.

// Examples

//const whereIsWaldo = [
//   ["A", "A", "A"],
//   ["A", "A", "A"],
//   ["A", "B", "A"]] //➞ [3, 2]

//whereIsWaldo([
//  ["c", "c", "c", "c"],
//  ["c", "c", "c", "d"]
//]) ➞ [2, 4]

//let whereIsWaldo =[
//  ["O", "O", "O", "O"],
//  ["O", "O", "O", "O"],
//  ["O", "O", "O", "O"],
//  ["O", "O", "O", "O"],
//  ["P", "O", "O", "O"],
//  ["O", "O", "O", "O"]
//] //➞ [5, 1]


function whereIsWaldo(arr){
    for(let i=0; i < arr.length ; i++ ) {
      for(let j=0 ; j < arr[i].length; j++) {
          //console.log(arr[i][j]);
          let ref;
          if (arr[0][0] === arr[0][1] || arr[0][0] === arr[0][2]) {
            ref = arr[0][0];
          } else {
            ref = arr[0][1];
          }
          if(arr[i][j] !== ref) {
            return ([i+1,j+1]);
          }
      }
    }
}

whereIsWaldo([
  ["d", "c", "c", "c"],
  ["c", "c", "c", "c"]
])

whereIsWaldo ([
 ["O", "O", "O", "O"],
 ["O", "O", "O", "O"],
 ["O", "O", "O", "O"],
 ["O", "O", "O", "O"],
 ["P", "O", "O", "O"],
 ["O", "O", "O", "O"]
])