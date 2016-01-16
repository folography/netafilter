// Simple map
mapboxgl.accessToken = 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/planemad/ciix3a6g900tkalkidus93oy3', //stylesheet location
  hash: true
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

map.on('style.load', function(e) {

  var selectedRoadsSource = new mapboxgl.GeoJSONSource({});

  //Map tooltip
  var tooltip = new Ractive({
    el: '#map-tooltip',
    template: '#myneta-template',
    data: {},
    setFeatures: function(features){
      this.set({
        id: features[0].properties['myneta Sno'],
        candidate: features[0].properties['myneta Candidate'],
        constituency: features[0].properties['PC_NAME2'],
        state: features[0].properties['ST_NAME'],
        category: features[0].properties['Res'],
        party: features[0].properties['myneta Party'],
        cases: features[0].properties['myneta Criminal Case'],
        qualification: features[0].properties['myneta Education'],
        assets: (features[0].properties['myneta Total Assets']/10000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' crore',
        liabilities: (features[0].properties['myneta Liabilities']/10000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' crore'
      });
    }
  });

  var selectedConstituency = '';
  map.on('click', function(e){
    map.featuresAt(e.point, {
      layer: ['myneta-loksabha fill-0'],
      radius: 4,
      includeGeometry: true
    }, function(err, features) {
      // Reset the tooltip if a different constituency is selected
      if (selectedConstituency !== features[0].properties['PC_NAME2']) {
        tooltip.setFeatures(features);
        selectedConstituency = features[0].properties['PC_NAME2'];
      } else {
        // Selected constituency was unselected.
        selectedConstituency = '';
      }
      map.setFilter('myneta-loksabha selected', ['==', 'PC_NAME2', selectedConstituency]);
    });
  });

  map.on('mousemove', function(e) {
    map.featuresAt(e.point, {
      layer: ['myneta-loksabha fill-0'],
      radius: 4
    }, function(err, features) {
      // Reset tooltip only if no constituency is currently selected.
      if (selectedConstituency === '') {
        tooltip.setFeatures(features);
      }
    });
  });

  //Popups on click
  // map.on('click', function(e) {
  //   map.featuresAt(e.point, {
  //     radius: 10,
  //     layer: ['chennai-relief-camps', 'chennai-relief-camps-22nov'],
  //     includeGeometry: true
  //   }, function(err, features) {
  //     if (err) throw err;
  //
  //     if (features.length > 0) {
  //       var popupHTML = '<h5>' + features[0].properties.Name + '</h5><p>' + $('[data-map-layer=' + features[0].layer.id + ']').html() + '</p>';
  //       var popup = new mapboxgl.Popup()
  //         .setLngLat(features[0].geometry.coordinates)
  //         .setHTML(popupHTML)
  //         .addTo(map);
  //     }
  //   });
  // });

  // Update map legend from styles
  $('[data-map-layer]').each(function() {
    // Get the color of the feature from the map
    var obj = $(this).attr('data-map-layer');

    try {
      var color = map.getPaintProperty(obj, 'circle-color');
      // Set the legend color
      $(this).prepend('<div class="map-legend-circle" style="background:"' + array2rgb(color) + '></div>');
    } catch (e) {
      return;
    }
  });

});


function array2rgb(color) {
  // Combine and return the values
  return 'rgba(' + color.map(function(x) {
    return x * 255;
  }).join() + ')';
}
