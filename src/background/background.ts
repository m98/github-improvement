///<reference path="../../node_modules/@types/chrome/index.d.ts" />

//This just calls once the extension installed.
//chrome.tabs.create({"url": "http://google.com"});

//import {detectUrl} from '../content_scripts/lib/detectUrl';
//import {functions} from "../content_scripts/lib/functions";


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.cookies.get({"url": tab.url, "name": "dotcom_user"}, function (result: any) {
            //@TODO: Insert the username into Chrome local storage for easier access.
            console.log(result);
         });
    }
    //console.log(tabId, changeInfo, tab);
});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.cookies.get({"url": sender.tab.url, "name": request.getCookie}, function (result: any) {
            sendResponse(result.value);
        });

        return true;
    });

