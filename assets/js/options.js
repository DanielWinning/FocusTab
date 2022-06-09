"use strict";

function saveOptions() {
  var saveButton = document.querySelector("#save-options"),
      spinner = document.querySelector("#spinner"),
      showClock = document.querySelector("#clock-switch").querySelector("input[type='checkbox']").checked,
      greetByName = document.querySelector("#name-greeting-switch").querySelector("input[type='checkbox']").checked,
      username = document.querySelector("#username-input").value,
      feedbackElement = document.querySelector("#feedback"),
      currentTheme = document.querySelector(".current").dataset.name;
  saveButton.classList.add("hidden");
  spinner.classList.remove("hidden");
  chrome.storage.sync.set({
    showClock: showClock,
    greetByName: greetByName,
    username: username,
    theme: currentTheme
  }).then(function (response) {
    var feedbackElement = document.querySelector("#feedback");
    spinner.classList.add("hidden");
    saveButton.classList.remove("hidden");
    feedbackElement.classList.remove("hidden");
    feedbackElement.classList.add("success");
    feedbackElement.innerHTML = "Settings saved!";
    window.setTimeout(function () {
      feedbackElement.classList.add("hidden");
    }, 3000);
  });
}

function retrieveOptions() {
  chrome.storage.sync.get(["showClock", "greetByName", "username", "theme"]).then(function (response) {
    if (response.showClock !== undefined && response.showClock) {
      document.querySelector("#clock-switch").querySelector("input[type='checkbox']").checked = true;
    }

    if (response.greetByName !== undefined && response.greetByName) {
      document.querySelector("#name-greeting-switch").querySelector("input[type='checkbox']").checked = true;
    }

    if (response.username !== undefined) {
      document.querySelector("#username-input").value = response.username;
    }

    if (response.theme === undefined) {
      document.querySelector("[data-name='default']").classList.add("current");
    } else {
      document.querySelector("[data-name='".concat(response.theme, "']")).classList.add("current");
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  retrieveOptions();
  document.querySelector("#save-options").addEventListener("click", saveOptions);
  var themeOptions = document.querySelectorAll(".theme");
  themeOptions.forEach(function (theme) {
    theme.addEventListener("click", function () {
      themeOptions.forEach(function (theme) {
        theme.classList.remove("current");
      });
      theme.classList.add("current");
    });
  });
});