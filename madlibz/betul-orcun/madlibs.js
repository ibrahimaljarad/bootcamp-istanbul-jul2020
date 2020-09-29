

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

    const output = [];
    const reg = /(\[\w+\]),?/g;
  
    const individualWords = rawStory.split(' ');
   // console.log(individualWords);
    
    for(let i=0; i< individualWords.length; i++){
    
      let word = individualWords[i].split("[");
      let onlyWord = word[0];
      
      let objectOutput = {};
      objectOutput.word = onlyWord;
      
  
      if(individualWords[i].match(reg) != null) {
        const posValue = individualWords[i].match(reg);
      //  console.log(posValue);
          let resultValue = posValue[0][1];
  
          switch(resultValue){
            case "n": 
            objectOutput.pos = "noun";
            break;
  
            case "v": 
            objectOutput.pos = "verb";
            break;
  
            case "a": 
            objectOutput.pos = "adjective";
            break;
  
            case "p": 
            objectOutput.pos = "pronoun";
            break;
         }      
      }
      output.push(objectOutput);
     // console.log(objectOutput)     
    }  
      
   // console.log(output)
    return output; 
  }
  
  
  
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
  getRawStory()
    .then(parseStory)
    .then((processedStory) => {
     // console.log(processedStory);
  
    const madLibsEdit = document.querySelector(".madLibsEdit");
    const madLibsPreview = document.querySelector(".madLibsPreview");
   
      for(let i=0; i<processedStory.length; i++){
       if(!processedStory[i].pos) {
        if(processedStory[i].word.includes("\n")){
          const bre = document.createElement("br");
          const brp = document.createElement("br");
        
          madLibsEdit.appendChild(bre);
          madLibsPreview.appendChild(brp);
        }
  
          //For edit
        const spanEdit = document.createElement("span");
        const editNode = document.createTextNode(` ${processedStory[i].word} `);
        spanEdit.appendChild(editNode);
        madLibsEdit.appendChild(spanEdit);
  
         //For Preview
        const spanPre = document.createElement("span");
        const preNode = document.createTextNode(` ${processedStory[i].word} `);
        spanPre.appendChild(preNode);
        madLibsPreview.appendChild(spanPre);
       } 
        else {
          //For preview
        const spanPre = document.createElement("span");
        spanPre.setAttribute("id", i);
        spanPre.classList.add("spanClass"); 
        madLibsPreview.appendChild(spanPre);
  
          //For edit
        let inpt = document.createElement("input");
        inpt.setAttribute("type", "text");
        inpt.setAttribute("maxlength", 20);
        inpt.setAttribute("placeholder", `${processedStory[i].pos}`);
  
        inpt.addEventListener("keyup", function(){
          const selectedSpan = document.getElementById(i);
          selectedSpan.innerHTML = ` ${inpt.value} `;
  
          //local storage set item
          localStorage.setItem(i, inpt.value);
        });
  
        //local storage get item and set it to madLibsPreview
        const updatedSpan = document.getElementById(i);
  
        if(!localStorage.getItem(i)) {
          updatedSpan.innerHTML = `(${processedStory[i].pos})`;
        } else {
          updatedSpan.innerHTML = localStorage.getItem(i);
        }
  
        madLibsEdit.appendChild(inpt);
       }
      }
  
    function enter(e){
        let inpts = document.querySelectorAll("input");
        for(let i = 0; i < inpts.length; i++){
          inpts[i].addEventListener("keyup", function(e){
            if(inpts[i+1] && e.key === "Enter"){
              inpts[i+1].focus();
            }else if(inpts[inpts.length-1] && e.key === "Enter"){
              inpts[0].focus();
            }
          });
        }
     }
     enter(); 
    });