/**
 * Get the theme from config.js and load the appropriate stylesheet.
 *
 * @return void
 */
function setupHead()
{
    let html = `<link rel="stylesheet" type="text/css" href="../assets/css/themes/${config.theme}.css">`;
    document.querySelector("head").insertAdjacentHTML("beforeend", html);
}

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
        greeting = "";

    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    if (config.username !== "") {
        greeting += `, ${config.username}`
    }

    document.querySelector(domElement).innerHTML = greeting;
}

function show(domElement) {
    document.querySelector(domElement).classList.remove("hidden");
}

function removeClass(domElement, className) {
    document.querySelector(domElement).classList.remove(className);
}

setupHead();

if (config.showGreeting) {
    getGreeting("#greeting");
}

window.setTimeout(() => {
    show(".content");
}, 100);
