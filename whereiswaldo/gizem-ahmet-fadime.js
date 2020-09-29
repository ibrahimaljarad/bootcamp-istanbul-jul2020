

const whereIsWaldo= (arr) => {

  const flatten= arr.flat();
  console.log(flatten)
  let notWaldo;
  if(flatten[0]===flatten[1]|| flatten[0] === flatten[2]){
    notWaldo=flatten[0]
  }else {
    return [1,1]
  }
  console.log(notWaldo)
  const index = flatten.findIndex((waldo) => waldo !== notWaldo)
  console.log(index)//index of B
  const row= Math.floor(index / arr[0].length) + 1;
  console.log(row)
  const column= index % arr[0].length +1;
  console.log(column)
  if (index >= 0) {
    console.log ([row, column])
    return [row, column];
  }else {
    console.log('Waldo is not here')
    return 'Waldo is not here';
  }
  // return index >= 0 ? [row, column] : 'Waldo is not here'
}

whereIsWaldo([
  ["A", "A", "A"],//0
  ["A", "A", "A"],//1
  ["A", "B", "A"]//2
])

