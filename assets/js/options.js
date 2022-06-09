function saveOptions() {
  let saveButton = document.querySelector("#save-options"),
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
  }).then(response => {
    let feedbackElement = document.querySelector("#feedback");
    spinner.classList.add("hidden");
    saveButton.classList.remove("hidden");
    feedbackElement.classList.remove("hidden");
    feedbackElement.classList.add("success");
    feedbackElement.innerHTML = "Settings saved!";
    window.setTimeout(() => {
      feedbackElement.classList.add("hidden");
    }, 3000);
  });
}

function retrieveOptions() {
  chrome.storage.sync.get(["showClock", "greetByName", "username", "theme"]).then(response => {
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
      document.querySelector(`[data-name='${response.theme}']`).classList.add("current");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  retrieveOptions();
  document.querySelector("#save-options").addEventListener("click", saveOptions);
  let themeOptions = document.querySelectorAll(".theme");
  themeOptions.forEach(theme => {
    theme.addEventListener("click", () => {
      themeOptions.forEach(theme => {
        theme.classList.remove("current");
      });
      theme.classList.add("current");
    });
  });
});