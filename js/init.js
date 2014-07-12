/* 
 *  Star Spangled Browser
 *  - Initializer, injects the wordGifSoundAwesomeizer js & css on the new page.
 */

chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (tab.status !== "complete"){
        return;
    }

    chrome.tabs.executeScript( null, {"file" : "./js/wordGifSoundAwesomeizer.js"});
    // chrome.tabs.insertCSS(     null, {"file" : "./css/styles.css" });
});