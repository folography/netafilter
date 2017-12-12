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
map.addControl(new MapboxGeocoder({accessToken: mapboxgl.accessToken, country: 'IN'}));

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

// Export module
module.exports = map;
