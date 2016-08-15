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
