function saveOptions()
{
    let saveButton = document.querySelector("#save-options"), spinner = document.querySelector("#spinner");

    saveButton.classList.add("hidden");
    spinner.classList.remove("hidden");

    let showClock = document.querySelector("#clock-switch").querySelector("input[type='checkbox']").checked,
        greetByName = document.querySelector("#name-greeting-switch").querySelector("input[type='checkbox']").checked,
        username = document.querySelector("#username-input").value;

    chrome.storage.sync.set({
        showClock: showClock,
        greetByName: greetByName,
        username: username
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

function retrieveOptions()
{
    chrome.storage.sync.get(["showClock", "greetByName", "username"]).then(response => {
        if (response.showClock !== undefined && response.showClock) {
            document.querySelector("#clock-switch").querySelector("input[type='checkbox']").checked = true;
        }
        if (response.greetByName !== undefined && response.greetByName) {
            document.querySelector("#name-greeting-switch").querySelector("input[type='checkbox']").checked = true;
        }
        if (response.username !== undefined) {
            document.querySelector("#username-input").value = response.username;
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    retrieveOptions();
    document.querySelector("#save-options").addEventListener("click", saveOptions);
});