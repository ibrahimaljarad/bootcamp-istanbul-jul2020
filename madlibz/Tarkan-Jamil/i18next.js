/**
 * detect the language and display the content on screen
 */

function displayContent() {
    i18next
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            debug: true,
            resources: {
                en: {
                    translation: {
                        "subtitle": "Build your own camping story!",
                        "start": "START HERE",
                        "preview": "PREVIEW",
                    }
                },
                tr: {
                    translation: {
                        "subtitle": "Kendi kamp hikayenizi oluşturun!",
                        "start": "BURADAN BAŞLAYIN",
                        "preview": "ÖNİZLEME",
                    }
                },
                ar: {
                    translation: {
                        "subtitle": "ألف قصة تخييم تدور أحداثها عنك!",
                        "start": "ابدأ من هنا",
                        "preview": "القصة",
                    }
                }
            }, function(err, t) {
                // init set content
                updateContent();
            }
        });
}

/**
 * update the content according the language
 * 
 * @param {string} lang
 *    language selector: 'en', 'tr', or 'ar'
 */

function updateContent(lang = "en") {
    updatePageElementContent();

    getRawStory(lang);
}

/**
 * change the language of the page
 */

function changeLang(lng) {
    
    i18next.changeLanguage(lng);
}

/**
 * update the content of all elements in the page
 */

function updatePageElementContent() {
    document.getElementById("subtitle").innerText = i18next.t("subtitle");
    document.getElementById("startHere").innerText = i18next.t("start");
    document.getElementById("preview").innerText = i18next.t("preview");
    
}

/**
 * change the page direction and update the content according to the language
 * choosen when the languageChanged event is triggered
 */
i18next.on('languageChanged', (lang) => {
    if (lang === "ar") 
      changeDirection('rtl');
    else
      changeDirection('ltr');


    updateContent(lang);
});

/**
 * change the direction of the page and all related paragraphs
 * 
 * @param {string} changeDirection
 *   page direction: 'rtl', or 'ltr'
 */
function changeDirection(direction){
  document.body.setAttribute("dir", direction);

  document.getElementById('edit-story').style.textAlign = 
    direction === 'rtl'? 'right': 'left';

  document.getElementById('preview-story').style.textAlign = 
    direction === 'rtl'? 'right': 'left';

  

  
}