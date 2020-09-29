function mineSweeper(arr) {
    let arrOfArrs = arr
    //first replace mines
    
    for (let i = 0; i < arrOfArrs.length; i++) {
        for (let j = 0; j < arrOfArrs[i].length; j++) {
            if (arrOfArrs[i][j] === 1) {
                arrOfArrs[i][j] = 9;
            }
        }
    }
    
    //count the mines around
    for (let y = 0; y < arrOfArrs.length; y++) {
        for (let k = 0; k < arrOfArrs[y].length; k++) {
            if (arrOfArrs[y][k] === 0) {
                arrOfArrs[y][k] = countMines(arrOfArrs, y, k);
            }
        }
    }

    //log them row by row
    arrOfArrs.forEach((x) => console.log(x));
}


function countMines(arr, curRow, curCol) {
  let total= 0
  const pos = []
  
  if(arr[curRow]!==undefined){
    const left=arr[curRow][curCol-1]
    const right=arr[curRow][curCol+1]
    pos.push(left)
    pos.push(right)
  }

  if(arr[curRow-1]!==undefined){
    const upper=arr[curRow-1][curCol]
    const leftUp=arr[curRow-1][curCol-1]
    const rightDown=arr[curRow-1][curCol+1]
    pos.push(upper)
    pos.push(leftUp)
    pos.push(rightDown)
  }

  if(arr[curRow+1]!==undefined){
    const bottom=arr[curRow+1][curCol]
    const leftDown=arr[curRow+1][curCol-1]
    const rightUp=arr[curRow+1][curCol+1]
    pos.push(bottom)
    pos.push(leftDown)
    pos.push(rightUp)
  }
  
  pos.forEach(x=>{
    if(x===9 && x!== undefined){
      total++
    }
  })

  return total
}



mineSweeper([
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0],
]);

// [
//   [1, 9, 2, 1],
//   [2, 3, 9, 2],
//   [3, 9, 4, 9],
//   [9, 9, 3, 1],
// ]


