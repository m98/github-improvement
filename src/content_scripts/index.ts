///<reference path="../../node_modules/@types/jquery/index.d.ts" />
///<reference path="../../node_modules/@types/chrome/index.d.ts" />

import {detectUrl} from "./lib/detectUrl"
import {githubApi} from "./lib/githubApi"

$(document).ready(function () {

    //If this web page is GitHub run the script bellow:
    if (detectUrl.currentDomainName('all') === 'github.com') {
        //Send a message to background and get the username:
        //@TODO: In background.ts username should save into database for easier access.
        //
        chrome.runtime.sendMessage({getCookie: "dotcom_user"}, function (response) {
            $.ajax({
                url: githubApi.api + githubApi.userReceivedEvents(response),
                success: function (result) {
                    $("#dashboard").append("<h1>" + result.length + "</h1>");
                }
            });

        });

    }
});
