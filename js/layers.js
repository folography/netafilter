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
