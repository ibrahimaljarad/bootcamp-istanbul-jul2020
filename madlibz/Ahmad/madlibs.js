/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  let List_Obj=[];
  let array=[];
  array= rawStory.replace("\n"," ").split(" ");
  for (let i=0;i<array.length;i++){
    let word, pos;
    // array[i]=array[i].replace(".","");
    if (array[i].includes("[n]")){
      if (array[i][array[i].length-1]==="."){
        array[i]=array[i].replace(".","");
        word=array[i].slice(0,-3);
        word+=".";
      }
      else if (array[i][array[i].length-1]===","){
        array[i]=array[i].replace(",","");
        word=array[i].slice(0,-3);
        word+=",";
      }
      else {
        word=array[i].slice(0,-3);
      }
      pos="noun";
      List_Obj.push({word,pos});
    }
    else if(array[i].includes("[v]")){
      if (array[i][array[i].length-1]==="."){
        array[i]=array[i].replace(".","");
        word=array[i].slice(0,-3);
        word+=".";
      }

      else if (array[i][array[i].length-1]===","){
        array[i]=array[i].replace(",","");
        word=array[i].slice(0,-3);
        word+=",";
      }
      else {
        word=array[i].slice(0,-3);
      }      
      pos="verb";
      List_Obj.push({word,pos});
    }
    else if(array[i].includes("[a]")){
      if (array[i][array[i].length-1]==="."){
        array[i]=array[i].replace(".","");
        word=array[i].slice(0,-3);
        word+=".";
      }
      else if (array[i][array[i].length-1]===","){
        array[i]=array[i].replace(",","");
        word=array[i].slice(0,-3);
        word+=",";
      }
      else {
        word=array[i].slice(0,-3);
        console.log(word);

      }      
      pos="adjective";
      console.log(word)
      List_Obj.push({word,pos});
      console.log(word)

    } 
    else {
      word=array[i];
      List_Obj.push({word});

    }
  }
  return List_Obj // This line is currently wrong :)
}

// document.getElementByClassName("madLibsPreview").innerHTML = story;

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

//creating and adding inputs with styling
function AddInputs(each){
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class","form-control d-inline-flex mt-1");
  input.style.width="unset";
  input.placeholder = each.pos;
  input.setAttribute("maxlength", "20");
  document.querySelector(".madLibsEdit").appendChild(input);
  console.log(each.word)

 return input;
}
//adding to the preview div
function AddPosToPreview(pos){
  const preview=document.querySelector(".madLibsPreview");
  const pp=document.createElement("span");
  // console.log(pos);
  if (pos!= null){
    pp.setAttribute("class","badge badge-danger");
  }
  pp.innerHTML=pos;
  preview.appendChild(pp);
  return pp
}
//Adding word.value to the edit and preview divs
function AddWord(each){
  const c=AddPosToPreview(each.pos);
  c.innerHTML=each.word+" ";
  const EDIT=document.querySelector(".madLibsEdit");
  const p=document.createElement("span");
  p.innerHTML=each.word+" ";
  EDIT.appendChild(p);
}


getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    for (let each of processedStory){
      if (each.pos){
        const input=AddInputs(each);
        let c=AddPosToPreview(each.pos)
        input.addEventListener("input", (e) => {
          if (input.value === ""){
            c.innerHTML=`${each.pos}`;
          }
          else{
          c.innerHTML=input.value;
          }
          alarm.classList.add("d-none");

        });
        //the highlighting part and 
        let alarm=document.getElementById("alarm"); 
        input.addEventListener("focusin",(e)=>{
          e.target.style.background = 'Cornsilk'
        })
        input.addEventListener("focusout", (e)=>{
          if (!input.nextSibling.innerHTML.includes(".") && !input.nextSibling.innerHTML.includes(",")){  
          c.innerHTML+=" ";}
          e.target.style.background = '';
          if (input.value.trim()==""){
            alarm.classList.remove("d-none");
            alarm.innerHTML="Please fill the input";
          }
        });
        if (each.word.includes(".")){
          AddWord({word:"."});
        }
        if (each.word.includes(",")){
          AddWord({word:","});
        }
        AddWord({word:" "});
      }
      else {
        AddWord(each)
      }
    }
    //When pressing Enter --> moves to the nest inmput...
    function NextInput(e){
      const SELECT=document.querySelectorAll("Input");
      for (let each=0;each<SELECT.length;each++){
        const NEXT=SELECT[each+1];
        SELECT[each].addEventListener("keypress", (e) => {
        if (e.key === "Enter" && NEXT) { 
        e.preventDefault();
        NEXT.focus();
        } 
      })      

    }}
    NextInput();
});
  