"use strict";

document.querySelector("#settings-page").addEventListener("click", function () {
  chrome.runtime.openOptionsPage();
});