function whereIsWaldo(array) {
let repeatedElement
if (array[0][0] === array[0][1]||array[0][0] === array[0][2]){
  repeatedElement = array[0][0];
  }
else {
  return [1,1];
}

for (let i=0 ; i<array.length; i++) {
  for (let j=0 ; j<array[i].length; j++){
    if (array[i][j] !== repeatedElement){
      return [i+1, j+1]
    }
  }
}
};


// whereIsWaldo([
//   ["A", "A", "A"],
//   ["A", "A", "A"],
//   ["A", "B", "A"]
//  ])// ➞ [3, 2]

// whereIsWaldo([
//   ["c", "c", "c", "c"],
//   ["c", "c", "c", "d"]
// ])  //➞ [2, 4]

whereIsWaldo([
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "P", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"]

 ])// ➞ [5, 1]