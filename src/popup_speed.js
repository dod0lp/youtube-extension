const speedrate = 2.5;
const qualityBtn = "setQualityBtn";
const speedBtn = "setSpeedBtn";


document.getElementById(speedBtn).addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];

      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: runSpeedCommand,
        args: [speedrate]
      });
    }
  });
});
  
function runSpeedCommand(speedrate) {
    document.getElementsByTagName("video")[0].playbackRate = speedrate;
}
  