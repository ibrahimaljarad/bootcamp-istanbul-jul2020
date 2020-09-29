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
import i18next from 'https://cdn.jsdelivr.net/gh/i18next/i18next/src/index.js'



function parseStory(rawStory) {
  // Your code here.
  let dot = /[.]/g;
  let comma = /[,] /g;
  let noun = /\[n\]/;
  let verb = /\[v\]/;
  let adj = /\[a\]/;

  let isim = /\[i\]/;
  let fiil = /\[f\]/;
  let sifat = /\[s\]/;

  const objArr = [];

  rawStory = rawStory.replace(dot, " .");
  rawStory = rawStory.replace(comma, " , ");
  let splitArr = rawStory.split(" ");
  splitArr.forEach(a => {
    if (noun.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "noun";
      objArr.push(obj);

    }
    else if (verb.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "verb";
      objArr.push(obj);
    }
    else if (adj.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "adj";
      objArr.push(obj);
    }
    else if (isim.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "isim";
      objArr.push(obj);
    }
    else if (fiil.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "fiil";
      objArr.push(obj);
    }
    else if (sifat.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "sifat";
      objArr.push(obj);
    }

    else {
      const obj = {};
      obj["word"] = a;
      objArr.push(obj);

    }
  })
  return objArr // This line is currently wrong :) - Now, it is correct :D
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
    madLibsEdit(processedStory);
    madLibsPreview();
    hotkeyEnter();
    getInputs();
    clearInputs();
    translate();
  });


function madLibsEdit(stories) {
  const edit = document.querySelector(".madLibsEdit");
  const p = document.createElement("p");
  const preview = document.querySelector(".madLibsPreview");
  const pre = document.createElement("p");
  preview.appendChild(pre);
  edit.appendChild(p);
  let inputCount = 0;
  let spanCount = 0;
  stories.forEach(story => {
    if ("pos" in story) {
      const input = document.createElement("input");
      input.setAttribute("placeholder", `${story.pos}`);
      input.id = `story-input${inputCount++}`;
      input.setAttribute("maxlength", "20");
      p.appendChild(input);
      const span = document.createElement("span");
      span.id = `input-val${spanCount++}`;
      span.innerText = "______";
      pre.appendChild(span);
    } else {
      p.innerHTML += " " + story.word + " ";
      pre.innerHTML += " " + story.word + " ";
    }
  })
}

function madLibsPreview() {
  const inputs = document.querySelectorAll("input").length;
  for (let i = 0; i < inputs; i++) {
    const input = document.querySelector(`#story-input${i}`);

    input.addEventListener("input", function (e) {
      localStorage.setItem(input.id, input.value);

      const span = document.querySelector(`#input-val${i}`);

      if (input.value) {
        span.innerHTML = input.value;
        input.setAttribute("class", "opacity");
      } else {
        span.innerHTML = "______"
        input.setAttribute("class", "no-opacity");
      }
    })
  }
}

function hotkeyEnter() {
  const inputs = document.querySelectorAll("input").length;
  for (let i = 0; i < inputs; i++) {
    const input = document.querySelector(`#story-input${i}`);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        if (i === inputs - 1) {
          document.querySelector(`#story-input0`).focus();
        }
        else {
          let digitRegex = /\d+/;
          const key = document.activeElement.id;
          let digit = parseInt(key.match(digitRegex)[0]);
          document.querySelector(`#story-input${digit + 1}`).focus();
        }
      }
    })
  }
}
function getInputs() {
  const inputs = document.querySelectorAll("input").length;
  for (let i = 0; i < inputs; i++) {
    const input = document.querySelector(`#story-input${i}`);
    const span = document.querySelector(`#input-val${i}`);
    input.value = localStorage.getItem(input.id);
    if (input.value) {
      span.innerText = localStorage.getItem(input.id);
    }
    if (input.value) {
      input.setAttribute("class", "opacity");
    }
  }
}
function clearInputs() {
  const button = document.querySelector("button");
  const inputs = document.querySelectorAll("input").length;

  button.addEventListener("click", function (e) {
    for (let i = 0; i < inputs; i++) {
      const input = document.querySelector(`#story-input${i}`);
      const span = document.querySelector(`#input-val${i}`)
      input.value = "";
      input.setAttribute("class", "no-opacity");
      span.innerText = "______";
    }
  })
  localStorage.clear();
}

function translate() {
  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          "key": "Alex[n] is an engineer[n] and she is a CIA agent[n] part-time. One day on the August fifth, she woke up feeling a bit strange[a]. She went to the bathroom[n] to take a shower[n]. When she got out of the shower, she heard that her phone[n] was ringing[v]. Her friend[n] from work was calling to tell her that she was needed[a] for the time-travel project[n] and she needed to bring the time-travel watch[n]. She got ready and got into her car[n]. On the way to work, she ate a sandwich[n]. While she was driving, she noticed a black car[n] was following her. She immediately[a] changed the direction to lose the car behind her. The car was out of sight, so, she thought that she lost the follower, but the car[n] appeared out of nowhere and crashed[v] her from the side. She hit her head[n] and lost consciousness[n]. Meanwhile, in the lab that she was working, the other engineers turned on the time-travel device for a test run. When she opened her eyes[n], she was in her bed[n], feeling a bit strange[a]. She looked at her phone[n], the date was August fifth."
          //getRawStory() // is there a way to use this func. here instead of the upper str ?
        }
      },
      tr: {
        translation: {
          "key": "Alex[i] bir mühendis[i] ve yarı-zamanlı bir CIA ajanı[i] olarak çalışıyordu. Bir gün, 5 Ağustos tarihinde, garip[s] bir his ile uyandı. Duş[i] almak için banyoya[i] gitti. Duştan çıkınca, telefonun[i] çaldığını[f] duydu. İşten arkadaşı[i], onun zamanda seyahat projesi[i] için gerekli[s] olduğunu ve zamanda seyahat saatini[i] getirmesi gerektiğini söylemek için aradı. Hazırlandı ve arabasına[i] bindi. İşe giderken, bir sandviç[i] yedi. Arabayı sürerken, siyah bir arabanın[i] onu takip ettiğini fark etti. Arkasındaki arabadan kurtulmak için hemen[s] yönünü değiştirdi. Araba görünürde olmadığı için, onu kaybettiğini sandı ama araba[i] beklemediği bir yerden fırladı ve ona yandan çarptı[f]. Kafasını[i] vurup bilincini[i] kaybetti. Bu sırada, çalıştığı laboratuvarda, diğer mühendisler zamanda seyahat cihazını test için çalıştırdı. Gözlerini[i] açtığında, içinde tuhaf[s] bir hisle, yatağında[i] yatıyordu. Telefonuna[i] baktığında, tarih 5 Ağustostu."
        }
      }
    }
  }, function (err, t) {
    const button = document.querySelector("#tr");
    const madLibsEdit = document.querySelector(".madLibsEdit");
    const madLibsPreview = document.querySelector(".madLibsPreview");
    let isTurkish = false;
    button.addEventListener("click", function (e) {
      if(button.innerText === "Türkçe"){
      madLibsEdit.innerHTML = "";
      madLibsPreview.innerHTML = "";
      changeLng("tr");
      isTurkish = true;
      updateContent(isTurkish);
      }
      else{
        madLibsEdit.innerHTML = "";
        madLibsPreview.innerHTML = "";
        changeLng("en")
        updateContent()
      }

     /* const enButton = document.querySelector("#en"); // needs some work here!
      enButton.addEventListener("click", function (e) {
        madLibsEdit.innerHTML = "";
        madLibsPreview.innerHTML = "";
        changeLng("en");
        updateContent();
      })*/
    });
  });
}
function updateContent(isTr) {
  let processedStory = parseStory(i18next.t('key'))
  function a(processedStory) {
    htmlElementCreate(isTr);
    madLibsEdit(processedStory);
    madLibsPreview();
    hotkeyEnter();
    getInputs();
    clearInputs();
    translate();
  }
  return a(processedStory)
}
function changeLng(lng) {
  i18next.changeLanguage(lng);
}
function htmlElementCreate(isTr) {
  const madLibsEdit = document.querySelector(".madLibsEdit");
  const madLibsPreview = document.querySelector(".madLibsPreview");
  const h3 = document.createElement("h3");
  const h3Pre = document.createElement("h3");
  const clearButton = document.createElement("button");
  const translateButton = document.createElement("button");
  translateButton.setAttribute("id", "tr");
  if(isTr){
    translateButton.innerText = "English";
    clearButton.innerText = "Temizle";
    h3.innerText = "Hamster Tekeri";
    h3Pre.innerText = "Hamster Tekeri";
   
  }
  else{
    translateButton.innerText = "Türkçe";
    clearButton.innerText = "Clear";
    h3.innerText = "Hamster Wheel";
    h3Pre.innerText = "Hamster Wheel";
    
  }
  
  madLibsEdit.appendChild(h3);
  madLibsEdit.appendChild(clearButton);
  madLibsEdit.appendChild(translateButton);
  madLibsPreview.appendChild(h3Pre);

}


