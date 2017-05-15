(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.githubEx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

///<reference path="../../node_modules/@types/chrome/index.d.ts" />
//This just calls once the extension installed.
//chrome.tabs.create({"url": "http://google.com"});
//import {detectUrl} from '../content_scripts/lib/detectUrl';
//import {functions} from "../content_scripts/lib/functions";
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.cookies.get({ "url": tab.url, "name": "dotcom_user" }, function (result) {
            //@TODO: Insert the username into Chrome local storage for easier access.
            console.log(result);
        });
    }
    //console.log(tabId, changeInfo, tab);
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.cookies.get({ "url": sender.tab.url, "name": request.getCookie }, function (result) {
        sendResponse(result.value);
    });
    return true;
});
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({ url: "https://github.com/m98/undefined" }, function (tab) {});
});

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxBQUFtRTtBQUVuRSxBQUErQztBQUMvQyxBQUFtRDtBQUVuRCxBQUE2RDtBQUM3RCxBQUE2RDtBQUc3RCxBQUFNLE9BQUMsQUFBSSxLQUFDLEFBQVMsVUFBQyxBQUFXLFlBQUMsVUFBVSxBQUFLLE9BQUUsQUFBVSxZQUFFLEFBQUc7QUFDOUQsQUFBRSxBQUFDLFFBQUMsQUFBVSxXQUFDLEFBQU0sV0FBSyxBQUFVLEFBQUMsWUFBQyxBQUFDO0FBQ25DLEFBQU0sZUFBQyxBQUFPLFFBQUMsQUFBRyxJQUFDLEVBQUMsQUFBSyxPQUFFLEFBQUcsSUFBQyxBQUFHLEtBQUUsQUFBTSxRQUFFLEFBQWEsQUFBQyxpQkFBRSxVQUFVLEFBQVc7QUFDN0UsQUFBeUU7QUFDekUsQUFBTyxvQkFBQyxBQUFHLElBQUMsQUFBTSxBQUFDLEFBQUMsQUFDeEI7QUFBQyxBQUFDLEFBQUMsQUFDUDtBQUFDO0FBQ0QsQUFBc0MsQUFDMUM7QUFBQyxBQUFDLEFBQUM7QUFHSCxBQUFNLE9BQUMsQUFBTyxRQUFDLEFBQVMsVUFBQyxBQUFXLFlBQ2hDLFVBQVUsQUFBTyxTQUFFLEFBQU0sUUFBRSxBQUFZO0FBQ25DLEFBQU0sV0FBQyxBQUFPLFFBQUMsQUFBRyxJQUFDLEVBQUMsQUFBSyxPQUFFLEFBQU0sT0FBQyxBQUFHLElBQUMsQUFBRyxLQUFFLEFBQU0sUUFBRSxBQUFPLFFBQUMsQUFBUyxBQUFDLGFBQUUsVUFBVSxBQUFXO0FBQ3hGLEFBQVkscUJBQUMsQUFBTSxPQUFDLEFBQUssQUFBQyxBQUFDLEFBQy9CO0FBQUMsQUFBQyxBQUFDO0FBRUgsQUFBTSxXQUFDLEFBQUksQUFBQyxBQUNoQjtBQUFDLEFBQUMsQUFBQztBQUVQLEFBQU0sT0FBQyxBQUFPLFFBQUMsQUFBVyxZQUFDLEFBQVcsWUFBQyxVQUFVLEFBQU07QUFDbkQsQUFBTSxXQUFDLEFBQUksS0FBQyxBQUFNLE9BQUMsRUFBQyxBQUFHLEtBQUUsQUFBa0MsQUFBQyxzQ0FBRSxVQUFVLEFBQUcsS0FFM0UsQ0FBQyxBQUFDLEFBQUMsQUFDUDtBQUFDLEFBQUMsQUFBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2Nocm9tZS9pbmRleC5kLnRzXCIgLz5cblxuLy9UaGlzIGp1c3QgY2FsbHMgb25jZSB0aGUgZXh0ZW5zaW9uIGluc3RhbGxlZC5cbi8vY2hyb21lLnRhYnMuY3JlYXRlKHtcInVybFwiOiBcImh0dHA6Ly9nb29nbGUuY29tXCJ9KTtcblxuLy9pbXBvcnQge2RldGVjdFVybH0gZnJvbSAnLi4vY29udGVudF9zY3JpcHRzL2xpYi9kZXRlY3RVcmwnO1xuLy9pbXBvcnQge2Z1bmN0aW9uc30gZnJvbSBcIi4uL2NvbnRlbnRfc2NyaXB0cy9saWIvZnVuY3Rpb25zXCI7XG5cblxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XG4gICAgaWYgKGNoYW5nZUluZm8uc3RhdHVzID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgY2hyb21lLmNvb2tpZXMuZ2V0KHtcInVybFwiOiB0YWIudXJsLCBcIm5hbWVcIjogXCJkb3Rjb21fdXNlclwifSwgZnVuY3Rpb24gKHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgICAvL0BUT0RPOiBJbnNlcnQgdGhlIHVzZXJuYW1lIGludG8gQ2hyb21lIGxvY2FsIHN0b3JhZ2UgZm9yIGVhc2llciBhY2Nlc3MuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKTtcbn0pO1xuXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgICBmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgY2hyb21lLmNvb2tpZXMuZ2V0KHtcInVybFwiOiBzZW5kZXIudGFiLnVybCwgXCJuYW1lXCI6IHJlcXVlc3QuZ2V0Q29va2llfSwgZnVuY3Rpb24gKHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogXCJodHRwczovL2dpdGh1Yi5jb20vbTk4L3VuZGVmaW5lZFwifSwgZnVuY3Rpb24gKHRhYikge1xuXG4gICAgfSk7XG59KTsiXX0=
