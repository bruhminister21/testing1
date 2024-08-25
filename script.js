// Initialize the Leaflet map
var map = L.map('map-container').setView([22.97660, 88.44829], 16);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize the routing control
var routingControl = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

// Function to handle search
function searchLocation() {
    var query = document.getElementById('search-input').value;
    if (query) {
        var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    var result = data[0];
                    var lat = result.lat;
                    var lon = result.lon;
                    map.setView([lat, lon], 16);
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(result.display_name)
                        .openPopup();
                    routingControl.setWaypoints([
                        L.latLng(lat, lon)
                    ]);
                } else {
                    alert('Location not found');
                }
            });
    } else {
        alert('Please enter a search query');
    }
}

// Handle the rating form submission
document.getElementById('rating-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get form values
    var startLocation = document.getElementById('start-location').value;
    var endLocation = document.getElementById('end-location').value;
    var rating = document.getElementById('rating').value;

    // For demonstration, log the values to the console
    console.log(`Start Location: ${startLocation}`);
    console.log(`End Location: ${endLocation}`);
    console.log(`Rating: ${rating}`);

    // Create a new marker for the rating
    var startLatLng = getLatLng(startLocation);
    var endLatLng = getLatLng(endLocation);

    if (startLatLng && endLatLng) {
        // Add a polyline for the route
        L.polyline([startLatLng, endLatLng], { color: 'blue' }).addTo(map);

        // Add a rating marker
        var ratingMarker = L.marker(startLatLng, {
            icon: L.divIcon({
                className: 'rating',
                html: `<div>Rating: ${rating}</div>`
            })
        }).addTo(map);
    }

    // Update the ratings list
    var ratingList = document.getElementById('rating-list');
    var listItem = document.createElement('li');
    listItem.textContent = `Start: ${startLocation}, End: ${endLocation}, Rating: ${rating}`;
    ratingList.appendChild(listItem);

    alert('Rating submitted! Thank you.');
});

// Function to get latitude and longitude from location name (dummy function for demonstration)
function getLatLng(location) {
    // In a real scenario, use a geocoding service to convert location name to coordinates
    var dummyCoords = {
        'Location A': [22.97660, 88.44829],
        'Location B': [22.965, 88.525]
    };
    return dummyCoords[location] ? L.latLng(dummyCoords[location]) : null;
}
