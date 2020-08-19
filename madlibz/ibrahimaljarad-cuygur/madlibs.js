function parseStory(rawStory) {
        
    const myText = rawStory.split(' ');
    
    const myWords = [];
    const regex = /\[.\]/;
    for (let i = 0; i< myText.length; i++) {
            const currentWord = myText[i];
            const matches = currentWord.match(regex);
            
            if (matches == '[a]') {
                    const word = currentWord.replace('[a]', '');
                    myWords.push({ word, pos: 'adj' });
            }
            if (matches == '[n]') {
                    const word = currentWord.replace('[n]', ' ');
                    myWords.push({ word, pos: 'noun' });
            }
            if (matches == '[v]') {
                    const word = currentWord.replace('[v]', ' ');
                    myWords.push({ word, pos: 'verb' });
            }
            if (matches == null) {
                    const word = currentWord.replace(' ');
                    myWords.push({ word });
            }

            
    }
   

    return myWords; 
}


getRawStory()
    .then(parseStory)
    .then(processedStory => {
            const madLibsEdit = document.querySelector('.madLibsEdit');
            const madLibsPreview = document.querySelector('.madLibsPreview');

            for (let i = 0; i < processedStory.length; i++) {
                    if (!processedStory[i].pos) {
                            
                            let madLibsEditor = document.createElement('span');
                            let madLibsPreviewer = document.createElement('span');

                            let madLibsEditNode = document.createTextNode(` ${processedStory[i].word} `);
                            let madLibsPreviewNode= document.createTextNode(` ${processedStory[i].word} `);

                            madLibsEditor.appendChild(madLibsEditNode);
                            madLibsPreviewer.appendChild(madLibsPreviewNode);

                            madLibsEdit.appendChild(madLibsEditor);
                            madLibsPreview.appendChild(madLibsPreviewer);
                    }  else {
                            let span = document.createElement('span');
                              span.setAttribute('id', i);
                             madLibsPreview.appendChild(span);
                             let input = document.createElement('input');
                             input.setAttribute("maxlength", "15");
                             input.setAttribute('placeholder', `${processedStory[i].pos}`);
                             
                             input.addEventListener('input', e => {
                                    const spanSelector = document.getElementById(i);
                                    spanSelector.innerHTML = ` ${input.value} `;

                                    localStorage.setItem(i, input.value);
                            });
                            

                           madLibsEdit.appendChild(input);
                           let spanUpdate = document.getElementById(i);
                            spanUpdate.innerHTML = localStorage.getItem(i);

                            


                             
                    } 
            }
            
            jQuery.extend(jQuery.expr[':'], {
                focusable: function (el, index, selector) {
                    return $(el).is('a, button, :input, [tabindex]');
                }
            });

            $(document).on('keypress', 'input,select', function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    
                    let $canfocus = $(':focusable');
                    let index = $canfocus.index(document.activeElement) + 1;
                    if (index >= $canfocus.length) index = 0;
                    $canfocus.eq(index).focus();
                }
            });
            

    });


