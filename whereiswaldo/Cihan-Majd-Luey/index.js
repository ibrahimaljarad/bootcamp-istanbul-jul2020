// 1- compare first three elements
//      if first element is equal to second
//        then first element is the main one
//      else compare the second to the third
//        if they are equal then the second is the main
//      else
//        the third is the main element
// 2- find the main elements
// 3- check for the rest of the array for a different elements

const whereIsWaldo = arr => {
        for (let row = 0; row < arr.length; row++) {
                for (let j = 0; j < arr[row].length; j++) {
                        if (arr[row][j] === arr[row][j + 1]) {
                                const mainStr = arr[row][j];
                        } else if (arr[row][j + 1] !== undefined) {
                                if (arr[row][j + 1] === arr[row][j + 2]) {
                                        const mainStr = arr[row][j + 1];
                                        // the first is waldo
                                        const result = [row + 1, j + 1];
                                        return result;
                                }
                                // the second is waldo
                                return [row + 1, j + 2];
                        }
                }
        }
};

console.log(whereIsWaldo([['A', 'A', 'A'], ['A', 'A', 'A'], ['A', 'B', 'A']]));
