const speedrateDefault = 2.5;
const qualitySet = "1080p";

const qualityBtn = document.getElementById("setQualityBtn");

// Ensure one that only one checkbox can be checked
const checkboxContainer = document.getElementById('qualityCheckboxes');
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