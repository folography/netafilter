// Utility functions to work with Mapbox GL JS maps
// Requires mapbox-gl.js and jquery

// Dependencies
var mapboxLayers = require('./layers').layers;
var mapboxDataset = require('./dataset');


// Toggle visibility of a layer
function toggle(id) {
    var currentState = map.getLayoutProperty(id, 'visibility');
    var nextState = currentState === 'none' ? 'visible' : 'none';
    map.setLayoutProperty(id, 'visibility', nextState);
}

// Hide all except one layer from a group
function showOnlyLayers(toggleLayers, showLayerItem) {
    for (var layerItem in toggleLayers) {
        for (var layer in toggleLayers[layerItem].layers) {
            if (showLayerItem == layerItem)
                map.setLayoutProperty(toggleLayers[layerItem].layers[layer], 'visibility', 'visible');
            else
                map.setLayoutProperty(toggleLayers[layerItem].layers[layer], 'visibility', 'none');
        }
    }
    // Highlight menu items
    $('.toggles a').removeClass('active');
    $('#' + showLayerItem).addClass('active');
}

// Toggle a set of filters for a set of layers
function toggleLayerFilters(layerItems, filterItem) {

    for (var i in layerItems) {
        for (var j in toggleLayers[layerItems[i]].layers) {

            var existingFilter = map.getFilter(toggleLayers[layerItems[i]].layers[j]);

            // Construct and add the filters if none exist for the layers
            if (typeof existingFilter == 'undefined') {
                map.setFilter(toggleLayers[layerItems[i]].layers[j], toggleFilters[filterItem].filter);
            } else {
                // Not implemented
                var newFilter = mergeLayerFilters(existingFilter, toggleFilters[filterItem].filter);
                map.setFilter(toggleLayers[layerItems[i]].layers[j], newFilter);
                // console.log(newFilter);
            }

        }
    }
}

// Parse the toggleFilters to build the compound filter arrays
function parseToggleFilters() {
    for (var filterItem in toggleFilters) {

        var parsedFilter = new Array();
        parsedFilter.push(toggleFilters[filterItem]['filter-mode']);

        for (var value in toggleFilters[filterItem]['filter-values']) {
            var filter = new Array();
            filter.push(toggleFilters[filterItem]['filter-compare'][0], toggleFilters[filterItem]['filter-compare'][1], toggleFilters[filterItem]['filter-values'][value]);
            parsedFilter.push(filter);
        }

        toggleFilters[filterItem]['filter'] = parsedFilter;
    }
}

// Merge two GL layer filters into one
function mergeLayerFilters(existingFilter, mergeFilter) {
    var newFilter = new Array();

    // If the layer has a simple single filter
    if (existingFilter[0] == '==') {
        newFilter.push("all", existingFilter, mergeFilter)
    }

    return newFilter;
}

// Return a square bbox of pixel coordinates from a given x,y point
function pixelPointToSquare(point, width) {
    var pointToSquare = [
        [point.x - width / 2, point.y - width / 2],
        [point.x + width / 2, point.y + width / 2]
    ];
    return pointToSquare;
}


//
// OpenStreetMap Utilities
//

// Return features near a paoint from a set of map layers
function queryLayerFeatures(map, point, opts) {

    var queryResults = map.queryRenderedFeatures(pixelPointToSquare(point, opts.radius), {
        layers: opts.layers
    });

    return queryResults;

}

//Open map location in JOSM
function openInJOSM(map, opts) {
    var bounds = map.getBounds();
    var top = bounds.getNorth();
    var bottom = bounds.getSouth();
    var left = bounds.getWest();
    var right = bounds.getEast();
    // var josmUrl = 'https://127.0.0.1:8112/load_and_zoom?left='+left+'&right='+right+'&top='+top+'&bottom='+bottom;
    var josmUrl = 'http://127.0.0.1:8111/load_and_zoom?left=' + left + '&right=' + right + '&top=' + top + '&bottom=' + bottom;
    $.ajax(josmUrl, function() {});
}


function createHTML(map, type, opts) {
    var HTML, url, obj_type;
    if ('open-obj-in-josm-button') {
        if (opts) {
            node_ids = ',n' + opts.select_node_ids[0] + ',n' + opts.select_node_ids[1];
            url = 'http://127.0.0.1:8111/load_object?new_layer=true&objects=' + opts.obj_type + opts.obj_id + node_ids + '&relation_members=true';
        } else {
            var bounds = map.getBounds();
            var top = bounds.getNorth();
            var bottom = bounds.getSouth();
            var left = bounds.getWest();
            var right = bounds.getEast();
            url = 'http://127.0.0.1:8111/load_and_zoom?left=' + left + '&right=' + right + '&top=' + top + '&bottom=' + bottom;
        }
    }
    HTML = '<a class="button short" target="_blank" href=' + url + '>Open in JOSM</a>';
    return HTML;
}


// Configure layer names for base map for proper layer positioning
var mapboxLayerIDs = {
    "water": "water",
    "label": "poi-scalerank3",
    "roads": "tunnel-street-low"
}


// Add commonly used data layers and styles to a Mapbox map
function addMapboxLayers(map, layers) {

    for (var i in layers) {
        if (layers[i] in mapboxLayers) {

            // Add the defined source and layers for each group
            var groupName = layers[i];

            for (var j in mapboxLayers[layers[i]].groups) {

                // Add the group source
                var sourceName = groupName + ' ' + mapboxLayers[layers[i]].groups[j].name;
                map.addSource(sourceName, mapboxLayers[layers[i]].groups[j].source);

                // Add the group style layers
                for (var k in mapboxLayers[layers[i]].groups[j].layers) {

                    // Generate unique layer ID and source
                    if ("name" in mapboxLayers[layers[i]].groups[j].layers[k]) {
                        mapboxLayers[layers[i]].groups[j].layers[k]["id"] = sourceName + ' ' + mapboxLayers[layers[i]].groups[j].layers[k].name;
                        delete mapboxLayers[layers[i]].groups[j].layers[k]["name"];
                    }
                    mapboxLayers[layers[i]].groups[j].layers[k]["source"] = sourceName;

                    map.addLayer(mapboxLayers[layers[i]].groups[j].layers[k]);

                }
            }
        }
        //Add Mapillary JS viewer on clicking a photograph location
        if (layers[i] == 'mapillary') {

            var mly = new Mapillary.Viewer(
                'mapillary-viewer',
                'MFo5YmpwMmxHMmxJaUt3VW14c0ZCZzoyMTgwOGNmZDljZjBmYjFh'
            );

            map.on('click', function(e) {

                document.getElementById('mapillary-viewer').style.visibility = "visible";

                var clickedFeatures = queryLayerFeatures(map, e.point, {
                    layers: ['mapillary traffic-sign location'],
                    radius: 15
                });


                if (clickedFeatures.length) {
                    console.log(clickedFeatures);

                    var imageKey = clickedFeatures[0].properties.image_key;
                    var imageUrl = 'https://d1cuyjsrcm0gby.cloudfront.net/' + imageKey + '/thumb-2048.jpg';

                    mly.moveToKey(imageKey);

                    //openInJOSM();
                } else {
                    document.getElementById('mapillary-viewer').style.visibility = "none";
                }
            });
        }

    }
}

// API
module.exports.addMapboxLayers = addMapboxLayers;
module.exports.queryLayerFeatures = queryLayerFeatures;
module.exports.getOverlayFeatures = mapboxDataset.getOverlayFeatures;
module.exports.createHTML = createHTML;
