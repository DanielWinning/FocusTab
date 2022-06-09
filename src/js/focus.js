window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#settings-page").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });

    showVersion();
});

function showVersion()
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/manifest.json");

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let response = xhr.responseText;

            document.querySelector("#version-ref").innerHTML +=  " " + JSON.parse(response).version;
        }
    }
    xhr.send();
}