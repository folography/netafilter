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
    init: function(filters, selectedLayer) {
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
    init: function(filters, selectedLayer) {
        var self = this;

        mapboxgl.accessToken = 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ';
        self.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/planemad/cijswl6y7009rcakwxo2nuu7x',
            hash: true,
            maxBounds: [[50.3,5.45], [110,39]]
        });

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
                        template: '#myneta-template',
                        data: {},
                        setFeatures: function(feature) {
                            this.set({
                                id: feature.properties['myneta Sno'],
                                candidate: feature.properties['myneta Candidate'],
                                constituency: feature.properties['PC_NAME2'],
                                state: feature.properties['ST_NAME'],
                                category: feature.properties['Res'],
                                party: feature.properties['myneta Party'],
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

                        try {
                            // If active feature has changed, highlight it
                            if (activeFeature.properties['PC_NAME2'] != queryResults[0].properties['PC_NAME2']) {
                                self.map.setFilter('highlight-feature', ['==', 'PC_NAME2', queryResults[0].properties['PC_NAME2']]);
                            }
                        } catch (err) {}

                        activeFeature = queryResults[0];

                        // Show tooltip only if data is found
                        if (activeFeature) {
                            tooltip.setFeatures(activeFeature);
                            $('#map-tooltip').css({
                                top: e.point.y,
                                left: e.point.x + 20,
                                display: 'inline'
                            })
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

// Set the initial map theme to education data
window.NetaFilter.filterView.init(window.NetaFilter.filterModel, 'education');
window.NetaFilter.mapView.init(window.NetaFilter.filterModel, 'education');
