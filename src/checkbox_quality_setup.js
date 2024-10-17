document.addEventListener('DOMContentLoaded', function() {
    const qualities = [ '144p', '360p', '480p', '720p', '1080p', '1440p', '2160p' ];

    const checkboxContainer = document.getElementById('qualityCheckboxes');

    qualities.forEach(quality => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.className = 'qualityOption';
        checkbox.value = quality;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(quality));
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement('br'));
    });
});
