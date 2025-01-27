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


/* Default speed of 1 button */
defaultSpeedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setSpeed,
            args: [defaultSpeedrate]
        });
    });
});

/* Default speed of 2.5 button*/
defaultFastSpeedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setSpeed,
            args: [defaultSpeedSpeedrate]
        });
    });
});

/* Custom button, with default set to 1 */
speedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        let speedValue = document.getElementById('speedInput').value;
        if (!isValidFloat(speedValue) || Number(speedValue) < minSpeedrateThreshold) {
            speedValue = defaultSpeedrate;
        }

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setSpeed,
            args: [speedValue]
        });
    });
});
