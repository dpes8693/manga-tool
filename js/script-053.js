// ==UserScript==
// @name        [包子漫畫]快速前往下一話
// @namespace    http://tampermonkey.net/
// @version      0.53
// @description  按下N鍵 直接前往下一話，不用滾到最底下
// @author       dpes5407
// @match        *://*.webmota.com/comic/chapter*
// @match        *://*.baozimanhua.net/chapter*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=phpied.com
// @grant        none
// @noframes
// @supportURL  https://home.gamer.com.tw/profile/index.php?owner=dpes5407
// @license MIT
// ==/UserScript==

(function () {
    "use strict";
    var baseUrl = window.location.href;
    generateBtn("copy", copyImgSrc);
  
    function getNextChapterUrl() {
      var arr = baseUrl.split("_");
      if (arr.length === 3) {
        arr[2] = arr[2].split(".")[0];
        arr[2] = `${Number(arr[2]) + 1}`;
        return `${arr[0]}_${arr[1]}_${arr[2]}.html`;
      }
      if (arr.length === 2) {
        var page = arr[1].split(".")[0];
        var next = Number(page) + 1;
        if (next) {
          return `${arr[0]}_${next}.html`;
        }
      }
      alert("網址以更換規則");
      return baseUrl;
    }
  
    if (baseUrl.includes("baozimanhua")) {
      generateBtn("next", function () {
        window.location.href = getNextChapterUrl();
      });
    }
    if (baseUrl.includes("webmota")) {
      generateBtn("next", function () {
        window.location.href = getNextChapterUrl();
      });
    }
  
    function baozimanhua() {
      var elms = document.querySelectorAll(".j-rd-next");
      if (!elms) return;
      else {
        var urlArr = elms[1].outerHTML.replaceAll('"', " ").split(" ");
        var url = urlArr.filter((el) => el.indexOf("chapter") > -1).toString();
        document.onkeydown = function (e) {
          keyEvent(e, url);
        };
        return url;
      }
    }
    function webmota() {
      var elm = document.querySelector(".next_chapter");
      if (!elm) return;
      else {
        var url = elm.children[0].href;
        document.onkeydown = function (e) {
          keyEvent(e, url);
        };
        return url;
      }
    }
    function keyEvent(e, link) {
      var keyNum = window.event ? e.keyCode : e.which;
      if (keyNum == 78) {
        if (link) {
          window.location.href = link;
        } else {
          alert("已經是最後一話了!");
        }
      }
    }
  
    function generateBtn(text = "", func) {
      var el = document.createElement("button");
      el.innerHTML = text;
      el.style.color = "#ffffff";
      el.style.backgroundColor = "#000000";
      el.onclick = func;
      var nav = document.querySelector(".l-content");
      if (nav) {
        nav.append(el);
      } else {
        el.style.position = "fixed";
        el.style.right = 0;
        el.style.zIndex = 99999;
        document.body.append(el);
      }
    }
    function copyImgSrc(value) {
      var textarea = document.createElement("textarea");
      textarea.id = "temp_textarea";
      document.body.append(textarea);
      textarea.value = getImgSrc();
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.getElementById("temp_textarea").remove();
  
      function getImgSrc() {
        var imgSrc = document.querySelector("img[src]").src || "";
        return imgSrc;
      }
    }
  })();
  