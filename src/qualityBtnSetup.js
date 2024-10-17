const checkboxContainer = document.getElementById('qualityCheckboxes');
const qualityBtn = document.getElementById("setQualityBtn");
const validQualities = [ 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny' ];
const qualityMap = {
    'hd2160': '2160p',
    'hd1440': '1440p',
    'hd1080': '1080p',
    'hd720': '720p',
    'large': '480p',
    'medium': '360p',
    'small': '240p',
    'tiny': '144p'
};
const remappedValidQualitiesList = validQualities.map(quality => qualityMap[quality]);

document.addEventListener('DOMContentLoaded', function() {
    validQualities.forEach(quality => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.className = 'qualityOption';
        checkbox.value = quality;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(qualityMap[quality]));
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement('br'));
    });
});


// Ensure that only one checkbox can be checked using this efficient algorithm
checkboxContainer.addEventListener('change', function(event) {
    if (event.target.classList.contains('qualityOption')) {
        const checkboxes = checkboxContainer.querySelectorAll('.qualityOption');
        checkboxes.forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
    }
});

// TODO: Fix this, maybe wait for API to open?
function setVideoQuality(targetQuality) {
    const videoplayer = document.getElementById('movie_player');
    const qualityLevels = videoplayer.getVideoPlaybackQuality().qualityLevels;

    // Efficient check for avaible qualities and to unset current
    for (let i = 0; i < qualityLevels.length; i++) {
        if (qualityLevels[i].name !== targetQuality) {
            qualityLevels[i].enabled = false;
        }
    }

    for (let i = 0; i < qualityLevels.length; i++) {
        if (qualityLevels[i].name === targetQuality) {
            qualityLevels[i].enabled = true;
            return;
        }
    }
}

// TODO: Change quality on checkbox change, not button
qualityBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length < 1) {
            return;
        }

        const activeTab = tabs[0];

        const checkedCheckbox = checkboxContainer.querySelector('.qualityOption:checked');
        let qualitySet = qualityDefault;

        if (checkedCheckbox) {
            let tempQuality = checkedCheckbox.value.trim();

            // ensure no tempering of value
            if (validQualities.includes(qualitySet)) {
                qualitySet = tempQuality;
            }
        }

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: setVideoQuality,
            args: [qualitySet]
        });
    });
});