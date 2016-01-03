// Define map locations
var mapLocation = {
  'reset': {
    'center': [80.2, 13],
    'zoom': 11,
    'pitch': 0,
    'bearing': 0
  },
  'pallikaranai': {
    'center': [80.22, 12.926],
    'zoom': 13.8,
    'pitch': 45,
    'bearing': 90
  },
  'adyar-river': {
    'center': [80.261, 13.014],
    'zoom': 13.8,
    'pitch': 60,
    'bearing': -64,
    'highlight': 'water'
  },
  'cooum-river': {
    'center': [80.281, 13.074],
    'zoom': 13.8,
    'pitch': 60,
    'bearing': -64
  },
  'mudichur': {
    'center': [80.06, 12.91],
    'zoom': 13,
    'pitch': 50,
    'bearing': -10
  },
  'aminjikarai': {
    'center': [80.21, 13.07],
    'zoom': 13.8,
    'pitch': 50,
    'bearing': -10
  },
  'velachery': {
    'center': [80.21, 12.97],
    'zoom': 13.8,
    'pitch': 50,
    'bearing': -10
  },
  'omr': {
    'center': [80.23, 12.88],
    'zoom': 13,
    'pitch': 70,
    'bearing': -10
  }
};


// Simple map
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdHlhZGlwYW5rYXIiLCJhIjoiVHJuZl9ScyJ9.p0DPbggaxwE7-UDr6hK5tQ';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/adityadipankar/ciiwqp8xk00kh2lkn990gphfa', //stylesheet location
  hash: true
});
mapLocate('reset');

//Supress Tile errors
map.off('tile.error', map.onError);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.Navigation());

// Define a layer collection for easy styling
var mapLayerCollection = {
  'education': ['myneta-loksabha-edupoints-0', 'myneta-loksabha-edupoints-5to12', 'myneta-loksabha-edupoints-13to17','myneta-loksabha-edupoints-20','myneta-loksabha-edupoints-25'],
  'assets': ['Net-assets-upto10lac', 'Net-assets-10to50lac', 'Net-assets-50lacto1Cr', 'Net-assets-1Crto10Cr', 'Net-assets-10Crto100Cr', 'Net-assets-100Cr+'],
  'cartodem': ['chennai-cartodem'],
  'buildings': ['building'],
  'road-subways': ['tunnel-motorway', 'tunnel-trunk', 'tunnel-main', 'tunnel-street'],
  'chennai-relief-camps': ['chennai-relief-camps'],
  'chennai-relief-camps-22nov': ['chennai-relief-camps-22nov'],
  'chennai-water-logged-points': ['chennai-water-logged-points'],
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

  //Live query
  map.on('mousemove', function(e) {
    map.featuresAt(e.point, {
      radius: 4
    }, function(err, features) {
      if (err) throw err;

      var featuresList = '';
      if (features[0]) {
        if (features[0].properties.class)
          featuresList += features[0].properties.class + ' ';
        if (features[0].properties.type)
          featuresList += features[0].properties.type + '';
        if (features[0].properties.name)
          featuresList += '- ' + features[0].properties.name;
        $('#map-query').html(featuresList);
      }
    });
  });

  //Popups on click
  map.on('click', function(e) {
    map.featuresAt(e.point, {
      radius: 10,
      layer: ['chennai-relief-camps', 'chennai-relief-camps-22nov'],
      includeGeometry: true
    }, function(err, features) {
      if (err) throw err;

      if (features.length > 0) {
        var popupHTML = '<h5>' + features[0].properties.Name + '</h5><p>' + $('[data-map-layer=' + features[0].layer.id + ']').html() + '</p>';
        var popup = new mapboxgl.Popup()
          .setLngLat(features[0].geometry.coordinates)
          .setHTML(popupHTML)
          .addTo(map);
      }
    });
  });

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
//Update feature count
function updateFeatureCount(data) {
  var count = data.features.length;
  $('#feature-count').html(count);
}

function array2rgb(color) {
  // Combine and return the values
  return 'rgba(' + color.map(function(x) {
    return x * 255;
  }).join() + ')';
}
