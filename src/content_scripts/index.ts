///<reference path="../../node_modules/@types/jquery/index.d.ts" />
///<reference path="../../node_modules/@types/chrome/index.d.ts" />

import {detectUrl} from "./general/detectUrl";
import {URL} from "./general/url";

import {templateCreator} from './general/templateCreator';

$(document).ready(function () {

    //If this web page is GitHub run the script bellow:
    if (detectUrl.isGitHub()) {
        //Send a message to background and get the username:
        //@TODO: In background.ts username should save into database for easier access. A new class needed for user info
        //
        chrome.runtime.sendMessage({getCookie: "dotcom_user"}, function (response) {
            $.ajax({
                dataType: 'json',
                url: URL.api + URL.userReceivedEvents(response),
                success: function (result) {
                    $("#dashboard").find(".two-thirds").append(templateCreator.userReceivedEvents(result));
                }
            });

        });

    }
});
