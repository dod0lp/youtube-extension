const speedrateSet = 2.5;
const qualitySet = "1080p";

const speedBtn = document.getElementById("setSpeedBtn");

speedBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: runSpeedCommand,
                args: [speedrateSet]
            });
        }
    });
});

function runSpeedCommand(speedrate) {
    document.getElementsByTagName("video")[0].playbackRate = speedrate;
}