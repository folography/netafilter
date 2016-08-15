// Project map configuration
var Config = require('./config');
mapboxgl.accessToken = Config.accessToken;

var Merge = require('merge');

// Extend map creation options
// https://www.mapbox.com/mapbox-gl-js/api/#Map
var mapOptions = Merge({
    hash: true
}, Config.map);

// Inititalize the map
var map = new mapboxgl.Map(mapOptions);

// Add map controls
var geolocate = map.addControl(new mapboxgl.Geolocate({
    position: 'bottom-left'
}));
map.addControl(new mapboxgl.Navigation());

// Export module
module.exports = map;
