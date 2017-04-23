///<reference path="../../node_modules/@types/chrome/index.d.ts" />

//This just calls once the extension installed.
//chrome.tabs.create({"url": "http://google.com"});

import {detectUrl} from '../content_scripts/lib/detectUrl';

chrome.tabs.onUpdated.addListener(function () {

    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {

        // since the result of the tabs.query just will return active tab
        // the return variable should only have one entry, and it's the active tab
        let activeTab = arrayOfTabs[0];


        if (detectUrl.getUrlInfo(activeTab.url) === 'github.com') {

        }

    });

});

/*
BLOCK ALL RequeSTS
chrome.webRequest.onBeforeRequest.addListener(
    function () {
        return {cancel: true};
    },
    {
        urls: ["<all_urls>"], // Change this to a more specific pattern
        types: ["script"]
    },
    ["blocking"]
);
*/