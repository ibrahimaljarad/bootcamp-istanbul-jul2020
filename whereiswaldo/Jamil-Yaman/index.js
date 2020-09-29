function whereIsWaldo (elments) {
    let sharedElement, differentElemnt = undefined;
  
    let diffElemntPosition = [undefined, undefined];
      // find the different array
  
    for (let i = 0; i < elments.length; i++) {
      const element = elments[i];
  
      let isDifferent = element.every((value, index) => value === element[0]);
  
      if(isDifferent) {
        sharedElement = element[0];
      } else {
        diffElemntPosition[0] = i + 1;
  
        // find the next position if me find the similar element
        if(sharedElement) {
          elments[i].forEach((ele, index) => {
            if (ele !== sharedElement)
              diffElemntPosition[1] = index + 1;
          });
  
          return diffElemntPosition;
        }
      }
    }
    // console.log(diffElemntPosition)
  }
  
  
  
  // console.log(whereIsWaldo([
  //   ["A", "A", "A"],
  //   ["A", "A", "A"],
  //   ["A", "B", "A"]
  // ])) //➞ [3, 2]
  
  whereIsWaldo([
    ["c", "c", "c", "c"],
    ["c", "c", "c", "d"]
  ]) //➞ [2, 4]
  
  whereIsWaldo([
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["P", "O", "O", "O"],
    ["O", "O", "O", "O"]
  ]) //➞ [5, 1]
  
  