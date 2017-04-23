(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.githubEx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
///<reference path="../../node_modules/@types/chrome/index.d.ts" />
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//This just calls once the extension installed.
//chrome.tabs.create({"url": "http://google.com"});
var detectUrl_1 = require("../content_scripts/lib/detectUrl");
chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
        // since the result of the tabs.query just will return active tab
        // the return variable should only have one entry, and it's the active tab
        var activeTab = arrayOfTabs[0];
        if (detectUrl_1.detectUrl.getUrlInfo(activeTab.url) === 'github.com') {}
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

},{"../content_scripts/lib/detectUrl":2}],2:[function(require,module,exports){
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
            return currentLocation.replace(regEx, "");
        }
        //This regex will remove ".com" or "www" from hostname and at least for "www.github.com", will return "github"
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzIiwic3JjL2NvbnRlbnRfc2NyaXB0cy9saWIvZGV0ZWN0VXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsQUFBbUU7Ozs7QUFFbkUsQUFBK0M7QUFDL0MsQUFBbUQ7QUFFbkQsMEJBQTJEO0FBRTNELEFBQU0sT0FBQyxBQUFJLEtBQUMsQUFBUyxVQUFDLEFBQVcsWUFBQztBQUU5QixBQUFNLFdBQUMsQUFBSSxLQUFDLEFBQUssTUFBQyxFQUFDLEFBQU0sUUFBRSxBQUFJLE1BQUUsQUFBYSxlQUFFLEFBQUksQUFBQyxRQUFFLFVBQVUsQUFBVztBQUV4RSxBQUFpRTtBQUNqRSxBQUEwRTtBQUMxRSxZQUFJLEFBQVMsWUFBRyxBQUFXLFlBQUMsQUFBQyxBQUFDLEFBQUM7QUFHL0IsQUFBRSxBQUFDLFlBQUMsWUFBUyxVQUFDLEFBQVUsV0FBQyxBQUFTLFVBQUMsQUFBRyxBQUFDLFNBQUssQUFBWSxBQUFDLGNBQUMsQUFBQyxBQUUzRCxDQUFDLEFBRUw7QUFBQyxBQUFDLEFBQUMsQUFFUDtBQUFDLEFBQUMsQUFBQztBQUVILEFBWUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDRjtBQUFBLHlCQWlDQSxDQUFDO0FBaENVLGNBQWlCLG9CQUF4QixVQUF5QixBQUFZO0FBQ2pDLFlBQUksQUFBZSxrQkFBRyxBQUFNLE9BQUMsQUFBUSxTQUFDLEFBQVEsQUFBQztBQUMvQyxBQUFFLEFBQUMsWUFBQyxBQUFJLFNBQUssQUFBSyxBQUFDLE9BQUMsQUFBQztBQUNqQixBQUFNLG1CQUFDLEFBQWUsQUFBQyxBQUMzQjtBQUFDLEFBQUMsQUFBSSxlQUFDLEFBQUUsQUFBQyxJQUFDLEFBQUksU0FBSyxBQUFRLEFBQUMsVUFBQyxBQUFDO0FBQzNCLGdCQUFJLEFBQUssUUFBRyxBQUFrQyxBQUFDO0FBQy9DLEFBQU0sbUJBQUMsQUFBZSxnQkFBQyxBQUFPLFFBQUMsQUFBSyxPQUFFLEFBQUUsQUFBQyxBQUM3QztBQUFDO0FBQ0QsQUFBOEcsQUFDbEg7QUFBQztBQUVNLGNBQVUsYUFBakIsVUFBa0IsQUFBVyxLQUFFLEFBQXVCO0FBQXZCLDZCQUFBO0FBQUEsbUJBQXVCOztBQUNsRCxBQUFFLEFBQUMsWUFBQyxBQUFJLFNBQUssQUFBUSxBQUFDLFVBQUMsQUFBQztBQUNwQixBQUFHLGtCQUFHLEFBQUcsSUFBQyxBQUFLLE1BQUMsQUFBRyxBQUFDLEtBQUMsQUFBQyxBQUFDLEFBQUM7QUFDeEIsQUFBRSxBQUFDLGdCQUFDLEFBQUcsSUFBQyxBQUFLLE1BQUMsQUFBRyxBQUFDLEtBQUMsQUFBTSxXQUFLLEFBQUMsQUFBQyxHQUFDLEFBQUM7QUFDOUIsQUFBRyxzQkFBRyxBQUFHLElBQUMsQUFBSyxNQUFDLEFBQUcsQUFBQyxLQUFDLEFBQUMsQUFBQyxBQUFDLEFBQzVCO0FBQUMsQUFBQyxBQUFJLG1CQUFDLEFBQUUsQUFBQyxJQUFDLEFBQUcsSUFBQyxBQUFLLE1BQUMsQUFBRyxBQUFDLEtBQUMsQUFBTSxVQUFJLEFBQUMsQUFBQyxHQUFDLEFBQUM7QUFDcEMsQUFBRyxzQkFBRyxBQUFHLElBQUMsQUFBSyxNQUFDLEFBQUcsQUFBQyxLQUFDLEFBQUMsQUFBQyxBQUFDLEFBQzVCO0FBQUM7QUFFRCxnQkFBSSxBQUFLLFFBQUcsQUFBNkIsQUFBQztBQUMxQyxBQUFNLG1CQUFDLEFBQUcsSUFBQyxBQUFPLFFBQUMsQUFBSyxPQUFFLEFBQUUsQUFBQyxBQUFDLEFBRWxDO0FBQUMsQUFBQyxBQUFJLGVBQUMsQUFBRSxBQUFDLElBQUMsQUFBSSxTQUFLLEFBQU0sQUFBQyxRQUFDLEFBQUM7QUFDekIsQUFBMkY7QUFDM0YsQUFBRyxrQkFBRyxBQUFHLElBQUMsQUFBSyxNQUFDLEFBQUcsQUFBQyxLQUFDLEFBQUMsQUFBQyxBQUFDLElBQUMsQUFBaUM7QUFDMUQsZ0JBQUksQUFBSyxRQUFHLEFBQW9CLEFBQUM7QUFDakMsQUFBRyxrQkFBRyxBQUFHLElBQUMsQUFBTyxRQUFDLEFBQUssT0FBRSxBQUFFLEFBQUMsQUFBQztBQUM3QixBQUFNLG1CQUFDLEFBQUcsSUFBQyxBQUFLLE1BQUMsQUFBRyxBQUFDLEtBQUMsQUFBQyxBQUFDLEFBQzVCO0FBQUMsQUFDTDtBQUFDO0FBRUwsV0FBQSxBQUFDO0FBakNELEFBaUNDO0FBakNZLG9CQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AdHlwZXMvY2hyb21lL2luZGV4LmQudHNcIiAvPlxuXG4vL1RoaXMganVzdCBjYWxscyBvbmNlIHRoZSBleHRlbnNpb24gaW5zdGFsbGVkLlxuLy9jaHJvbWUudGFicy5jcmVhdGUoe1widXJsXCI6IFwiaHR0cDovL2dvb2dsZS5jb21cIn0pO1xuXG5pbXBvcnQge2RldGVjdFVybH0gZnJvbSAnLi4vY29udGVudF9zY3JpcHRzL2xpYi9kZXRlY3RVcmwnO1xuXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuXG4gICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uIChhcnJheU9mVGFicykge1xuXG4gICAgICAgIC8vIHNpbmNlIHRoZSByZXN1bHQgb2YgdGhlIHRhYnMucXVlcnkganVzdCB3aWxsIHJldHVybiBhY3RpdmUgdGFiXG4gICAgICAgIC8vIHRoZSByZXR1cm4gdmFyaWFibGUgc2hvdWxkIG9ubHkgaGF2ZSBvbmUgZW50cnksIGFuZCBpdCdzIHRoZSBhY3RpdmUgdGFiXG4gICAgICAgIGxldCBhY3RpdmVUYWIgPSBhcnJheU9mVGFic1swXTtcblxuXG4gICAgICAgIGlmIChkZXRlY3RVcmwuZ2V0VXJsSW5mbyhhY3RpdmVUYWIudXJsKSA9PT0gJ2dpdGh1Yi5jb20nKSB7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pO1xuXG4vKlxuQkxPQ0sgQUxMIFJlcXVlU1RTXG5jaHJvbWUud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QuYWRkTGlzdGVuZXIoXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge2NhbmNlbDogdHJ1ZX07XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHVybHM6IFtcIjxhbGxfdXJscz5cIl0sIC8vIENoYW5nZSB0aGlzIHRvIGEgbW9yZSBzcGVjaWZpYyBwYXR0ZXJuXG4gICAgICAgIHR5cGVzOiBbXCJzY3JpcHRcIl1cbiAgICB9LFxuICAgIFtcImJsb2NraW5nXCJdXG4pO1xuKi8iLCJleHBvcnQgY2xhc3MgZGV0ZWN0VXJsIHtcclxuICAgIHN0YXRpYyBjdXJyZW50RG9tYWluTmFtZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY3VycmVudExvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudExvY2F0aW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RvbWFpbicpIHtcclxuICAgICAgICAgICAgbGV0IHJlZ0V4ID0gL1suXWNvbXx3d3d8W2h0dHBzOi8vXXxbaHR0cDovL10vZztcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRMb2NhdGlvbi5yZXBsYWNlKHJlZ0V4LCBcIlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1RoaXMgcmVnZXggd2lsbCByZW1vdmUgXCIuY29tXCIgb3IgXCJ3d3dcIiBmcm9tIGhvc3RuYW1lIGFuZCBhdCBsZWFzdCBmb3IgXCJ3d3cuZ2l0aHViLmNvbVwiLCB3aWxsIHJldHVybiBcImdpdGh1YlwiXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFVybEluZm8odXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZyA9IFwiZG9tYWluXCIpIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RvbWFpbicpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsLnNwbGl0KCc/JylbMF07XHJcbiAgICAgICAgICAgIGlmICh1cmwuc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVybC5zcGxpdCgnLicpLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJy4nKVswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlZ0V4ID0gL1suXWNvbXx3d3d8aHR0cHN8aHR0cHw6fFxcLy9nO1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UocmVnRXgsIFwiXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwdXJlJykge1xyXG4gICAgICAgICAgICAvL3B1cmUgdHlwZSB3aWxsIHJldHVybiB0aGUgZG9tYWluLUV4OiBodHRwczovL3d3dy5nb29nbGUuY29tP3E9c29tZXRoaW5nID0+IHd3dy5nb29nbGUuY29tXHJcbiAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdChcIj9cIilbMF07IC8vRmlyc3QgcmVtb3ZlIGFsbCBxdWVyeSBzdHJpbmdzLlxyXG4gICAgICAgICAgICBsZXQgcmVnRXggPSAvaHR0cHN8aHR0cHw6fFxcL1xcLy9nO1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShyZWdFeCwgXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19
