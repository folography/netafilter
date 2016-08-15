// Dependencies
var Config = require('./config');
mapboxgl.accessToken = Config.accessToken;

var Merge = require('merge');

// Configure map creation options
// https://www.mapbox.com/mapbox-gl-js/api/#Map
var mapOptions = Merge({
    hash: true
}, Config.map);

var map = new mapboxgl.Map(mapOptions);

// Add default controls
var geolocate = map.addControl(new mapboxgl.Geolocate({
    position: 'bottom-right'
}));
map.addControl(new mapboxgl.Navigation());

// Export module
module.exports = map;
