"use strict";

window.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#settings-page").addEventListener("click", function () {
    chrome.runtime.openOptionsPage();
  });
  showVersion();
});

function showVersion() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/manifest.json");

  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var response = xhr.responseText;
      document.querySelector("#version-ref").innerHTML += " " + JSON.parse(response).version;
    }
  };

  xhr.send();
}