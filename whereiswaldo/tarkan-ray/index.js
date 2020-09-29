/*
Instructions For The Exercise

Where's Waldo?
 
Return the coordinates ([row, col]) of the element that differs from the rest.

Notes:

Rows and columns are 1-indexed (not zero-indexed).
If you get stuck on a challenge please search it online and try to find resources
If you are really stuck, please ask your Instructors.


Examples

whereIsWaldo([
  ["A", "A", "A"],
  ["A", "A", "A"],
  ["A", "B", "A"]
]) ➞ [3, 2]

whereIsWaldo([
  ["c", "c", "c", "c"],
  ["c", "c", "c", "d"]
]) ➞ [2, 4]

whereIsWaldo([
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["P", "O", "O", "O"],
  ["O", "O", "O", "O"]
]) ➞ [5, 1]

whereIsWaldo([
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["P", "O", "O", "O"],
  ["O", "O", "O", "O"]
])
 */
/*
function whereIsWaldo(arr){
  let row=0;
  let col=0;
  const counter = {}
  let execCounter=0;
  for(let i=0;i<arr.length;i++){
    for(let t=0;t<arr[i].length;t++){
      if(counter.hasOwnProperty(arr[i][t])){
        counter[arr[i][t]]+=1;
      }
      else{
        counter[arr[i][t]]=1
        }
    }
    for(let y=0;y<arr[i].length;y++){
      if(counter[arr[i][y]]===1){
        col=y+1;
        row=i+1;
      }
    }
  }

  return [row,col]
  }


whereIsWaldo([
  ["A", "G", "A"],
  ["A", "A", "A"],
  ["A", "A", "A"]
])

whereIsWaldo([
  ["c", "c", "c", "c"],
  ["c", "c", "c", "d"]
])

whereIsWaldo([
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["O", "O", "O", "O"],
  ["P", "O", "O", "O"],
  ["O", "O", "O", "O"]
])
*/
/*
function uniqueArray3(a) {
  function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }

  // usage
  var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']

  return unique;
}
*/

function whereIsWaldo(arr) {
    const obj = {};
    const result = arr.flat(Infinity);

    let target = "";
    result.map((x) => {
        if (obj.hasOwnProperty(x)) {
            obj[x] += 1;
        } else {
            obj[x] = 1;
        }
    });

    for (const [key, value] of Object.entries(obj)) {
        if (value === 1) {
            target = key;
        }
    }
    const indexTarget = result.indexOf(target) + 1;

    let colPos = indexTarget % arr[0].length;
    if (colPos === 0) {
        colPos = arr[0].length + 1;
    }
    const rowPos = Math.ceil(indexTarget / arr[0].length);
    return [rowPos, colPos];
}

whereIsWaldo([
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["O", "O", "O", "O"],
    ["P", "O", "O", "O"],
]);

whereIsWaldo([
    ["d", "c", "c", "c"],
    ["c", "c", "c", "c"],
])[
    /*
  whereIsWaldo([
    ["A", "G", "A"],
    ["A", "A", "A"],
    ["A", "A", "A"]
  ])*/

    (["A", "G", "A"], ["A", "A", "A"], ["A", "A", "A"])
];
