function parseStory(rawStory) {
  // Your code here.
  const storyWords = rawStory.split(" ");

  //all regex
  const rex = /\[.*\]/gi;
  const objsOfWords = storyWords.map((word) => {
    const wordOnly = word.replace(word.match(rex), "");
    let posRe = word.match(rex);

    if (posRe === null) {
      return { word: wordOnly };
    }
    posRe = posRe[0];
    switch (posRe) {
      case "[na]":
        return { word: wordOnly, pos: "nationality" };

      case "[p]":
        return { word: wordOnly, pos: "person" };

      case "[n]":
        return { word: wordOnly, pos: "noun" };

      case "[v]":
        return { word: wordOnly, pos: "verb" };

      case "[a]":
        return { word: wordOnly, pos: "adjective" };

      case "[f]":
        return { word: wordOnly, pos: "food" };

      case "[s]":
        return { word: wordOnly, pos: "shapes" };

      case "[nu]":
        return { word: wordOnly, pos: "number" };
    }
  });

  console.log(objsOfWords);
  return objsOfWords;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const previewParagraph = document.querySelector(".madLibsPreview");
    const editParagraph = document.querySelector(".madLibsEdit");

    // word is : {word : "some word", pos: "adjective"}
    for (let word of processedStory) {
      if (word.word !== "." && word.word !== ",") {
        if (word.pos) {
          const input = document.createElement("input");
          const whiteSpace = document.createElement("span");
          whiteSpace.innerText = " ";
          input.setAttribute("maxlength", "20");
          input.setAttribute("type", "text");
          input.setAttribute("placeholder", `${word.pos}`);
          //whitespace before input in edit
          editParagraph.appendChild(whiteSpace);
          editParagraph.appendChild(input);

          const whiteSpace2 = document.createElement("span");
          whiteSpace2.innerText = " ";
          const output = document.createElement("mark");
          output.innerText += ` ${word.word}`;
          //whitespace before input in edit
          previewParagraph.appendChild(whiteSpace2);
          previewParagraph.appendChild(output);

          input.addEventListener("input", (e) => {
            output.innerHTML = input.value;
            //update the obj word in arrOfObj
            if (input.value) {
              input.setAttribute("class", "filled");
              // input.setAttribute("class", ".border border-0")
              word.word = input.value;

              output.setAttribute("class", "filled");
            } else {
              input.removeAttribute("class", "filled");
              output.removeAttribute("class", "filled");
              word.word = `${word.pos}`;
              output.innerText = `${word.word}`;
            }
          });
        } else {
          //normal word + space before word
          const p = document.createElement("span");
          p.innerText = ` ${word.word}`;
          previewParagraph.appendChild(p);
          const p2 = document.createElement("span");
          p2.innerText = ` ${word.word}`;
          editParagraph.appendChild(p2);
        }
      } else {
        //dot and comma with no space
        const p = document.createElement("span");
        p.innerText = `${word.word}`;
        previewParagraph.appendChild(p);

        const p2 = document.createElement("span");
        p2.innerText = `${word.word}`;
        editParagraph.appendChild(p2);
      }
    } // THE END OF THE LOOP

    //keypress event - next input
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          if (i === inputFields.length - 1) {
            inputFields[0].focus();
          } else {
            inputFields[i + 1].focus();
          }
        }
      });
    }

    //button save-load-reset
    const saveBtn = document.querySelector(".save");
    const loadBtn = document.querySelector(".load");
    const resetBtn = document.querySelector(".clear");
    const marks = document.querySelectorAll("mark");

    //initialize the toast
    let option = false;
    let toastElList = [].slice.call(document.querySelectorAll(".toast"));
    let toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl, option);
    });

    saveBtn.addEventListener("click", (e) => {
      let base = 0;
      for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value) {
          base++;
          const data = inputFields[i].value;
          localStorage.setItem(`inputNum${i}`, data);
          toastList[0].show();
        } else if (base === 0) {
          toastList[4].show();
        }
      }
    });

    loadBtn.addEventListener("click", (e) => {
      if (localStorage.length === 0) {
        toastList[3].show();
      } else {
        for (let i = 0; i < inputFields.length; i++) {
          const data = localStorage.getItem(`inputNum${i}`);
          if (data) {
            inputFields[i].value = data;
            marks[i].innerText = data;
            inputFields[i].setAttribute("class", "filled");
            marks[i].setAttribute("class", "filled");
          }
        }
        toastList[1].show();
      }
    });

    resetBtn.addEventListener("click", (e) => {
      for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
        marks[i].innerText = inputFields[i].placeholder;
        inputFields[i].removeAttribute("class", "filled");
        marks[i].removeAttribute("class", "filled");
      }

      localStorage.clear();
      toastList[2].show();
    });

    const music = document.querySelector("#music");
    const getStartedBtn = document.querySelector(".get-started");
    getStartedBtn.addEventListener("click", () => music.play());
  });
