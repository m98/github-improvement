(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.githubEx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var detectUrl = function () {
    function detectUrl() {}
    detectUrl.isGitHub = function () {
        return this.currentDomainName('all') === 'github.com';
    };
    detectUrl.currentDomainName = function (type) {
        var currentLocation = window.location.hostname;
        if (type === 'all') {
            return currentLocation;
        } else if (type === 'domain') {
            var regEx = /[.]com|www|[https://]|[http://]/g;
            //This regex will remove ".com" or "www" from hostname and at least for "www.github.com", will return "github"
            return currentLocation.replace(regEx, "");
        }
    };
    detectUrl.getUrlInfo = function (url, type) {
        if (type === void 0) {
            type = "domain";
        }
        if (type === 'domain') {
            url = url.split('?')[0];
            if (url.split('.').length === 3) {
                url = url.split('.')[1];
            } else if (url.split('.').length == 2) {
                url = url.split('.')[0];
            }
            var regEx = /[.]com|www|https|http|:|\//g;
            return url.replace(regEx, "");
        } else if (type === 'pure') {
            //pure type will return the domain-Ex: https://www.google.com?q=something => www.google.com
            url = url.split("?")[0]; //First remove all query strings.
            var regEx = /https|http|:|\/\//g;
            url = url.replace(regEx, "");
            return url.split('/')[0];
        }
    };
    return detectUrl;
}();
exports.detectUrl = detectUrl;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions = function () {
    function functions() {}
    //here we will define simple and public/general functions that we might need them constantly
    functions.getCookie = function (cname) {
        //The function source: https://www.w3schools.com/js/js_cookies.asp
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    functions.createLink = function (url, title, wrapWith) {
        var wrapElement = [{ start: '', end: '' }];
        if (wrapWith) {
            wrapElement['start'] = '<' + wrapWith + '>';
            wrapElement['end'] = '</' + wrapWith + '>';
        }
        return '<a href="' + url + '">' + wrapElement['start'] + title + wrapElement['end'] + '</a>';
    };
    return functions;
}();
exports.functions = functions;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by kermani on 30/04/2017.
 */
var icons = function () {
    function icons() {}
    return icons;
}();
//Icons used in GitHub first page (received events):
icons.star = '<svg aria-label="Watch" class="octicon octicon-star dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>';
icons.fork = '<svg aria-label="Fork" class="octicon octicon-git-branch dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>';
icons.member = '<svg aria-label="Member" class="octicon octicon-person dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 14.002a.998.998 0 0 1-.998.998H1.001A1 1 0 0 1 0 13.999V13c0-2.633 4-4 4-4s.229-.409 0-1c-.841-.62-.944-1.59-1-4 .173-2.413 1.867-3 3-3s2.827.586 3 3c-.056 2.41-.159 3.38-1 4-.229.59 0 1 0 1s4 1.367 4 4v1.002z"></path></svg>';
icons.create = '<svg aria-label="Create" class="octicon octicon-repo dashboard-event-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>';
exports.icons = icons;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var icons_1 = require("./icons");
var functions_1 = require("./functions");
var templateCreator = function () {
    function templateCreator() {}
    templateCreator.userReceivedEvents = function (data) {
        //API doc: https://developer.github.com/v3/activity/events/types/
        var HTMLTemplate = '<div class="received-events">';
        for (var i = 0; i < data.length; i++) {
            var currentIndex = data[i];
            HTMLTemplate += '<div>' + '<a href="https://www.github.com/' + currentIndex.actor.login + '">' + '<img src="' + currentIndex.actor.avatar_url + '?v=3&s=40"/>' + '<span>' + currentIndex.actor.display_login + '</span>' + '</a>';
            if (currentIndex.type === 'WatchEvent') {
                HTMLTemplate += icons_1.icons.star;
                HTMLTemplate += '';
            } else if (currentIndex.type === 'ForkEvent') {
                HTMLTemplate += icons_1.icons.fork;
                HTMLTemplate += functions_1.functions.createLink('https://www.github.com/', currentIndex.repo.name, "span");
            } else if (currentIndex.type === 'MemberEvent') {} else if (currentIndex.type === '') HTMLTemplate += '</div>';
        }
        HTMLTemplate += '</div>'; //.received-events div
        return HTMLTemplate;
    };
    return templateCreator;
}();
exports.templateCreator = templateCreator;

},{"./functions":2,"./icons":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var URL = function () {
    function URL() {}
    return URL;
}();
//List of URL(s) we are going to use in the app, it's easier to access all URLs from one file:
URL.api = "https://api.github.com/";
URL.userReceivedEvents = function (username) {
    if (username === void 0) {
        username = functions_1.functions.getCookie('dotcom_user');
    }
    if (!username) {
        username = functions_1.functions.getCookie('dotcom_user');
    }
    //return user received events URL.  Ex: https://api.github.com/users/m98/received_events
    return "users/" + username + "/received_events";
};
exports.URL = URL;

},{"./functions":2}],6:[function(require,module,exports){
///<reference path="../../node_modules/@types/jquery/index.d.ts" />
///<reference path="../../node_modules/@types/chrome/index.d.ts" />
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var detectUrl_1 = require("./general/detectUrl");
var url_1 = require("./general/url");
var templateCreator_1 = require("./general/templateCreator");
$(document).ready(function () {
    //If this web page is GitHub run the script bellow:
    if (detectUrl_1.detectUrl.isGitHub()) {
        //Send a message to background and get the username:
        //@TODO: In background.ts username should save into database for easier access. A new class needed for user info
        //
        chrome.runtime.sendMessage({ getCookie: "dotcom_user" }, function (response) {
            $.ajax({
                dataType: 'json',
                url: url_1.URL.api + url_1.URL.userReceivedEvents(response),
                success: function success(result) {
                    $("#dashboard").find(".two-thirds").append(templateCreator_1.templateCreator.userReceivedEvents(result));
                }
            });
        });
    }
});

},{"./general/detectUrl":1,"./general/templateCreator":4,"./general/url":5}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udGVudF9zY3JpcHRzL2dlbmVyYWwvZGV0ZWN0VXJsLnRzIiwic3JjL2NvbnRlbnRfc2NyaXB0cy9nZW5lcmFsL2Z1bmN0aW9ucy50cyIsInNyYy9jb250ZW50X3NjcmlwdHMvZ2VuZXJhbC9pY29ucy50cyIsInNyYy9jb250ZW50X3NjcmlwdHMvZ2VuZXJhbC90ZW1wbGF0ZUNyZWF0b3IudHMiLCJzcmMvY29udGVudF9zY3JpcHRzL2dlbmVyYWwvdXJsLnRzIiwic3JjL2NvbnRlbnRfc2NyaXB0cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBO0FBQUEseUJBc0NBLENBQUM7QUFyQ1UsY0FBUSxXQUFmO0FBQ0ksQUFBTSxlQUFDLEFBQUksS0FBQyxBQUFpQixrQkFBQyxBQUFLLEFBQUMsV0FBSyxBQUFZLEFBQUMsQUFDMUQ7QUFBQztBQUVNLGNBQWlCLG9CQUF4QixVQUF5QixBQUFZO0FBQ2pDLFlBQUksQUFBZSxrQkFBRyxBQUFNLE9BQUMsQUFBUSxTQUFDLEFBQVEsQUFBQztBQUMvQyxBQUFFLEFBQUMsWUFBQyxBQUFJLFNBQUssQUFBSyxBQUFDLE9BQUMsQUFBQztBQUNqQixBQUFNLG1CQUFDLEFBQWUsQUFBQyxBQUMzQjtBQUFDLEFBQUMsQUFBSSxlQUFDLEFBQUUsQUFBQyxJQUFDLEFBQUksU0FBSyxBQUFRLEFBQUMsVUFBQyxBQUFDO0FBQzNCLGdCQUFJLEFBQUssUUFBVyxBQUFrQyxBQUFDO0FBQ3ZELEFBQThHO0FBQzlHLEFBQU0sbUJBQUMsQUFBZSxnQkFBQyxBQUFPLFFBQUMsQUFBSyxPQUFFLEFBQUUsQUFBQyxBQUM3QztBQUFDLEFBRUw7QUFBQztBQUVNLGNBQVUsYUFBakIsVUFBa0IsQUFBVyxLQUFFLEFBQXVCO0FBQXZCLDZCQUFBO0FBQUEsbUJBQXVCOztBQUNsRCxBQUFFLEFBQUMsWUFBQyxBQUFJLFNBQUssQUFB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QUM7QUFDVixBQUFRLG1CQUFDLFlBQVMsVUFBQyxBQUFTLFVBQUMsQUFBYSxBQUFDLEFBQUMsQUFDaEQ7QUFBQztBQUNELEFBQXdGO0FBQ3hGLEFBQU0sV0FBQyxBQUFRLFdBQUcsQUFBUSxXQUFHLEFBQWtCLEFBQUMsQUFDcEQ7QUFBQztBQVZRLGNBQUc7OztBQ0RoQixBQUFtRTtBQUNuRSxBQUFtRTs7OztBQUVuRSwwQkFBOEM7QUFDOUMsb0JBQWtDO0FBRWxDLGdDQUEwRDtBQUUxRCxBQUFDLEVBQUMsQUFBUSxBQUFDLFVBQUMsQUFBSyxNQUFDO0FBRWQsQUFBbUQ7QUFDbkQsQUFBRSxBQUFDLFFBQUMsWUFBUyxVQUFDLEFBQVEsQUFBRSxBQUFDLFlBQUMsQUFBQztBQUN2QixBQUFvRDtBQUNwRCxBQUFnSDtBQUNoSCxBQUFFO0FBQ0YsQUFBTSxlQUFDLEFBQU8sUUFBQyxBQUFXLFlBQUMsRUFBQyxBQUFTLFdBQUUsQUFBYSxBQUFDLGlCQUFFLFVBQVUsQUFBUTtBQUNyRSxBQUFDLGNBQUMsQUFBSTtBQUNGLEFBQVEsMEJBQUUsQUFBTTtBQUNoQixBQUFHLHFCQUFFLE1BQUcsSUFBQyxBQUFHLE1BQUcsTUFBRyxJQUFDLEFBQWtCLG1CQUFDLEFBQVEsQUFBQztBQUMvQyxBQUFPLHlCQUFFLGlCQUFVLEFBQU07QUFDckIsQUFBQyxzQkFBQyxBQUFZLEFBQUMsY0FBQyxBQUFJLEtBQUMsQUFBYSxBQUFDLGVBQUMsQUFBTSxPQUFDLGtCQUFlLGdCQUFDLEFBQWtCLG1CQUFDLEFBQU0sQUFBQyxBQUFDLEFBQUMsQUFDM0Y7QUFBQyxBQUNKLEFBQUMsQUFBQyxBQUVQO0FBUlc7QUFRVixBQUFDLEFBQUMsQUFFUDtBQUFDLEFBQ0w7QUFBQyxBQUFDLEFBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIGRldGVjdFVybCB7XHJcbiAgICBzdGF0aWMgaXNHaXRIdWIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudERvbWFpbk5hbWUoJ2FsbCcpID09PSAnZ2l0aHViLmNvbSc7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGN1cnJlbnREb21haW5OYW1lKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjdXJyZW50TG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50TG9jYXRpb247XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZG9tYWluJykge1xyXG4gICAgICAgICAgICBsZXQgcmVnRXg6IFJlZ0V4cCA9IC9bLl1jb218d3d3fFtodHRwczovL118W2h0dHA6Ly9dL2c7XHJcbiAgICAgICAgICAgIC8vVGhpcyByZWdleCB3aWxsIHJlbW92ZSBcIi5jb21cIiBvciBcInd3d1wiIGZyb20gaG9zdG5hbWUgYW5kIGF0IGxlYXN0IGZvciBcInd3dy5naXRodWIuY29tXCIsIHdpbGwgcmV0dXJuIFwiZ2l0aHViXCJcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRMb2NhdGlvbi5yZXBsYWNlKHJlZ0V4LCBcIlwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFVybEluZm8odXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZyA9IFwiZG9tYWluXCIpIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RvbWFpbicpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsLnNwbGl0KCc/JylbMF07XHJcbiAgICAgICAgICAgIGlmICh1cmwuc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVybC5zcGxpdCgnLicpLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJy4nKVswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlZ0V4ID0gL1suXWNvbXx3d3d8aHR0cHN8aHR0cHw6fFxcLy9nO1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UocmVnRXgsIFwiXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwdXJlJykge1xyXG4gICAgICAgICAgICAvL3B1cmUgdHlwZSB3aWxsIHJldHVybiB0aGUgZG9tYWluLUV4OiBodHRwczovL3d3dy5nb29nbGUuY29tP3E9c29tZXRoaW5nID0+IHd3dy5nb29nbGUuY29tXHJcbiAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdChcIj9cIilbMF07IC8vRmlyc3QgcmVtb3ZlIGFsbCBxdWVyeSBzdHJpbmdzLlxyXG4gICAgICAgICAgICBsZXQgcmVnRXggPSAvaHR0cHN8aHR0cHw6fFxcL1xcLy9nO1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShyZWdFeCwgXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGNsYXNzIGZ1bmN0aW9ucyB7XHJcbiAgICAvL2hlcmUgd2Ugd2lsbCBkZWZpbmUgc2ltcGxlIGFuZCBwdWJsaWMvZ2VuZXJhbCBmdW5jdGlvbnMgdGhhdCB3ZSBtaWdodCBuZWVkIHRoZW0gY29uc3RhbnRseVxyXG4gICAgc3RhdGljIGdldENvb2tpZShjbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAvL1RoZSBmdW5jdGlvbiBzb3VyY2U6IGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanMvanNfY29va2llcy5hc3BcclxuICAgICAgICBsZXQgbmFtZSA9IGNuYW1lICsgXCI9XCI7XHJcbiAgICAgICAgbGV0IGRlY29kZWRDb29raWUgPSBkZWNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llKTtcclxuICAgICAgICBsZXQgY2EgPSBkZWNvZGVkQ29va2llLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYyA9IGNhW2ldO1xyXG4gICAgICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlTGluayh1cmw6IHN0cmluZywgdGl0bGU6IHN0cmluZywgd3JhcFdpdGg6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB3cmFwRWxlbWVudDogYW55ID0gW3tzdGFydDogJycsIGVuZDogJyd9XTtcclxuICAgICAgICBpZiAod3JhcFdpdGgpIHtcclxuICAgICAgICAgICAgd3JhcEVsZW1lbnRbJ3N0YXJ0J10gPSAnPCcgKyB3cmFwV2l0aCArICc+JztcclxuICAgICAgICAgICAgd3JhcEVsZW1lbnRbJ2VuZCddID0gJzwvJyArIHdyYXBXaXRoICsgJz4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJzxhIGhyZWY9XCInICsgdXJsICsgJ1wiPicgKyB3cmFwRWxlbWVudFsnc3RhcnQnXSArIHRpdGxlICsgd3JhcEVsZW1lbnRbJ2VuZCddICsgJzwvYT4nO1xyXG5cclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGtlcm1hbmkgb24gMzAvMDQvMjAxNy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBpY29ucyB7XHJcbiAgICAvL0ljb25zIHVzZWQgaW4gR2l0SHViIGZpcnN0IHBhZ2UgKHJlY2VpdmVkIGV2ZW50cyk6XHJcbiAgICBzdGF0aWMgc3Rhcjogc3RyaW5nID0gJzxzdmcgYXJpYS1sYWJlbD1cIldhdGNoXCIgY2xhc3M9XCJvY3RpY29uIG9jdGljb24tc3RhciBkYXNoYm9hcmQtZXZlbnQtaWNvblwiIGhlaWdodD1cIjE2XCIgcm9sZT1cImltZ1wiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDE0IDE2XCIgd2lkdGg9XCIxNFwiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTE0IDZsLTQuOS0uNjRMNyAxIDQuOSA1LjM2IDAgNmwzLjYgMy4yNkwyLjY3IDE0IDcgMTEuNjcgMTEuMzMgMTRsLS45My00Ljc0elwiPjwvcGF0aD48L3N2Zz4nO1xyXG5cclxuICAgIHN0YXRpYyBmb3JrOiBzdHJpbmcgPSAnPHN2ZyBhcmlhLWxhYmVsPVwiRm9ya1wiIGNsYXNzPVwib2N0aWNvbiBvY3RpY29uLWdpdC1icmFuY2ggZGFzaGJvYXJkLWV2ZW50LWljb25cIiBoZWlnaHQ9XCIxNlwiIHJvbGU9XCJpbWdcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCAxMCAxNlwiIHdpZHRoPVwiMTBcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMCA1YzAtMS4xMS0uODktMi0yLTJhMS45OTMgMS45OTMgMCAwIDAtMSAzLjcydi4zYy0uMDIuNTItLjIzLjk4LS42MyAxLjM4LS40LjQtLjg2LjYxLTEuMzguNjMtLjgzLjAyLTEuNDguMTYtMiAuNDVWNC43MmExLjk5MyAxLjk5MyAwIDAgMC0xLTMuNzJDLjg4IDEgMCAxLjg5IDAgM2EyIDIgMCAwIDAgMSAxLjcydjYuNTZjLS41OS4zNS0xIC45OS0xIDEuNzIgMCAxLjExLjg5IDIgMiAyIDEuMTEgMCAyLS44OSAyLTIgMC0uNTMtLjItMS0uNTMtMS4zNi4wOS0uMDYuNDgtLjQxLjU5LS40Ny4yNS0uMTEuNTYtLjE3Ljk0LS4xNyAxLjA1LS4wNSAxLjk1LS40NSAyLjc1LTEuMjVTOC45NSA3Ljc3IDkgNi43M2gtLjAyQzkuNTkgNi4zNyAxMCA1LjczIDEwIDV6TTIgMS44Yy42NiAwIDEuMi41NSAxLjIgMS4yIDAgLjY1LS41NSAxLjItMS4yIDEuMkMxLjM1IDQuMi44IDMuNjUuOCAzYzAtLjY1LjU1LTEuMiAxLjItMS4yem0wIDEyLjQxYy0uNjYgMC0xLjItLjU1LTEuMi0xLjIgMC0uNjUuNTUtMS4yIDEuMi0xLjIuNjUgMCAxLjIuNTUgMS4yIDEuMiAwIC42NS0uNTUgMS4yLTEuMiAxLjJ6bTYtOGMtLjY2IDAtMS4yLS41NS0xLjItMS4yIDAtLjY1LjU1LTEuMiAxLjItMS4yLjY1IDAgMS4yLjU1IDEuMiAxLjIgMCAuNjUtLjU1IDEuMi0xLjIgMS4yelwiPjwvcGF0aD48L3N2Zz4nXHJcblxyXG4gICAgc3RhdGljIG1lbWJlcjogc3RyaW5nID0gJzxzdmcgYXJpYS1sYWJlbD1cIk1lbWJlclwiIGNsYXNzPVwib2N0aWNvbiBvY3RpY29uLXBlcnNvbiBkYXNoYm9hcmQtZXZlbnQtaWNvblwiIGhlaWdodD1cIjE2XCIgcm9sZT1cImltZ1wiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDEyIDE2XCIgd2lkdGg9XCIxMlwiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDE0LjAwMmEuOTk4Ljk5OCAwIDAgMS0uOTk4Ljk5OEgxLjAwMUExIDEgMCAwIDEgMCAxMy45OTlWMTNjMC0yLjYzMyA0LTQgNC00cy4yMjktLjQwOSAwLTFjLS44NDEtLjYyLS45NDQtMS41OS0xLTQgLjE3My0yLjQxMyAxLjg2Ny0zIDMtM3MyLjgyNy41ODYgMyAzYy0uMDU2IDIuNDEtLjE1OSAzLjM4LTEgNC0uMjI5LjU5IDAgMSAwIDFzNCAxLjM2NyA0IDR2MS4wMDJ6XCI+PC9wYXRoPjwvc3ZnPic7XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZTogc3RyaW5nID0gJzxzdmcgYXJpYS1sYWJlbD1cIkNyZWF0ZVwiIGNsYXNzPVwib2N0aWNvbiBvY3RpY29uLXJlcG8gZGFzaGJvYXJkLWV2ZW50LWljb25cIiBoZWlnaHQ9XCIxNlwiIHJvbGU9XCJpbWdcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCAxMiAxNlwiIHdpZHRoPVwiMTJcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk00IDlIM1Y4aDF2MXptMC0zSDN2MWgxVjZ6bTAtMkgzdjFoMVY0em0wLTJIM3YxaDFWMnptOC0xdjEyYzAgLjU1LS40NSAxLTEgMUg2djJsLTEuNS0xLjVMMyAxNnYtMkgxYy0uNTUgMC0xLS40NS0xLTFWMWMwLS41NS40NS0xIDEtMWgxMGMuNTUgMCAxIC40NSAxIDF6bS0xIDEwSDF2Mmgydi0xaDN2MWg1di0yem0wLTEwSDJ2OWg5VjF6XCI+PC9wYXRoPjwvc3ZnPic7XHJcbn0iLCJpbXBvcnQge2ljb25zfSBmcm9tICcuL2ljb25zJztcclxuaW1wb3J0IHtmdW5jdGlvbnN9IGZyb20gJy4vZnVuY3Rpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyB0ZW1wbGF0ZUNyZWF0b3Ige1xyXG4gICAgc3RhdGljIHVzZXJSZWNlaXZlZEV2ZW50cyhkYXRhOiBhbnkpIHtcclxuICAgICAgICAvL0FQSSBkb2M6IGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvZXZlbnRzL3R5cGVzL1xyXG4gICAgICAgIGxldCBIVE1MVGVtcGxhdGU6IHN0cmluZyA9ICc8ZGl2IGNsYXNzPVwicmVjZWl2ZWQtZXZlbnRzXCI+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRJbmRleDogYW55ID0gZGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgIEhUTUxUZW1wbGF0ZSArPVxyXG4gICAgICAgICAgICAgICAgJzxkaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vd3d3LmdpdGh1Yi5jb20vJyArIGN1cnJlbnRJbmRleC5hY3Rvci5sb2dpbiArICdcIj4nICtcclxuICAgICAgICAgICAgICAgICc8aW1nIHNyYz1cIicgKyBjdXJyZW50SW5kZXguYWN0b3IuYXZhdGFyX3VybCArICc/dj0zJnM9NDBcIi8+JyArXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4+JyArIGN1cnJlbnRJbmRleC5hY3Rvci5kaXNwbGF5X2xvZ2luICsgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICc8L2E+JztcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50SW5kZXgudHlwZSA9PT0gJ1dhdGNoRXZlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICBIVE1MVGVtcGxhdGUgKz0gaWNvbnMuc3RhcjtcclxuICAgICAgICAgICAgICAgIEhUTUxUZW1wbGF0ZSArPSAnJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleC50eXBlID09PSAnRm9ya0V2ZW50Jykge1xyXG4gICAgICAgICAgICAgICAgSFRNTFRlbXBsYXRlICs9IGljb25zLmZvcms7XHJcbiAgICAgICAgICAgICAgICBIVE1MVGVtcGxhdGUgKz0gZnVuY3Rpb25zLmNyZWF0ZUxpbmsoJ2h0dHBzOi8vd3d3LmdpdGh1Yi5jb20vJywgY3VycmVudEluZGV4LnJlcG8ubmFtZSwgXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleC50eXBlID09PSAnTWVtYmVyRXZlbnQnKSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleC50eXBlID09PSAnJylcclxuXHJcbiAgICAgICAgICAgICAgICBIVE1MVGVtcGxhdGUgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEhUTUxUZW1wbGF0ZSArPSAnPC9kaXY+JzsgLy8ucmVjZWl2ZWQtZXZlbnRzIGRpdlxyXG4gICAgICAgIHJldHVybiBIVE1MVGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtmdW5jdGlvbnN9IGZyb20gXCIuL2Z1bmN0aW9uc1wiXHJcbmV4cG9ydCBjbGFzcyBVUkwge1xyXG4gICAgLy9MaXN0IG9mIFVSTChzKSB3ZSBhcmUgZ29pbmcgdG8gdXNlIGluIHRoZSBhcHAsIGl0J3MgZWFzaWVyIHRvIGFjY2VzcyBhbGwgVVJMcyBmcm9tIG9uZSBmaWxlOlxyXG4gICAgc3RhdGljIGFwaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9cIjtcclxuXHJcbiAgICBzdGF0aWMgdXNlclJlY2VpdmVkRXZlbnRzID0gZnVuY3Rpb24gKHVzZXJuYW1lOiBzdHJpbmcgPSBmdW5jdGlvbnMuZ2V0Q29va2llKCdkb3Rjb21fdXNlcicpKSA6IHN0cmluZyB7XHJcbiAgICAgICAgaWYoIXVzZXJuYW1lKXtcclxuICAgICAgICAgICAgdXNlcm5hbWU9ZnVuY3Rpb25zLmdldENvb2tpZSgnZG90Y29tX3VzZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZXR1cm4gdXNlciByZWNlaXZlZCBldmVudHMgVVJMLiAgRXg6IGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvbTk4L3JlY2VpdmVkX2V2ZW50c1xyXG4gICAgICAgIHJldHVybiBcInVzZXJzL1wiICsgdXNlcm5hbWUgKyBcIi9yZWNlaXZlZF9ldmVudHNcIjtcclxuICAgIH1cclxuXHJcbn0iLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2pxdWVyeS9pbmRleC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AdHlwZXMvY2hyb21lL2luZGV4LmQudHNcIiAvPlxuXG5pbXBvcnQge2RldGVjdFVybH0gZnJvbSBcIi4vZ2VuZXJhbC9kZXRlY3RVcmxcIjtcbmltcG9ydCB7VVJMfSBmcm9tIFwiLi9nZW5lcmFsL3VybFwiO1xuXG5pbXBvcnQge3RlbXBsYXRlQ3JlYXRvcn0gZnJvbSAnLi9nZW5lcmFsL3RlbXBsYXRlQ3JlYXRvcic7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIC8vSWYgdGhpcyB3ZWIgcGFnZSBpcyBHaXRIdWIgcnVuIHRoZSBzY3JpcHQgYmVsbG93OlxuICAgIGlmIChkZXRlY3RVcmwuaXNHaXRIdWIoKSkge1xuICAgICAgICAvL1NlbmQgYSBtZXNzYWdlIHRvIGJhY2tncm91bmQgYW5kIGdldCB0aGUgdXNlcm5hbWU6XG4gICAgICAgIC8vQFRPRE86IEluIGJhY2tncm91bmQudHMgdXNlcm5hbWUgc2hvdWxkIHNhdmUgaW50byBkYXRhYmFzZSBmb3IgZWFzaWVyIGFjY2Vzcy4gQSBuZXcgY2xhc3MgbmVlZGVkIGZvciB1c2VyIGluZm9cbiAgICAgICAgLy9cbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2dldENvb2tpZTogXCJkb3Rjb21fdXNlclwifSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgdXJsOiBVUkwuYXBpICsgVVJMLnVzZXJSZWNlaXZlZEV2ZW50cyhyZXNwb25zZSksXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2Rhc2hib2FyZFwiKS5maW5kKFwiLnR3by10aGlyZHNcIikuYXBwZW5kKHRlbXBsYXRlQ3JlYXRvci51c2VyUmVjZWl2ZWRFdmVudHMocmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG59KTtcbiJdfQ==
