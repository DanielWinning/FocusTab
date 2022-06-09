
function saveOptions()
{
    let showClock = document.querySelector("#display-clock-checkbox").checked;

    chrome.storage.sync.set({
        showClock: showClock
    });
}

document.querySelector("#save-options").addEventListener("click", saveOptions);