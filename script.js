document.querySelector('.report-form').addEventListener('submit', function(event) {
    // Basic client-side validation (optional)
    const crimeType = document.querySelector('#crime-type').value;
    const location = document.querySelector('#location').value;
    const description = document.querySelector('#description').value;

    if (!crimeType || !location || !description) {
        alert('Please fill out all fields.');
        event.preventDefault();
    } else {
        // Proceed with form submission
        alert('Report submitted successfully.');
    }
});