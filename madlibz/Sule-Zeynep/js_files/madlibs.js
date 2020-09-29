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

//PARSE STORY
function parseStory(rawStory) {
  // Your code here.

  //Create an empty array
  let newStory = rawStory;
  let splitting = newStory.split(" ");
  const arrOfStory = [];

  //Declare variables regular expressions

  let noun = /\[n\]/;
  let verb = /\[v\]/;
  let adjective = /\[a\]/;

  //Take the words into the Objects

  for (let i = 0; i < splitting.length; i++) {
    let word = splitting[i];
    let lastLetter = word[word.length - 1];
    if (lastLetter === ".") {
      word = word.slice(0, word.length - 1);
      //Deleting the the last chr if it's dot.
    }

    //Declare object for pushing inside of array of objects
    const wordObj = {
      word: word,
    };
    //console.log(wordObj);

    //Push objects into arrOfStory
    arrOfStory.push(wordObj);

    if (word.match(noun)) {
      wordObj.word = splitting[i].replace("[n]", "");
      wordObj.pos = "noun";
    } else if (word.match(verb)) {
      wordObj.word = splitting[i].replace("[v]", "");
      wordObj.pos = "verb";
    } else if (word.match(adjective)) {
      wordObj.word = splitting[i].replace("[a]", "");
      wordObj.pos = "adjective";
    }
    if (lastLetter === ".") {
      arrOfStory.push({ word: lastLetter });
    }
  }

  return arrOfStory;
}

/*
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 
 * * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    // Edit View DOM Declaration
    const madLibsEdit = document.querySelector(".madLibsEdit");

    //Preview View DOM Declaration
    const madLibsPreview = document.querySelector(".madLibsPreview");

    //Loop through objects from parsed story and placed them in two divs(madLibsEdit and madLibsPreview divs)

    for (let i = 0; i < processedStory.length; i++) {
      if (!processedStory[i].pos) {
        //if it is not a pos
        const pEdit = document.createElement("span");
        let pPreview = document.createElement("span");
        pEdit.innerText += `${processedStory[i].word}` + " ";
        pPreview.innerText += `${processedStory[i].word}` + " ";
        madLibsEdit.appendChild(pEdit);
        madLibsPreview.appendChild(pPreview);
      } else {
        //if it is a pos
        const input = document.createElement("input");
        let output = document.createElement("span");
        output.classList.add("liveUpdateSpans");
        madLibsEdit.appendChild(input);
        madLibsPreview.appendChild(output);
        input.type = "text";
        input.placeholder = `${processedStory[i].pos}`;
        input.max = 20; //max 20 chr
        output.innerText = `${processedStory[i].pos}`+" ";
        output.style.color = "yellow"; //default output color
      }
    }

    //Live Update
    function liveUpdate(e) {
      const inputs = document.querySelectorAll("input");
      const outputs = document.querySelectorAll(".liveUpdateSpans");

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", function (e) {
          outputs[i].textContent = inputs[i].value;
          outputs[i].style.color = "#EA6568"; //changed output color
        });
      }
    }
    liveUpdate();

    // Pressing Enter will direct to the next input
    function enter() {
      const inputs = document.querySelectorAll("input");

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keyup", function (e) {
          if (inputs[i + 1] && e.key === "Enter") {
            inputs[i + 1].focus();
          } else if (inputs[inputs.length - 1] && e.key === "Enter") {
            inputs[0].focus();
          }
        });
      }
    }
    enter();
  });
