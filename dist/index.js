(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.githubEx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
///<reference path="../../node_modules/@types/jquery/index.d.ts" />
///<reference path="../../node_modules/@types/chrome/index.d.ts" />
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var detectUrl_1 = require("./lib/detectUrl");
var githubApi_1 = require("./lib/githubApi");
$(document).ready(function () {
    //If this web page is GitHub run the script bellow:
    if (detectUrl_1.detectUrl.currentDomainName('all') === 'github.com') {
        //Send a message to background and get the username:
        //@TODO: In background.ts username should save into database for easier access.
        //
        chrome.runtime.sendMessage({ getCookie: "dotcom_user" }, function (response) {
            $.ajax({
                url: githubApi_1.githubApi.api + githubApi_1.githubApi.userReceivedEvents(response),
                success: function success(result) {
                    $("#dashboard").append("<h1>" + result.length + "</h1>");
                }
            });
        });
    }
});

},{"./lib/detectUrl":2,"./lib/githubApi":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var detectUrl = function () {
    function detectUrl() {}
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions = function () {
    function functions() {}
    //In functions class, we will define simple and public/general functions that we might need them constantly
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
    return functions;
}();
exports.functions = functions;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//https://api.github.com/
var functions_1 = require("./functions");
var githubApi = function () {
    function githubApi() {}
    return githubApi;
}();
githubApi.api = "https://api.github.com/";
githubApi.userReceivedEvents = function (username) {
    if (username === void 0) {
        username = functions_1.functions.getCookie('dotcom_user');
    }
    if (!username) {
        username = functions_1.functions.getCookie('dotcom_user');
    }
    //return user received events URL.  Ex: https://api.github.com/users/m98/received_events
    return "users/" + username + "/received_events";
};
exports.githubApi = githubApi;

},{"./functions":3}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzIiwic3JjL2NvbnRlbnRfc2NyaXB0cy9saWIvZGV0ZWN0VXJsLnRzIiwic3JjL2NvbnRlbnRfc2NyaXB0cy9saWIvZnVuY3Rpb25zLnRzIiwic3JjL2NvbnRlbnRfc2NyaXB0cy9saWIvZ2l0aHViQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsQUFBbUU7QUFDbkUsQUFBbUU7Ozs7QUFFbkUsMEJBQXlDO0FBQ3pDLDBCQUF5QztBQUV6QyxBQUFDLEVBQUMsQUFBUSxBQUFDLFVBQUMsQUFBSyxNQUFDO0FBRWQsQUFBbUQ7QUFDbkQsQUFBRSxBQUFDLFFBQUMsWUFBUyxVQUFDLEFBQWlCLGtCQUFDLEFBQUssQUFBQyxXQUFLLEFBQVksQUFBQyxjQUFDLEFBQUM7QUFDdEQsQUFBb0Q7QUFDcEQsQUFBK0U7QUFDL0UsQUFBRTtBQUNGLEFBQU0sZUFBQyxBQUFPLFFBQUMsQUFBVyxZQUFDLEVBQUMsQUFBUyxXQUFFLEFBQWEsQUFBQyxpQkFBRSxVQUFVLEFBQVE7QUFDckUsQUFBQyxjQUFDLEFBQUk7QUFDRixBQUFHLHFCQUFFLFlBQVMsVUFBQyxBQUFHLE1BQUcsWUFBUyxVQUFDLEFBQWtCLG1CQUFDLEFBQVEsQUFBQztBQUMzRCxBQUFPLHlCQUFFLGlCQUFVLEFBQU07QUFDckIsQUFBQyxzQkFBQyxBQUFZLEFBQUMsY0FBQyxBQUFNLE9BQUMsQUFBTSxTQUFHLEFBQU0sT0FBQyxBQUFNLFNBQUcsQUFBTyxBQUFDLEFBQUMsQUFDN0Q7QUFBQyxBQUNKLEFBQUMsQUFBQyxBQUVQO0FBUFc7QUFPVixBQUFDLEFBQUMsQUFFUDtBQUFDLEFBQ0w7QUFBQyxBQUFDLEFBQUM7Ozs7OztBQ3hCSDtBQUFBLHlCQWtDQSxDQUFDO0FBakNVLGNBQWlCLG9CQUF4QixVQUF5QixBQUFZO0FBQ2pDLFlBQUksQUFBZSxrQkFBRyxB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RCxBQUFFLEFBQUMsZ0JBQUMsQUFBQyxFQUFDLEFBQU8sUUFBQyxBQUFJLEFBQUMsU0FBSSxBQUFDLEFBQUMsR0FBQyxBQUFDO0FBQ3ZCLEFBQU0sdUJBQUMsQUFBQyxFQUFDLEFBQVMsVUFBQyxBQUFJLEtBQUMsQUFBTSxRQUFFLEFBQUMsRUFBQyxBQUFNLEFBQUMsQUFBQyxBQUM5QztBQUFDLEFBQ0w7QUFBQztBQUNELEFBQU0sZUFBQyxBQUFFLEFBQUMsQUFFZDtBQUFDO0FBQ0wsV0FBQSxBQUFDO0FBbkJELEFBbUJDO0FBbkJZLG9CQUFTOzs7Ozs7QUNBdEIsQUFBeUI7QUFDekIsMEJBQXFDO0FBQ3JDO0FBQUEseUJBVUEsQ0FBQztBQUFELFdBQUEsQUFBQztBQVZELEFBVUM7QUFUVSxVQUFHLE1BQUcsQUFBeUIsQUFBQztBQUVoQyxVQUFrQixxQkFBRyxVQUFVLEFBQXFEO0FBQXJELDZCQUFBO0FBQUEsbUJBQW1CLFlBQVMsVUFBQyxBQUFTLFVBQUMsQUFBYSxBQUFDOztBQUN2RixBQUFFLFFBQUMsQ0FBQyxBQUFRLEFBQUMsVUFBQSxBQUFDO0FBQ1YsQUFBUSxtQkFBQyxZQUFTLFVBQUMsQUFBUyxVQUFDLEFBQWEsQUFBQyxBQUFDLEFBQ2hEO0FBQUM7QUFDRCxBQUF3RjtBQUN4RixBQUFNLFdBQUMsQUFBUSxXQUFHLEFBQVEsV0FBRyxBQUFrQixBQUFDLEFBQ3BEO0FBQUM7QUFUUSxvQkFBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2pxdWVyeS9pbmRleC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AdHlwZXMvY2hyb21lL2luZGV4LmQudHNcIiAvPlxuXG5pbXBvcnQge2RldGVjdFVybH0gZnJvbSBcIi4vbGliL2RldGVjdFVybFwiXG5pbXBvcnQge2dpdGh1YkFwaX0gZnJvbSBcIi4vbGliL2dpdGh1YkFwaVwiXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIC8vSWYgdGhpcyB3ZWIgcGFnZSBpcyBHaXRIdWIgcnVuIHRoZSBzY3JpcHQgYmVsbG93OlxuICAgIGlmIChkZXRlY3RVcmwuY3VycmVudERvbWFpbk5hbWUoJ2FsbCcpID09PSAnZ2l0aHViLmNvbScpIHtcbiAgICAgICAgLy9TZW5kIGEgbWVzc2FnZSB0byBiYWNrZ3JvdW5kIGFuZCBnZXQgdGhlIHVzZXJuYW1lOlxuICAgICAgICAvL0BUT0RPOiBJbiBiYWNrZ3JvdW5kLnRzIHVzZXJuYW1lIHNob3VsZCBzYXZlIGludG8gZGF0YWJhc2UgZm9yIGVhc2llciBhY2Nlc3MuXG4gICAgICAgIC8vXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtnZXRDb29raWU6IFwiZG90Y29tX3VzZXJcIn0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGdpdGh1YkFwaS5hcGkgKyBnaXRodWJBcGkudXNlclJlY2VpdmVkRXZlbnRzKHJlc3BvbnNlKSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjZGFzaGJvYXJkXCIpLmFwcGVuZChcIjxoMT5cIiArIHJlc3VsdC5sZW5ndGggKyBcIjwvaDE+XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxufSk7XG4iLCJleHBvcnQgY2xhc3MgZGV0ZWN0VXJsIHtcclxuICAgIHN0YXRpYyBjdXJyZW50RG9tYWluTmFtZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY3VycmVudExvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudExvY2F0aW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RvbWFpbicpIHtcclxuICAgICAgICAgICAgbGV0IHJlZ0V4OiBSZWdFeHAgPSAvWy5dY29tfHd3d3xbaHR0cHM6Ly9dfFtodHRwOi8vXS9nO1xyXG4gICAgICAgICAgICAvL1RoaXMgcmVnZXggd2lsbCByZW1vdmUgXCIuY29tXCIgb3IgXCJ3d3dcIiBmcm9tIGhvc3RuYW1lIGFuZCBhdCBsZWFzdCBmb3IgXCJ3d3cuZ2l0aHViLmNvbVwiLCB3aWxsIHJldHVybiBcImdpdGh1YlwiXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50TG9jYXRpb24ucmVwbGFjZShyZWdFeCwgXCJcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRVcmxJbmZvKHVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcgPSBcImRvbWFpblwiKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdkb21haW4nKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnPycpWzBdO1xyXG4gICAgICAgICAgICBpZiAodXJsLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1cmwuc3BsaXQoJy4nKS5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnNwbGl0KCcuJylbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWdFeCA9IC9bLl1jb218d3d3fGh0dHBzfGh0dHB8OnxcXC8vZztcclxuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKHJlZ0V4LCBcIlwiKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncHVyZScpIHtcclxuICAgICAgICAgICAgLy9wdXJlIHR5cGUgd2lsbCByZXR1cm4gdGhlIGRvbWFpbi1FeDogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbT9xPXNvbWV0aGluZyA9PiB3d3cuZ29vZ2xlLmNvbVxyXG4gICAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoXCI/XCIpWzBdOyAvL0ZpcnN0IHJlbW92ZSBhbGwgcXVlcnkgc3RyaW5ncy5cclxuICAgICAgICAgICAgbGV0IHJlZ0V4ID0gL2h0dHBzfGh0dHB8OnxcXC9cXC8vZztcclxuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UocmVnRXgsIFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsLnNwbGl0KCcvJylbMF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBjbGFzcyBmdW5jdGlvbnMge1xyXG4gICAgLy9JbiBmdW5jdGlvbnMgY2xhc3MsIHdlIHdpbGwgZGVmaW5lIHNpbXBsZSBhbmQgcHVibGljL2dlbmVyYWwgZnVuY3Rpb25zIHRoYXQgd2UgbWlnaHQgbmVlZCB0aGVtIGNvbnN0YW50bHlcclxuICAgIHN0YXRpYyBnZXRDb29raWUoY25hbWU6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgICAgIC8vVGhlIGZ1bmN0aW9uIHNvdXJjZTogaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9qcy9qc19jb29raWVzLmFzcFxyXG4gICAgICAgIGxldCBuYW1lID0gY25hbWUgKyBcIj1cIjtcclxuICAgICAgICBsZXQgZGVjb2RlZENvb2tpZSA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICAgIGxldCBjYSA9IGRlY29kZWRDb29raWUuc3BsaXQoJzsnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gY2FbaV07XHJcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIHtcclxuICAgICAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG5cclxuICAgIH1cclxufSIsIi8vaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9cclxuaW1wb3J0IHtmdW5jdGlvbnN9IGZyb20gXCIuL2Z1bmN0aW9uc1wiXHJcbmV4cG9ydCBjbGFzcyBnaXRodWJBcGkge1xyXG4gICAgc3RhdGljIGFwaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9cIjtcclxuXHJcbiAgICBzdGF0aWMgdXNlclJlY2VpdmVkRXZlbnRzID0gZnVuY3Rpb24gKHVzZXJuYW1lOiBzdHJpbmcgPSBmdW5jdGlvbnMuZ2V0Q29va2llKCdkb3Rjb21fdXNlcicpKSA6IHN0cmluZyB7XHJcbiAgICAgICAgaWYoIXVzZXJuYW1lKXtcclxuICAgICAgICAgICAgdXNlcm5hbWU9ZnVuY3Rpb25zLmdldENvb2tpZSgnZG90Y29tX3VzZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZXR1cm4gdXNlciByZWNlaXZlZCBldmVudHMgVVJMLiAgRXg6IGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvbTk4L3JlY2VpdmVkX2V2ZW50c1xyXG4gICAgICAgIHJldHVybiBcInVzZXJzL1wiICsgdXNlcm5hbWUgKyBcIi9yZWNlaXZlZF9ldmVudHNcIjtcclxuICAgIH1cclxufSJdfQ==
