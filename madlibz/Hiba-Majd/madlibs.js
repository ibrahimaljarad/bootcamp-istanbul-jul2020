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
/*
for parsing the story we added the splitted the story by word and used regular expression to  replace noun and verb and adjective. and we added them into array of words.

*/
function parseStory(rawStory) {
  // Your code here.
  // This line is currently wrong :)
  const arrayOfWords = []
  const splittedStory = rawStory.split(" ")
  const previewBox = document.querySelectorAll(".previewBox")[0];
  for (const word of splittedStory) {
    if ((/\[n\]/).test(word) === true) {
      arrayOfWords.push({
        word: word.replace("[n]", ""),
        pos: "n"
      })
    } else if ((/\[a\]/).test(word) === true) {
      arrayOfWords.push({
        word: word.replace("[a]", ""),
        pos: "a"
      })
    } else if ((/\[v\]/).test(word) === true) {
      arrayOfWords.push({
        word: word.replace("[v]", ""),
        pos: "v"
      })
    } else {
      arrayOfWords.push({
        word: word
      })
    }
  }
  // console.log(arrayOfWords)

  return arrayOfWords

}


/*
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
/*

*/
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    //console.log(processedStory);
    functionality(processedStory)
  });

/*
// 1-create a first div.
//2- for loop on the array of words if it has value print on screen.
//3- if it blank { (event listner)create and input span and id.
4- create a second div where we can connect the value of blank with target of span above .
}
*/

function functionality(arrayOfWords) {
  const resetBtn = document.querySelectorAll("button")[0]
  const editBox = document.querySelectorAll(".editBox")[0];
  const previewBox = document.querySelectorAll(".previewBox")[0];
  const inputIds = ["0place", "1feature", "2name", "3favorite-activity", "4best-feature", "5dream", "6role-model", "7motivation", "8discouragement", "9dream-2"];
  const arrayOfBlanks = []

  const inputHolders = ["Your&nbsp;magical&nbsp;place&nbsp;[n]", "A&nbsp;good&nbsp;feature&nbsp;in&nbsp;you&nbsp;[a]", "Your&nbsp;name&nbsp;[n]", "Your&nbsp;favorite&nbsp;activity&nbsp;[v]", "Another&nbsp;good&nbsp;feature&nbsp;[n]", "Your&nbsp;dream&nbsp;[n]", "Your&nbsp;role&nbsp;model&nbsp;[n]", "A&nbsp;motivating&nbsp;activity&nbsp;[v]", "A&nbsp;demotivating&nbsp;activity&nbsp;[v]", "Your&nbsp;dream&nbsp;[n]"]
  let count = 0;

  // Adding the story to the HTML
  for (const obj of arrayOfWords) {
    if (/\.\.\./.test(obj.word) !== true) {
      editBox.innerHTML += `${obj.word} &nbsp;`;
      previewBox.innerHTML += `${obj.word}  &nbsp;`;
    } else {
      editBox.innerHTML += `<input id = ${inputIds[count]} class="editable" type="text" placeholder=${inputHolders[count]} maxlength="20" autocomplete="off">`
      previewBox.innerHTML += `<span class= ${inputIds[count]} class="readonly">[${obj.pos}] </span>`
      count += 1
      arrayOfBlanks.push(obj)
    }
  }


  const editableBoxes = document.querySelectorAll(".editable");
  const readonlyBoxes = previewBox.querySelectorAll("span");


  let counter = 0
  let spanElement
  let spanPOS
  let boxIndex
  let i = 0;

  // Live Update
  for (const box of editableBoxes) {
    box.addEventListener('input', function () {
      spanElement = document.getElementsByClassName(box.id)[0];
      // boxIndex = editableBoxes.indexOf(box);
      spanPOS = `[${arrayOfBlanks[box.id[0]].pos}] `
      // spanPOS = spanElement.innerText;
      if (box.value === "") {
        spanElement.innerText = spanPOS;
        box.style.backgroundColor = "#FFA6A6";
      } else {
        spanElement.innerText = `${box.value} `;
        document.getElementById(box.id).style.backgroundColor = "#a8d3d3";
      }
    })

    // Hotkeys
    box.addEventListener("keypress", function (e) {
      boxIndex = parseInt(box.id[0], 10)
      if (e.keyCode == 13) {
        if (boxIndex < 9) {
          editableBoxes[boxIndex + 1].focus()
        }
        if (Array.from(editableBoxes).every(elem => elem.value !== "")) {
          document.querySelector(".previewBox").className += " readyStory";
        } else {
          document.querySelector(".previewBox").classList.remove("readyStory");
        }
      }
    })
    counter++
  }

  // Extra
  const button = document.getElementById('enter');
  button.addEventListener('click', function (e) {
    document.getElementById('entrance').style.display = "none";
  })
  button.addEventListener("mouseover", function () {
    button.style.cursor = "pointer";
  })
}