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

  map.addLayer({
      "id": "myneta-loksabha-points education",
      "type": "circle",
      "source": "mapbox://planemad.7hf43eyu",
      "source-layer": "myneta-loksabha-points",
      "filter": ["!=","PC_CODE",-1],
      "paint": {
          "circle-color": 'hsl(116, 85%, 39%)',
          "circle-opacity": 0.6,
          "circle-radius": {
            "property": "myneta E_1",
            "stops": [
              [0, 0],
              [8, 2],
              [18, 4],
              [30, 30],
            ]
          }
      }
  }, 'myneta-loksabha selected');

  map.addLayer({
      "id": "myneta-loksabha-points assets",
      "type": "circle",
      "source": "mapbox://planemad.7hf43eyu",
      "source-layer": "myneta-loksabha-points",
      "filter": ["!=","PC_CODE",-1],
      "paint": {
          "circle-color": 'white',
          "circle-opacity": 0.4,
          "circle-radius": {
            "property": "myneta Tot",
            "stops": [
              [0,0],
              [10000,1],
              [1000000,4],
              [100000000,10],
              [10000000000,30]
            ]
          }
      }
  }, 'myneta-loksabha selected');

  map.addLayer({
      "id": "myneta-loksabha-points criminal",
      "type": "circle",
      "source": "mapbox://planemad.7hf43eyu",
      "source-layer": "myneta-loksabha-points",
      "filter": ["!=","PC_CODE",-1],
      "paint": {
          "circle-color": '#f37321',
          "circle-opacity": 0.7,
          "circle-radius": {
            "property": "myneta Cri",
            "stops": [
              [0,0],
              [4,8],
              [30,30]
            ]
          }
      }
  }, 'myneta-loksabha selected');

 map.addLayer({
      "id": "myneta-loksabha fill",
      "type": "fill",
      "source": "mapbox://planemad.6wpgu5qz",
      "source-layer": "myneta-loksabha",
      "layout": {
          "visibility": "visible"
      },
      "paint": {
          "fill-color": '#eee',
          "fill-opacity": 0.1
      }
  }, 'myneta-loksabha selected');

});
