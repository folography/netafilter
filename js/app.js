window.NetaFilter = {};

window.NetaFilter.filterModel = [{
    label: 'Education',
    color: '#f2f2f2',
    fieldName: 'myneta Education Points',
    layer: 'education',
    mapFilter: [["<=", "myneta Education Points", 25]],
    filters:[{ color: 'rgb(250, 0, 0)',
        label: 'Illiterate',
        layer: 'education-illiterate',
        mapFilter: [["==", "myneta Education Points", 0]]
      },
      { color: 'rgb(250, 100, 28)',
        label: '8th pass',
        layer: 'education-8th-pass',
        mapFilter: [["<=", "myneta Education Points", 9], [">", "myneta Education Points", 0]]
      },
      { color: 'rgb(255, 174, 0)',
        label: '10th pass',
        layer: 'education-10th-pass',
        mapFilter: [[">=", "myneta Education Points", 10], ["<=", "myneta Education Points", 12]]
      },
      { color: 'rgb(255, 255, 0)',
        label: 'Graduate',
        layer: 'education-graduate',
        mapFilter: [[">=", "myneta Education Points", 13], ["<=", "myneta Education Points", 15]]
      },
      { color: 'rgb(250, 255, 0)',
        label: 'Graduate Professional',
        layer: 'education-graduate-professional',
        mapFilter: [[">=", "myneta Education Points", 16], ["<=", "myneta Education Points", 17]]
      },
      { color: 'rgb(179, 255, 0)',
        label: 'Post Graduate',
        layer: 'education-post-graduate',
        mapFilter: [[">=", "myneta Education Points", 18], ["<=", "myneta Education Points", 20]]
      },
      { color: 'rgb(60, 232, 60)',
        label: 'PhD',
        layer: 'education-phd',
        mapFilter: [[">", "myneta Education Points", 20], ["<=", "myneta Education Points", 25]]
      }
    ]
  },
  { 
    label: 'Assets',
    fieldName: 'myneta Total Assets',
    layer: 'assets',
    color: '#f2f2f2',
    mapFilter: [["<=", "myneta Total Assets", 10000000000]],
    filters:[
      { color: 'rgb(250, 0, 0)',
        label: '< 1 Crore',
        layer: 'assets-lt-1cr',
        mapFilter: [["<=", "myneta Total Assets", 10000000]]
      },
      { color: 'rgb(255, 174, 0)',
        label: '< 3 Crore',
        layer: 'assets-lt-3cr',
        mapFilter: [[">", "myneta Total Assets", 10000000], ["<=", "myneta Total Assets", 30000000]]
      },
      { color: 'rgb(60, 232, 60)',
        label: '> 3 Crore',
        layer: 'assets-gt-3cr',
        mapFilter: [[">", "myneta Total Assets", 30000000]]
      }
    ]
  },
  { 
    label: 'Criminal Cases',
    fieldName: 'myneta Criminal Case',
    layer: 'criminal-cases',
    color: '#f2f2f2',
    mapFilter: [[">=", "myneta Criminal Case", 0]],
    filters:[
      { color: 'rgb(60, 232, 60)',
        label: '0',
        layer: 'criminal-cases-zero',
        mapFilter: [["==", "myneta Criminal Case", 0]]
      },
      { color: 'rgb(255, 174, 0)',
        label: '< 3',
        layer: 'criminal-cases-lt-3',
        mapFilter: [[">", "myneta Criminal Case", 0], ["<=", "myneta Criminal Case", 3]]
      },
      { color: 'rgb(250, 0, 0)',
        label: '> 3',
        layer: 'criminal-cases-gt-3',
        mapFilter: [[">", "myneta Criminal Case", 3]]
      }
    ]
  }
];


window.NetaFilter.filterView = {
  init: function(filters, selectedLayer){
    var self = this;
    this.ractive = new Ractive({
      el: '#netafilters',
      template: '#netafilters-template',
      data: {
        filters: filters,
        selectedLayer: selectedLayer
      }
    });
    this.ractive.on('changeFilter', function(e, layer, mapFilter){
      self.ractive.get('filters').forEach(function(parentFilter){
        if (parentFilter.layer === self.ractive.get('selectedLayer') || parentFilter.layer === layer) {
          window.NetaFilter.mapView.toggleVisibility(parentFilter.layer);
          parentFilter.filters.forEach(function(filter){
            window.NetaFilter.mapView.toggleVisibility(filter.layer);
          });
        }
      });
      self.ractive.set('selectedLayer', layer);
    });
    this.ractive.on('changeSubfilter', function(e, layer, mapFilter){
      window.NetaFilter.mapView.toggleVisibility(layer);
    });
  }
};

window.NetaFilter.mapView = {
  init: function(filters, selectedLayer){
    var self = this;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ';
    self.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/planemad/cijswl6y7009rcakwxo2nuu7x',
      hash: true
    });

    this.ractive = new Ractive({
      data: {
        selectedConstituency: ''
      },
      oninit: function(){

        self.map.off('tile.error', self.map.onError);

        var treeToLayer = function(tree){
          var parentLayer;
          var isSelected;
          tree.forEach(function(node){
            parentLayer = node.layer;
            self.map.on('style.load', function () {
              self.createLayer({name: node.layer, mapFilter: node.mapFilter, color: node.color, selected: node.layer === selectedLayer});
              if (typeof node.filters === 'object') {
                node.filters.forEach(function(subnode){
                  self.createLayer({name: subnode.layer, mapFilter: subnode.mapFilter, color: subnode.color, selected: node.layer === selectedLayer});
                })
              }
            });
          });
        }

        treeToLayer(filters);

        self.map.on('style.load', function () {
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
          var selectedLayer = self.map.addLayer({
           "id": "selected-constituency",
           "type": "line",
           "source": "mapbox://planemad.6wpgu5qz",
           "source-layer": "myneta-loksabha",
           "layout": {
              "visibility": "none"
           },
           "paint": {
              "line-color": 'cyan',
              "line-opacity": 1.0,
              "line-width": 5
           },
           "hidden": false
          }, 'aeroway_runway');

          self.map.on('click', function(e){
            self.map.featuresAt(e.point, {
              layer: ['myneta-baselayer'],
              radius: 4,
              includeGeometry: true
            }, function(err, features) {
              // Reset the tooltip if a different constituency is selected
              console.log(features);
              if (selectedConstituency !== features[0].properties['PC_NAME2']) {
                tooltip.setFeatures(features);
                selectedConstituency = features[0].properties['PC_NAME2'];
                self.map.setFilter('selected-constituency', ['==', 'PC_NAME2', selectedConstituency]);
                self.map.setLayoutProperty('selected-constituency', 'visibility', 'visible');
              } else {
                // Selected constituency was unselected.
                selectedConstituency = '';
                self.map.setLayoutProperty('selected-constituency', 'visibility', 'none');
              }
            });
          });

          self.map.on('mousemove', function(e) {
            self.map.featuresAt(e.point, {
              layer: ['myneta-baselayer'],
              radius: 4
            }, function(err, features) {
              // Reset tooltip only if no constituency is currently selected.
              if (selectedConstituency === '' && features.length > 0) {
                tooltip.setFeatures(features);
              }
            });
          });

        });
      }
    });
  },
  createLayer: function(config){
    console.log(config.selected);
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
        "fill-opacity": 1.0,
        "visibility": "visible"
     },
     "hidden": false
    }, 'aeroway_runway');
  },
  toggleVisibility: function(layer){
    var status = this.map.getLayoutProperty(layer, 'visibility');
    this.map.setLayoutProperty(layer, 'visibility', status === 'visible' ? 'none' : 'visible');
  }
};

window.NetaFilter.filterView.init(window.NetaFilter.filterModel, 'education');
window.NetaFilter.mapView.init(window.NetaFilter.filterModel, 'education');
