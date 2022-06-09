/**
 * Displays a greeting based on your local time of day.
 *
 * @param domElement
 * @return void
 */
function getGreeting(domElement)
{
    let currentDate = new Date(),
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
    chrome.storage.sync.get(["showClock", "username"]).then(response => {
        let showClock = response.showClock,
            username = response.username;

        if (showClock !== undefined && showClock) {
            document.querySelector("#clock").classList.remove("hidden");
        }
        if (username !== undefined) {
            let greetingHeading = document.querySelector(greetingElement);
            greetingHeading.innerHTML = greetingHeading.innerHTML.replace("!", "") + `, ${username}!`;
        }
    });
}

function show(domElement) {
    document.querySelector(domElement).classList.remove("hidden");
}

getGreeting("#greeting");

window.setTimeout(() => {
    show(".content");
}, 200);
