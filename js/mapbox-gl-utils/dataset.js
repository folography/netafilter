// Project Settings
var Config = require('../config').mapping.status.dataset;

// Get data from a Mapbox dataset
var overlayFeatureCollection = {
    'type': 'FeatureCollection',
    'features': []
};

function getOverlayFeatures(startID) {

    var url = 'https://api.mapbox.com/datasets/v1/' + Config.user + '/' + Config.id + '/features';

    var params = {
        'access_token': Config.accessToken
    };

    // Begin with the last feature of previous request
    if (startID) {
        params.start = startID;
    }

    $.getJSON(url, params, function(data) {

        console.log(data);

        if (data.features.length) {
            data.features.forEach(function(feature) {
                // Add dataset feature id as a property
                feature.properties.id = feature.id;
            });
            overlayFeatureCollection.features = overlayFeatureCollection.features.concat(data.features);
            var lastFeatureID = data.features[data.features.length - 1].id;
            getOverlayFeatures(lastFeatureID);
            overlayDataSource.setData(overlayFeatureCollection);
        }
        overlayDataSource.setData(overlayFeatureCollection);
    });
}

// Export module
module.exports = {
  getOverlayFeatures: getOverlayFeatures
};
