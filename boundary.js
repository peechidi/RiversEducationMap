// Function to assign a random color to each LGA
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getLGAColor(lgaName) {
    switch (lgaName) {
        case 'Port Harcourt': return '#ff0000'; // Red for Port Harcourt
        case 'Obio/Akpor': return '#00ff00';   // Green for Obio/Akpor
        // Add more cases for other LGAs...
        default: return '#0000ff';             // Blue as default color
    }
}


fetch('Rivers_boundary.geojson')  // Ensure the file is served or stored correctly
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    style: function(features) {
                        return {
                            // color: 'black',        // Border color for LGAs
                            weight: 2,             // Border thickness
                            // fillColor: getRandomColor(), // Assign a random fill color
                            // fillOpacity: 0.6       // Transparency of the fill color
                        };
                    },
                    
                    pointToLayer: function(feature, latlng) {
                        // Customize marker options for point features
                        var markerOptions = {
                            radius: 0.5,                     // Size of the circleMarker
                            fillColor: 'white',              // Fill color for point markers
                            color: 'white',                 // Border color
                            // weight: 2,                      // Border thickness
                            fillOpacity: 1                // Fill opacity
                        };

                        // Create and return a circleMarker for the point
                        return L.circleMarker(latlng, markerOptions);
                    },
                    
                }).addTo(map);

                 // Add the search control to the map
                 var searchControl = new L.Control.Search({
                    layer: geoJsonLayer,  // Search within the GeoJSON layer
                    propertyName: 'searchLabel',  // The property to search for
                    marker: false,  // Disable adding markers on search
                    moveToLocation: function(latlng, title, map) {
                        // Set the view to the location when a search result is found
                        map.setView(latlng, 14);  // Zoom in when an item is found
                    }
                });

                // Add the search control to the map
                map.addControl(searchControl);
            })
            .catch(error => console.error('Error loading GeoJSON:', error));
            