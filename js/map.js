// Simple map
mapboxgl.accessToken = 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/planemad/ciix3a6g900tkalkidus93oy3', //stylesheet location
  hash: true,
  minZoom: 3.7,
  maxBounds: [[60.3,5.45], [102,39]]
});

// Add geocoder https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md
map.addControl(new mapboxgl.Geocoder({'position':'top-right','container':'map-search'}));

//Supress Tile errors
map.off('tile.error', map.onError);

// Define a layer collection for easy styling
var mapLayerCollection = {
  'myneta-loksabha': ['myneta-loksabha fill-0', 'myneta-loksabha fill-1', 'myneta-loksabha fill-2', 'myneta-loksabha fill-3', 'myneta-loksabha fill-4', 'myneta-loksabha fill-5', 'myneta-loksabha fill-6', 'myneta-loksabha fill-7', 'myneta-loksabha mask', 'myneta-loksabha selected'],
  'myneta-loksabha mask': ['myneta-loksabha mask'],
  'road': [
    'road-main',
    'road-construction',
    'road-rail',
    'road-motorway',
    'road-trunk',
    'road-street',
    'road-service-driveway',
    'road-path',
    'tunnel-motorway',
    'tunnel-trunk',
    'tunnel-main',
    'tunnel-street',
    'bridge-main',
    'bridge-street',
    'bridge-trunk',
    'bridge-motorway',
    'road-street_limited',
    'aeroway-runway',
    'aeroway-taxiway',
    'road-rail',
    'bridge-rail'
  ]
};



function array2rgb(color) {
  // Combine and return the values
  return 'rgba(' + color.map(function(x) {
    return x * 255;
  }).join() + ')';
}
