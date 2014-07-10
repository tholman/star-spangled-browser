/* 
 *  America F Yeah
 *  - Initializer, injects the Americanizer script on new pages
 */

chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (tab.status !== "complete"){
        return;
    }

    chrome.tabs.executeScript(null, {"file": "./js/wordGifSoundAwesomeizer.js"});

});