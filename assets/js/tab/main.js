/**
 * Displays a greeting based on your local time of day.
 *
 * @param domElement
 * @return void
 */
function getGreeting(domElement)
{
    let currentDate = new Date,
        currentHour = currentDate.getHours(),
        greeting = "Good ";

    if (currentHour < 12) {
        greeting += "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting += "afternoon";
    } else {
        greeting += "evening";
    }

    document.querySelector(domElement).innerHTML = `${greeting}!`;
    displayClock(domElement);
}

function displayClock(greetingElement)
{
    chrome.storage.sync.get(["showClock", "username", "greetByName"]).then(response => {
        let showClock = response.showClock,
            username = response.username,
            greetByName = response.greetByName;

        if (showClock !== undefined && showClock) {
            let clockElement = document.querySelector("#clock");

            clockElement.innerHTML = getTimeString();
            clockElement.classList.remove("hidden");
        }
        if (username !== undefined && username !== "" && greetByName !== undefined && greetByName) {
            let greetingHeading = document.querySelector(greetingElement);
            greetingHeading.innerHTML = greetingHeading.innerHTML.replace("!", "") + `, ${username}!`;
        }
    });
}

function getTimeString()
{
    let date = new Date,
        hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return hours + ":" + minutes;
}

function show(domElement) {
    document.querySelector(domElement).classList.remove("hidden");
}

getGreeting("#greeting");

window.setTimeout(() => {
    show(".content");
}, 200);
