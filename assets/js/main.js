"use strict";

/**
 * Displays a greeting based on your local time of day.
 *
 * @param domElement
 * @return void
 */
function getGreeting(domElement) {
  var currentDate = new Date(),
      currentHour = currentDate.getHours(),
      greeting = "Good ";

  if (currentHour < 12) {
    greeting += "morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting += "afternoon";
  } else {
    greeting += "evening";
  }

  document.querySelector(domElement).innerHTML = "".concat(greeting, "!");
  displayClock(domElement);
}

function displayClock(greetingElement) {
  chrome.storage.sync.get(["showClock", "username", "greetByName"]).then(function (response) {
    var showClock = response.showClock,
        username = response.username,
        greetByName = response.greetByName;

    if (showClock !== undefined && showClock) {
      var clockElement = document.querySelector("#clock");
      clockElement.innerHTML = getTimeString();
      clockElement.classList.remove("hidden");
    }

    if (username !== undefined && username !== "" && greetByName !== undefined && greetByName) {
      var greetingHeading = document.querySelector(greetingElement);
      greetingHeading.innerHTML = greetingHeading.innerHTML.replace("!", "") + ", ".concat(username, "!");
    }
  });
}

function getTimeString() {
  var date = new Date(),
      hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return hours + ":" + minutes;
}

function show(domElement) {
  document.querySelector(domElement).classList.remove("hidden");
}

function getStylesheet() {
  chrome.storage.sync.get("theme").then(function (response) {
    var theme = response.theme === undefined ? "default" : response.theme;
    document.querySelector("head").insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/css/themes/".concat(theme, ".css\">"));
    window.setTimeout(function () {
      document.querySelector(".overlay").classList.add("hidden");
    }, 250); // Artificial delay because it's slightly less annoying than the flash
  });
}

window.addEventListener("DOMContentLoaded", function () {
  getStylesheet();
  getGreeting("#greeting");
  window.setTimeout(function () {
    show(".content");
  }, 200);
});