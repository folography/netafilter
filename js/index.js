// Bring in Mapbox GL helper functions
var mapboxglUtils = require('./mapbox-gl-utils');

// Initialize the map
var map = require('./map');

// Run the app
var app = require('./app');


// Set the initial map theme to education data
window.NetaFilter.filterView.init('education', map);
window.NetaFilter.mapView.init('education', map);

// Map ready
map.on('style.load', function(e) {



});
