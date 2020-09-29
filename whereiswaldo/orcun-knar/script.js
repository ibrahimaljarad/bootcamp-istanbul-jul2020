console.log(whereIsWaldo([
   ["A", "A", "A"],
   ["A", "A", "A"], 
   ["A", "B", "A"]          
 ]))

/ console.log(whereIsWaldo([
   ["c", "c", "c", "c"],
   ["c", "c", "c", "d"]
 ]))


 console.log(whereIsWaldo([
   ["P", "O", "O", "O"],
   ["O", "O", "O", "O"],
   ["O", "O", "O", "O"],
   ["O", "O", "O", "O"],
   ["O", "O", "O", "O"],
   ["O", "O", "O", "O"]
 ]));

 function whereIsWaldo(twoDimArray){

   let result = [];
   
    for (let i = 0; i < twoDimArray.length; i++){
      for(let j = 0; j < twoDimArray[i].length; j++){
        if(twoDimArray[i][j] !== twoDimArray[0][0]){
        result.push(i+1);
        result.push(j+1);
        }
        else if(twoDimArray[0][0] !== twoDimArray[0][1]){
        result.push(1,1)
        return result
        }
      }
    }
  return result;
} 


   
