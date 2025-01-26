const speedBtn = document.getElementById("setSpeedBtn");
const defaultSpeedBtn = document.getElementById("setDefaultSpeedBtn");
const defaultFastSpeedBtn = document.getElementById("setDefaultFastSpeedBtn");


function setSpeed(speedrate) {
    document.getElementsByTagName("video")[0].playbackRate = speedrate;
}

function isValidFloat(value) {
    const parsedValue = parseFloat(value);
    
    return !isNaN(parsedValue) && isFinite(parsedValue);
}

speedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        let speedValue = document.getElementById('speedInput').value;
        if (!isValidFloat(speedValue) || Number(speedValue) < minSpeedrateThreshold) {
            speedValue = defaultSpeedSpeedrate;
        }

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setSpeed,
            args: [speedValue]
        });
    });
});

defaultSpeedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setSpeed,
            args: [1]
        });
    });
});