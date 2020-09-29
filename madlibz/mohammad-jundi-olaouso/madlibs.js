function parseStory(rawStory) {
  let outputOfStory = []
  let noun = /n(?=])/;
  let verb = /v(?=])/;
  let adjective = /a(?=])/;
  let splitStory = rawStory.split(' ')

  for (let i = 0; i < splitStory.length; i++) {
    let wordSpliting = splitStory[i]
    let lastcharacter = wordSpliting[wordSpliting.length - 1]

    if (lastcharacter === "." || lastcharacter === ",") {
      wordSpliting = wordSpliting.slice(0, wordSpliting.length - 1)
    }

    if (noun.test(wordSpliting)) {
      let finalStory = wordSpliting.replace('[n]', ' ')
      outputOfStory.push({ word: finalStory, pos: 'noun' })
    } 
    else if (verb.test(wordSpliting)) {
      let finalStory = wordSpliting.replace('[v]', ' ')
      outputOfStory.push({ word: finalStory, pos: 'verb' })
    } 
    else if (adjective.test(wordSpliting)) {
      let finalStory = wordSpliting.replace('[a]', ' ')
      outputOfStory.push({ word: finalStory, pos: 'adjective' })
    } 
    else {
      outputOfStory.push({ word: wordSpliting })
    }

    if (lastcharacter === "." || lastcharacter === ",") {
      outputOfStory.push({ word: lastcharacter })
    }
  }
  return outputOfStory;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    let editStory = document.querySelector('.madLibsEdit');
    let previewStory = document.querySelector('.madLibsPreview');
    for (let wordObj of processedStory) {
      if (!wordObj.pos) {
        let text = document.createElement("span");
        text.innerText = ` ${wordObj.word}`;
        previewStory.appendChild(text);
        let textEdit = document.createElement("span");
        textEdit.innerText = ` ${wordObj.word}`;
        editStory.appendChild(textEdit);
        // editStory.innerHTML += wordObj.word + ' ';
        // previewStory.innerHTML += wordObj.word + ' ';
      } else {
        let input = document.createElement("input");
        input.setAttribute('placeholder', wordObj.pos);
        input.setAttribute('maxlength', 20);
        let review = document.createElement('span');
        review.innerText = ' ' + wordObj.pos + ' ';
        let space = document.createElement('span')
        space.innerText = ' ';
        editStory.appendChild(space);
        editStory.appendChild(input);
        previewStory.appendChild(review);
        input.oninput = function () {
          if (this.value) {
            review.innerText = ' ' + this.value + ' ';
          } else {
            review.innerText = ' ' + wordObj.pos + ' ';
          }
        };
      }
    }
    let inputs = document.getElementsByTagName("input")
    document.addEventListener('keyup', function (event) {
      if (event.keyCode == 13) {
        let textboxes = [...inputs]
        let currentBoxNumber = textboxes.findIndex(el => el === event.target)
        console.log(currentBoxNumber)
        if (textboxes[currentBoxNumber + 1] != null) {
          let nextBox = textboxes[currentBoxNumber + 1];
          nextBox.focus();
          //nextBox.select();
        } else {
          textboxes[0].focus();
        }
      }
    });
  });