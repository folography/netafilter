(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Configure your Mapbox map project

var project = {
    name: 'Netafilter Parliament Constituency Visualization',
    map: {
      container: 'map',
      style: 'mapbox://styles/planemad/cijswl6y7009rcakwxo2nuu7x',
      maxBounds: [[50.3,5.45], [110,39]]
    },
    accessToken: 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ'
}

// Export module
module.exports = project;

},{}],2:[function(require,module,exports){
// Project Settings
var map = require('./map');
var mapboxglUtils = require('./mapbox-gl-utils');

// Map ready
map.on('style.load', function(e) {

});

},{"./map":4,"./mapbox-gl-utils":6}],3:[function(require,module,exports){
//
// Definition of Mapbox source layers and corresponding GL styles to overlay
//


// Configure common data layers
// "template-name": {
//   "groups": [{
//     "name": "group-name",
//     "source": {},
//     "layers": [{
//       "name": "layer-name",
//     }]
//   }]
// },

var mapboxLayers = {
    "toronto": {
        "groups": [{
            "name": "centreline",
            "source": {
                type: 'vector',
                url: 'mapbox://planemad.dgman5ok'
            },
            "layers": [{
                "id": "toronto-intersection-centreline",
                "type": "line",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-intersection-centreline",
                "minzoom": 15,
                "interactive": true,
                "layout": {
                    "visibility": "visible",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "hsl(307, 100%, 84%)",
                    "line-width": 1,
                    "line-opacity": 1
                }
            }]
        }, {
            "name": "restrictions",
            "source": {
                type: 'vector',
                url: 'mapbox://planemad.cymhxqyx'
            },
            "layers": [{
                "id": "toronto-turn-restrictions copy",
                "type": "circle",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "circle-color": "hsl(0, 0%, 25%)",
                    "circle-radius": 4,
                    "circle-opacity": {
                        "base": 1,
                        "stops": [
                            [
                                14,
                                1
                            ],
                            [
                                19,
                                0
                            ]
                        ]
                    }
                }
            }, {
                "id": "toronto-turn-restrictions type left",
                "type": "circle",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "filter": [
                    "==",
                    "TURN_DIR_C",
                    "LEFT"
                ],
                "layout": {},
                "paint": {
                    "circle-color": "hsl(0, 100%, 49%)",
                    "circle-radius": 3,
                    "circle-opacity": 0.8
                }
            }, {
                "id": "toronto-turn-restrictions type right",
                "type": "circle",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "filter": [
                    "==",
                    "TURN_DIR_C",
                    "RIGHT"
                ],
                "layout": {},
                "paint": {
                    "circle-color": "hsl(43, 100%, 50%)",
                    "circle-radius": 3,
                    "circle-opacity": 0.8
                }
            }, {
                "id": "toronto-turn-restrictions type straight",
                "type": "circle",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "filter": [
                    "==",
                    "TURN_DIR_C",
                    "STRAIGHT"
                ],
                "layout": {},
                "paint": {
                    "circle-color": "hsl(98, 100%, 51%)",
                    "circle-radius": 3,
                    "circle-opacity": 0.8
                }
            }, {
                "id": "toronto-turn-restrictions",
                "type": "line",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(0, 100%, 50%)",
                    "line-width": 2
                }
            }, {
                "id": "toronto-turn-restrictions no-left",
                "type": "line",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "filter": [
                    "==",
                    "TURN_DIR_C",
                    "LEFT"
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(0, 100%, 49%)",
                    "line-width": 2
                }
            }, {
                "id": "toronto-turn-restrictions no-right",
                "type": "line",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "filter": [
                    "==",
                    "TURN_DIR_C",
                    "RIGHT"
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(43, 100%, 50%)",
                    "line-width": 2
                }
            }, {
                "id": "toronto-turn-restrictions no-straight",
                "type": "line",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "filter": [
                    "==",
                    "TURN_DIR_C",
                    "STRAIGHT"
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(98, 100%, 51%)",
                    "line-width": 2
                }
            }, {
                "id": "toronto-turn-restrictions label",
                "type": "symbol",
                "metadata": {
                    "mapbox:group": "1466615567526.5813"
                },
                "source": "composite",
                "source-layer": "toronto-no-other-turns",
                "interactive": true,
                "layout": {
                    "text-size": 12,
                    "text-allow-overlap": false,
                    "icon-image": "triangle-15",
                    "text-ignore-placement": false,
                    "symbol-spacing": 2,
                    "text-font": [
                        "Clan Offc Pro Medium",
                        "Arial Unicode MS Regular"
                    ],
                    "icon-rotate": -269,
                    "icon-allow-overlap": false,
                    "symbol-placement": "line",
                    "text-justify": "center",
                    "text-offset": [
                        0, -0.5
                    ],
                    "icon-optional": false,
                    "text-rotation-alignment": "map",
                    "icon-size": 0.6,
                    "text-anchor": "bottom",
                    "text-field": "NO {TURN_DIR_C}"
                },
                "paint": {
                    "text-color": "hsl(0, 1%, 40%)",
                    "text-halo-color": "hsl(0, 0%, 100%)",
                    "text-halo-width": 2
                }
            }]
        }]
    }
}

module.exports = {
  layers: mapboxLayers
};

},{}],4:[function(require,module,exports){
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

},{"./config":1,"merge":8}],5:[function(require,module,exports){
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

},{"../config":1}],6:[function(require,module,exports){
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

},{"./dataset":5,"./layers":7}],7:[function(require,module,exports){
//
// Definition of some common Mapbox source layers and corresponding GL styles
//

var customLayers = require('../layers').layers;
var Merge = require('merge');

// Configuration for some layers
var mapillaryRestrictionsFilter = ["in", "value", "regulatory--no-left-turn--us", "regulatory--no-right-turn--us", "regulatory--no-straight-through--us", "regulatory--no-u-turn--us", "regulatory--no-left-or-u-turn--us", "regulatory--no-left-turn--ca", "regulatory--no-right-turn--ca", "regulatory--no-straight-through--ca", "regulatory--no-u-turn--ca", "regulatory--no-left-or-u-turn--ca"]


// Configure common data layers
// "template-name": {
//   "groups": [{
//     "name": "group-name",
//     "source": {},
//     "layers": [{
//       "name": "layer-name",
//     }]
//   }]
// },

var mapboxLayers = {
    "osm-navigation": {
        "groups": [{
            "name": "turn-restrictions",
            "source": {
                type: 'vector',
                url: 'mapbox://planemad.turnrestrictions'
            },
            "layers": [{
                "id": "noturn",
                "type": "line",
                "source-layer": "turnrestrictions",
                "minzoom": 13,
                "interactive": true,
                "layout": {
                    "visibility": "visible",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "purple",
                    "line-width": 1
                }
            }, {
                "id": "noturn from",
                "type": "line",
                "source-layer": "turnrestrictions",
                "minzoom": 13,
                "interactive": true,
                "filter": [
                    "==",
                    "relations_role",
                    "from"
                ],
                "layout": {
                    "visibility": "visible",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "hsl(0, 51%, 77%)",
                    "line-opacity": 0.55,
                    "line-width": 4
                }
            }, {
                "id": "noturn via",
                "type": "circle",
                "source-layer": "turnrestrictions",
                "minzoom": 13,
                "interactive": true,
                "filter": [
                    "all", [
                        "==",
                        "$type",
                        "Point"
                    ],
                    [
                        "==",
                        "relations_role",
                        "via"
                    ]
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "circle-color": "purple",
                    "circle-radius": 3
                }
            }]
        }]
    },
    "mapillary": {
        "groups": [{
            "name": "traffic-sign",
            "source": {
                "type": "vector",
                "tiles": [
                    // "https://crossorigin.me/http://mapillary-vector.mapillary.io/tiles/{z}/{x}/{y}.mapbox?ors=key,l,package,value,validated,image_key,user,score,obj,rect",
                    "http://mapillary-vector.mapillary.io/tiles/{z}/{x}/{y}.mapbox?ors=key,l,package,value,validated,image_key,user,score,obj,rect",
                ],
                "minzoon": 14,
                "maxzoom": 18
            },
            "layers": [{
                "name": "location",
                "type": "circle",
                'source-layer': 'ors',
                "paint": {
                    "circle-radius": 2,
                    "circle-color": "grey"
                }
            }, {
                "name": "turn-restriction",
                "type": "circle",
                'source-layer': 'ors',
                "paint": {
                    "circle-radius": 4,
                    "circle-color": "#05d107"
                },
                "filter": mapillaryRestrictionsFilter
            }, {
                "name": "turn-restriction-label",
                "type": "symbol",
                "source-layer": "ors",
                "layout": {
                    "text-field": "{value}",
                    "text-size": 8,
                    "text-offset": [0, 2]
                },
                "paint": {
                    "text-color": "black",
                    "text-halo-color": "white",
                    "text-halo-width": 1
                }
            }]
        }, {
            "name": "coverage",
            "source": {
                "type": "vector",
                "tiles": [
                    "https://d2munx5tg0hw47.cloudfront.net/tiles/{z}/{x}/{y}.mapbox"
                ],
                "minzoom": 2,
                "maxzoom": 16
            },
            "layers": [{
                "name": "line",
                "type": "line",
                "source-layer": "mapillary-sequences",
                "paint": {
                    "line-color": '#62fa5f',
                    "line-width": 2,
                    "line-opacity": 0.3
                }
            }]
        }]
    }
}

// Export module
module.exports = {
  layers: Merge(mapboxLayers,customLayers)
};

},{"../layers":3,"merge":8}],8:[function(require,module,exports){
/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},{}]},{},[2]);
