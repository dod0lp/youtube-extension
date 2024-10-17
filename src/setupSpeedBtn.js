const speedBtn = document.getElementById("setSpeedBtn");

function setSpeed(speedrate) {
    document.getElementsByTagName("video")[0].playbackRate = speedrate;
}

function isValidFloat(value) {
    const parsedValue = Number(value);
    
    return !isNaN(parsedValue) && isFinite(parsedValue);
}

speedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        let speedValue = document.getElementById('speedInput').value;
        if (!isValidFloat(speedValue)) {
            speedValue = speedrateDefault;
        }

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setSpeed,
            args: [speedValue]
        });
    });
});