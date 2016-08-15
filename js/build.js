(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Read map legend options
var legend = require('./map-legend');

window.NetaFilter = {};

// The interactive map legend model
window.NetaFilter.filterModel = [{
    label: 'Education',
    color: '#f2f2f2',
    fieldName: 'myneta Education Points',
    layer: 'education',
    mapFilter: [
        ["<=", "myneta Education Points", 25]
    ],
    filters: [{
        color: 'rgb(250, 0, 0)',
        label: 'Illiterate',
        layer: 'education-illiterate',
        mapFilter: [
            ["==", "myneta Education Points", 0]
        ]
    }, {
        color: 'rgb(250, 100, 28)',
        label: '8th pass',
        layer: 'education-8th-pass',
        mapFilter: [
            [">", "myneta Education Points", 0],
            ["<=", "myneta Education Points", 8]
        ]
    }, {
        color: 'rgb(255, 174, 0)',
        label: '12th pass',
        layer: 'education-12th-pass',
        mapFilter: [
            [">", "myneta Education Points", 8],
            ["<=", "myneta Education Points", 12]
        ]
    }, {
        color: 'rgb(255, 255, 0)',
        label: 'Graduate',
        layer: 'education-graduate',
        mapFilter: [
            [">", "myneta Education Points", 12],
            ["<=", "myneta Education Points", 15]
        ]
    }, {
        color: 'rgb(250, 255, 0)',
        label: 'Graduate Professional',
        layer: 'education-graduate-professional',
        mapFilter: [
            [">", "myneta Education Points", 15],
            ["<=", "myneta Education Points", 17]
        ]
    }, {
        color: 'rgb(179, 255, 0)',
        label: 'Post Graduate',
        layer: 'education-post-graduate',
        mapFilter: [
            [">", "myneta Education Points", 17],
            ["<=", "myneta Education Points", 20]
        ]
    }, {
        color: 'rgb(60, 232, 60)',
        label: 'PhD',
        layer: 'education-phd',
        mapFilter: [
            [">", "myneta Education Points", 20],
            ["<=", "myneta Education Points", 25]
        ]
    }]
}, {
    label: 'Assets',
    fieldName: 'myneta Total Assets',
    layer: 'assets',
    color: '#f2f2f2',
    mapFilter: [
        ["<=", "myneta Total Assets", 10000000000]
    ],
    filters: [{
        color: '#f1eef6',
        label: '< 1 Crore',
        layer: 'assets-lt-1cr',
        mapFilter: [
            ["<=", "myneta Total Assets", 10000000]
        ]
    }, {
        color: '#d4b9da',
        label: '> 1 Crore',
        layer: 'assets-lt-3cr',
        mapFilter: [
            [">", "myneta Total Assets", 10000000],
            ["<=", "myneta Total Assets", 30000000]
        ]
    }, {
        color: '#c994c7',
        label: '> 3 Crore',
        layer: 'assets-gt-10cr',
        mapFilter: [
            [">", "myneta Total Assets", 30000000],
            ["<=", "myneta Total Assets", 100000000]
        ]
    }, {
        color: '#df65b0',
        label: '> 10 Crore',
        layer: 'assets-gt-20cr',
        mapFilter: [
            [">", "myneta Total Assets", 100000000],
            ["<=", "myneta Total Assets", 200000000]
        ]
    }, {
        color: '#e7298a',
        label: '> 20 Crore',
        layer: 'assets-gt-50cr',
        mapFilter: [
            [">", "myneta Total Assets", 200000000],
            ["<=", "myneta Total Assets", 500000000]
        ]
    }, {
        color: '#ce1256',
        label: '> 50 Crore',
        layer: 'assets-gt-100cr',
        mapFilter: [
            [">", "myneta Total Assets", 500000000],
            ["<=", "myneta Total Assets", 1000000000]
        ]
    }, {
        color: '#91003f',
        label: '> 100 Crore',
        layer: 'assets-gt-200cr',
        mapFilter: [
            [">", "myneta Total Assets", 1000000000]
        ]
    }]
}, {
    label: 'Criminal Cases',
    fieldName: 'myneta Criminal Case',
    layer: 'criminal-cases',
    color: '#f2f2f2',
    mapFilter: [
        [">=", "myneta Criminal Case", 0]
    ],
    filters: [{
        color: '#ddffb3',
        label: '0',
        layer: 'criminal-cases-0',
        mapFilter: [
            ["==", "myneta Criminal Case", 0]
        ]
    }, {
        color: '#fed976',
        label: '< 1',
        layer: 'criminal-cases-lt-2',
        mapFilter: [
            [">", "myneta Criminal Case", 0],
            ["<=", "myneta Criminal Case", 1]
        ]
    }, {
        color: '#feb24c',
        label: '< 3',
        layer: 'criminal-cases-lt-3',
        mapFilter: [
            [">", "myneta Criminal Case", 1],
            ["<=", "myneta Criminal Case", 3]
        ]
    }, {
        color: '#fd8d3c',
        label: '< 6',
        layer: 'criminal-cases-lt-6',
        mapFilter: [
            [">", "myneta Criminal Case", 3],
            ["<=", "myneta Criminal Case", 6]
        ]
    }, {
        color: '#fc4e2a',
        label: '< 12',
        layer: 'criminal-cases-lt-12',
        mapFilter: [
            [">", "myneta Criminal Case", 6],
            ["<=", "myneta Criminal Case", 12]
        ]
    }, {
        color: '#e31a1c',
        label: '< 18',
        layer: 'criminal-cases-lt-18',
        mapFilter: [
            [">", "myneta Criminal Case", 12],
            ["<=", "myneta Criminal Case", 18]
        ]
    }, {
        color: '#b10026',
        label: '> 18',
        layer: 'criminal-cases-gt-18',
        mapFilter: [
            [">", "myneta Criminal Case", 18]
        ]
    }]
}];

// Create the legend view
window.NetaFilter.filterView = {
    init: function(selectedLayer) {
        filters = window.NetaFilter.filterModel;
        var self = this;
        this.ractive = new Ractive({
            el: '#netafilters',
            template: '#netafilters-template',
            data: {
                filters: filters,
                selectedLayer: selectedLayer
            }
        });

        // Update map filters on legend interaction
        this.ractive.on('changeFilter', function(e, layer, mapFilter) {
            self.ractive.get('filters').forEach(function(parentFilter) {
                if (parentFilter.layer === self.ractive.get('selectedLayer') || parentFilter.layer === layer) {
                    window.NetaFilter.mapView.toggleVisibility(parentFilter.layer);
                    parentFilter.filters.forEach(function(filter) {
                        window.NetaFilter.mapView.toggleVisibility(filter.layer);
                    });
                }
            });
            self.ractive.set('selectedLayer', layer);
        });
        this.ractive.on('changeSubfilter', function(e, parentLayer, layer, mapFilter) {
            if (parentLayer === self.ractive.get('selectedLayer')) {
                window.NetaFilter.mapView.toggleVisibility(layer);
            }
        });
    }
};


// Create the map
window.NetaFilter.mapView = {
    init: function(selectedLayer, map) {
        var self = this;

        filters = window.NetaFilter.filterModel;
        self.map = map;

        this.ractive = new Ractive({
            data: {
                selectedConstituency: ''
            },
            oninit: function() {

                // Creates map layers using a filter tree
                var treeToLayer = function(tree) {
                    var parentLayer;
                    var isSelected;
                    tree.forEach(function(node) {
                        parentLayer = node.layer;
                        self.map.on('style.load', function() {
                            self.createLayer({
                                name: node.layer,
                                mapFilter: node.mapFilter,
                                color: node.color,
                                selected: node.layer === selectedLayer
                            });
                            if (typeof node.filters === 'object') {
                                node.filters.forEach(function(subnode) {
                                    self.createLayer({
                                        name: subnode.layer,
                                        mapFilter: subnode.mapFilter,
                                        color: subnode.color,
                                        selected: node.layer === selectedLayer
                                    });
                                })
                            }
                        });
                    });
                }

                treeToLayer(filters);


                self.map.on('style.load', function() {

                    // The map tooltip
                    var tooltip = new Ractive({
                        el: '#map-tooltip',
                        template: '#myneta-tooltip',
                        data: {},
                        setFeatures: function(feature) {
                            this.set({
                                id: feature.properties['myneta Sno'],
                                candidate: feature.properties['myneta Candidate'],
                                constituency: feature.properties['PC_NAME2'],
                                state: feature.properties['ST_NAME'],
                                category: feature.properties['Res'],
                                party: feature.properties['myneta Party'].replace(/\(|\)/g, '').replace(/\s+/g, '-').replace(/\./g, ''),
                                cases: feature.properties['myneta Criminal Case'],
                                qualification: feature.properties['myneta Education'],
                                assets: (feature.properties['myneta Total Assets'] / 10000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' crore',
                                liabilities: (feature.properties['myneta Liabilities'] / 10000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' crore'
                            });
                        }
                    });

                    // Create a layer to highlight hovered over features
                    var selectedLayer = self.map.addLayer({
                        "id": "highlight-feature",
                        "type": "fill",
                        "source": "mapbox://planemad.6wpgu5qz",
                        "source-layer": "myneta-loksabha",
                        "layout": {
                            "visibility": "false"
                        },
                        "paint": {
                            "fill-color": 'white',
                            "fill-opacity": 0.6
                        },
                        "hidden": false
                    }, 'myneta-loksabha selected');

                    var activeFeature = {};

                    self.map.on('mousemove', function(e) {

                        // Get feature at mouse pointer
                        var queryResults = self.map.queryRenderedFeatures(e.point, {
                            layers: ['myneta-baselayer']
                        });

                        activeFeature = queryResults[0];

                        // Change cursor on interactive objects
                        map.getCanvas().style.cursor = (queryResults.length) ? 'pointer' : '';

                        // Remove tooltip if no results
                        if (!queryResults.length) {

                        }else{
                          tooltip.setFeatures(activeFeature);
                        }

                        try {
                            // If active feature has changed, highlight it
                            if (activeFeature.properties['PC_NAME2'] != queryResults[0].properties['PC_NAME2']) {
                                self.map.setFilter('highlight-feature', ['==', 'PC_NAME2', queryResults[0].properties['PC_NAME2']]);
                            }
                        } catch (err) {}



                        // Show tooltip only if data is found
                        if (activeFeature) {

                        } else {
                            // Selected constituency was unselected.
                            self.map.setLayoutProperty('highlight-feature', 'visibility', 'none');
                            $('#map-tooltip').css({
                                display: 'none'
                            })
                        }

                    });

                });
            }
        });
    },
    // Create map layers based on legend filter model
    createLayer: function(config) {
        this.map.addLayer({
            "id": config.name,
            "type": "fill",
            "source": "mapbox://planemad.6wpgu5qz",
            "source-layer": "myneta-loksabha",
            "filter": [].concat('all', config.mapFilter),
            "layout": {
                "visibility": config.selected ? "visible" : "none"
            },
            "paint": {
                "fill-color": config.color,
                "fill-opacity": 1.0
            }
        }, 'myneta-loksabha selected');
    },
    toggleVisibility: function(layer) {
        var status = this.map.getLayoutProperty(layer, 'visibility');
        this.map.setLayoutProperty(layer, 'visibility', status === 'visible' ? 'none' : 'visible');
    }
};

},{"./map-legend":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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



});

},{"./app":1,"./map":6,"./mapbox-gl-utils":7}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
var legend = [{
  label: "Education",
  mapLayer: "myneta-education",
  mapPaintProperties: [{
    "fill-color" : {
      "type": "interval",
      "property": "myneta Education Points",
      "stops": [
        [0, "rgb(250, 0, 0)", "Illiterate"],
        [8, "rgb(250, 100, 28)", "8th Pass"],
        [12, "rgb(255, 174, 0)", "12th Pass"],
        [17, "rgb(255, 255, 0)", "Graduate"],
        [20, "rgb(179, 255, 0)", "Post Graduate"],
        [26, "rgb(60, 232, 60)", "Doctorate"]
      ]
    }
  }]
}]

module.exports = legend;

},{}],6:[function(require,module,exports){
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
    position: 'bottom-right'
}));
map.addControl(new mapboxgl.Navigation());

// Export module
module.exports = map;

},{"./config":2,"merge":9}],7:[function(require,module,exports){
// Utility functions to work with Mapbox GL JS maps
// Requires mapbox-gl.js and jquery

// Dependencies
var mapboxLayers = require('./layers').layers;
// var mapboxDataset = require('./dataset');


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
module.exports.createHTML = createHTML;

},{"./layers":8}],8:[function(require,module,exports){
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

},{"../layers":4,"merge":9}],9:[function(require,module,exports){
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
},{}]},{},[3]);
