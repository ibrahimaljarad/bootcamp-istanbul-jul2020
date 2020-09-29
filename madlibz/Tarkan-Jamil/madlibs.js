/**
 * wait until page is loaded and then display content
 */
document.addEventListener("DOMContentLoaded", () => {
    displayContent();
});

/**
 * fetches text file,applies RE , puts words together, puts it on screen,
 * brings back saved progress, catches error
 *
 * @param {srting} lang
 *   sets the language of the story to fetch: 'en' default, 'tr', or 'ar'
 */
function getRawStory(lang = "en") {
    fetch(`./story-${lang}.txt`)
        .then((res) => res.text())
        .then((text) => parseWords(text, lang))
        .then((storyWords) => processedStory(storyWords))
        .then((v1) => renderStory(v1))
        .then(showStoredValues)
        .then(addEventListeners)
        .catch((err) => console.log(err));
}

/**
 * applies RE to txt file, returns an array made of words and punctuation
 *
 * @param {string} story
 *   story to be parsed
 *
 * @param {string} lang
 *   story language: 'en', 'tr', or 'ar'
 *
 * @return {array}
 *   words of the story passed, each word in oject
 */
function parseWords(story, lang) {
    const GAP_PATTERN = /[\w\u0600-\u06FF]+\[[\w\u0600-\u06FF]+\]/giu;
    const WORDS_PATTERN = /[\.,;?!()]|[\w\u0600-\u06FF]+\[[\w\u0600-\u06FF]+\]|([a-zA-Z0-9\u0600-\u06FF'öçiüşığĞIŞÖÇİÜÖ])+/giu;

    const words = story.match(WORDS_PATTERN);
    const parsedWords = [];

    for (const word of words) {
        const wordObj = {};

        if (word.match(GAP_PATTERN)) {
            const wordParts = word.match(/[\w\u0600-\u06FF]+/giu); // seperates word and [v,a,n]
            wordObj["word"] = wordParts[0];

            if (lang === "en") {
                switch (wordParts[1]) {
                    case "n":
                        wordObj["pos"] = "noun";
                        break;
                    case "v":
                        wordObj["pos"] = "verb";
                        break;
                    case "a":
                        wordObj["pos"] = "adjective";
                        break;
                    case "pn":
                        wordObj["pos"] = "plural-noun";
                        break;
                    default:
                        wordObj["pos"] = "unknown";
                }
            } else if (lang === "tr") {
                switch (wordParts[1]) {
                    case "n":
                        wordObj["pos"] = "isim";
                        break;
                    case "v":
                        wordObj["pos"] = "fiil";
                        break;
                    case "a":
                        wordObj["pos"] = "sıfat";
                        break;
                    case "pn":
                        wordObj["pos"] = "çoğul isim";
                        break;
                    default:
                        wordObj["pos"] = "unknown";
                }
            } else if (lang === "ar") {
                switch (wordParts[1]) {
                    case "س":
                        wordObj["pos"] = "اسم";
                        break;
                    case "ف":
                        wordObj["pos"] = "فعل";
                        break;
                    case "ص":
                        wordObj["pos"] = "صفة";
                        break;
                    case "ج":
                        wordObj["pos"] = "اسم جمع";
                        break;
                    default:
                        wordObj["pos"] = "غير معروف";
                }
            }
        } else {
            wordObj["word"] = word;
        }

        parsedWords.push(wordObj);
    }

    return parsedWords;
}
/**
 * creates editable and preview versions of text
 *
 * @param {array} storyWordsArr
 *   array of objects of the parsed story words
 *
 * @return {object}
 *   object with two properties, edit and preview
 */
function processedStory(storyWordsArr) {
    const PUNTUATION_MARKS_PATTERN = /[\.,;?!()]/gi;

    let inputsCounter = 0; // edit gap1 2 etc...
    return storyWordsArr.reduce(
        (acc, cur) => {
            let copyOfAcc = acc;
            if ("pos" in cur) {
                inputsCounter++;
                copyOfAcc.edit += inputElement(cur.pos, inputsCounter);
                copyOfAcc.preview += spanElement(cur.pos, inputsCounter);
            } else if (PUNTUATION_MARKS_PATTERN.test(cur.word)) {
                copyOfAcc.edit = `${copyOfAcc.edit.trim()}${cur.word} `;
                copyOfAcc.preview = `${copyOfAcc.preview.trim()}${cur.word} `;
            } else {
                copyOfAcc.edit += `${cur.word} `;
                copyOfAcc.preview += `${cur.word} `;
            }

            return copyOfAcc;
        },
        { edit: ``, preview: `` }
    );
}

/**
 * takes in object and puts content of preview property to preview div
 * and content of edit property to edit div
 *
 * @param {object} htmlStory
 *   the story to be displayed on screen
 */
function renderStory(htmlStory) {
    const editDiv = document.getElementById("edit-story");
    const previewDiv = document.getElementById("preview-story");
    editDiv.innerHTML = htmlStory.edit;
    previewDiv.innerHTML = htmlStory.preview;
}

/**
 *  adds matching animations, live update, enter key functionality, sets background
 */
function addEventListeners() {
    const editGaps = document.getElementsByClassName("edit-gaps");
    const prevGaps = document.getElementsByClassName("preview-gap");
    const audio = document.querySelector("audio");
    const vol = document.getElementById("volume");
    const mute = document.getElementById("mute");

    for (const eachEditGap of editGaps) {
        eachEditGap.addEventListener("keyup", (evt) => {
            const inputID = evt.target.id;
            const spanID = inputID.replace("edit", "prev");
            const targetSpan = document.getElementById(spanID);

            if (evt.keyCode === 13) {
                const nodeArr = Array.from(editGaps);
                let curIndex = nodeArr.indexOf(eachEditGap); 
                let target = "";

                if (curIndex === nodeArr.length - 1) curIndex = 0;
                else curIndex++;

                target = editGaps[curIndex];
                target.focus();
            } else {
                targetSpan.value = evt.target.value;
                window.localStorage.setItem(inputID, evt.target.value);

                if (eachEditGap.value === "") {
                    targetSpan.value = "";
                }
            }
        });

        eachEditGap.addEventListener("keyup", (e) => {
            setBackground(eachEditGap);
            checkAndSetBackgrounds(prevGaps);
        });
    }
    /*
     * Provides volume control
     */
    vol.addEventListener("change", (e) => {
        audio.volume = e.currentTarget.value / 100;
    });
    /*
     * Provides mute function
     */
    mute.addEventListener("click", (e) => {
        if (audio.volume === 0) {
            audio.volume = 0.8;
            /* not muted icon */
            mute.innerHTML = `<svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-volume-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04z"/>
<path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
<path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
<path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"/>
</svg>`;
        } else {
            audio.volume = 0;
            /* muted icon */
            mute.innerHTML = `<svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-volume-mute" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708l4-4a.5.5 0 0 1 .708 0z"/>
<path fill-rule="evenodd" d="M9.146 5.646a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0z"/>
</svg>`;
        }
    });
}

/**
 *  sets background of an element
 */
function setBackground(el) {
    if (el.value !== "" && el.classList.contains("edit-gaps")) {
        el.style.background = "#c09878";
        el.style.border = "solid 1px rgba(0,0,0,0)";
        el.style.borderRadius = "10px";
        el.style.color="white";
    } else if(el.classList.contains("edit-gaps")) {
        el.style.background = "rgba(255,255,255,1)";
        el.style.borderBottom = "solid 1px white";
        // el.style.borderRadius = "1px";
        el.style.color="black";
    }
}

/**
 *  sets background of an html collection
 */
function checkAndSetBackgrounds(htmlColl) {
    for (const element of htmlColl) {
        setBackground(element);
    }
}

/**
 *  creates input element
 */
function inputElement(pos, counter) {
    return `
  <input maxlength="20" id="edit-${
      pos + counter
  }" class="edit-gaps text-center" type="text" placeholder="${pos}" tabindex="1">
`;
}

/**
 *  creates input preview
 */
function spanElement(pos, counter) {
    return `
  <input type="text" id="prev-${
      pos + counter
  }" class="preview-gap text-center" value="" placeholder='${pos}' readonly tabindex="-1">
`;
}

/**
 * reflects saved progress on screen and sets input and preview
 * background accordingly
 */
function showStoredValues() {
    const editGaps = document.getElementsByClassName("edit-gaps");
    const prevGaps = document.getElementsByClassName("preview-gap");

    for (const gap of editGaps) {
        const inputID = gap.id;
        const spanID = inputID.replace("edit", "prev");

        targetSpan = document.getElementById(spanID);
        targetSpan.value = window.localStorage.getItem(inputID)
            ? window.localStorage.getItem(inputID)
            : targetSpan.value;
//if there is a value in local storage targetspan value will be equal to local storage value else it will be equal to itself which is empty.
        gap.value = window.localStorage.getItem(inputID)
            ? window.localStorage.getItem(inputID)
            : gap.value;
        checkAndSetBackgrounds(editGaps);
        checkAndSetBackgrounds(prevGaps);
    }
}
