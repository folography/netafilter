window.NetaFilter = {};

window.NetaFilter.filterModel = [{
  label: 'Change View',
  layer: 'myneta-loksabha fill-0',
  mapFilter: [],
  filters: [{ 
    label: 'Education',
    fieldName: 'myneta Education Points',
    mapFilter: [],
    filters:[{ color: '#ff0000',
        label: 'Illiterate',
        layer: 'myneta-loksabha fill-1',
        mapFilter: [["==", "myneta Education Points", 0]]
      },
      { color: '#ff641c',
        label: '8th pass',
        layer: 'myneta-loksabha fill-2',
        mapFilter: [["<=", "myneta Education Points", 9], [">", "myneta Education Points", 0]]
      },
      { color: '#ffae00',
        label: '10th pass',
        layer: 'myneta-loksabha fill-3',
        mapFilter: [["==", "myneta Education Points", 10]]
      },
      { color: '#ff0',
        label: 'Graduate',
        layer: 'myneta-loksabha fill-4',
        mapFilter: [["!=", "myneta Education Points", 13], ["!=", "myneta Education Points", 15]]
      },
      { color: '#eeff01',
        label: 'Graduate Professional',
        layer: 'myneta-loksabha fill-5',
        mapFilter: [["!=", "myneta Education Points", 16], ["!=", "myneta Education Points", 17]]
      },
      { color: '#b3ff00',
        label: 'Post Graduate',
        layer: 'myneta-loksabha fill-6',
        mapFilter: [["==", "myneta Education Points", 20]]
      },
      { color: '#3ce83c',
        label: 'PhD',
        layer: 'myneta-loksabha fill-7',
        mapFilter: [["==", "myneta Education Points", 25]]
      }
    ]
  },
  { 
    label: 'Assets',
    fieldName: 'myneta Total Assets',
    mapFilter: [],
    filters:[
      { color: '#ff0000',
        label: '< 1 Crore',
        layer: 'myneta-loksabha fill-1',
        mapFilter: [["<", "myneta Total Assets", 10000000]]
      },
      { color: '#ff641c',
        label: '8th pass',
        layer: 'myneta-loksabha fill-2',
        mapFilter: [["<=", "myneta Education Points", 9], [">", "myneta Education Points", 0]]
      },
      { color: '#ffae00',
        label: '10th pass',
        layer: 'myneta-loksabha fill-3',
        mapFilter: [["==", "myneta Education Points", 10]]
      },
      { color: '#ff0',
        label: 'Graduate',
        layer: 'myneta-loksabha fill-4',
        mapFilter: [["!=", "myneta Education Points", 13], ["!=", "myneta Education Points", 15]]
      },
      { color: '#eeff01',
        label: 'Graduate Professional',
        layer: 'myneta-loksabha fill-5',
        mapFilter: [["!=", "myneta Education Points", 16], ["!=", "myneta Education Points", 17]]
      },
      { color: '#b3ff00',
        label: 'Post Graduate',
        layer: 'myneta-loksabha fill-6',
        mapFilter: [["==", "myneta Education Points", 20]]
      },
      { color: '#3ce83c',
        label: 'PhD',
        layer: 'myneta-loksabha fill-7',
        mapFilter: [["==", "myneta Education Points", 25]]
      }
    ]
  }]
}];

// var netaFilterUpdater = function(state, action) {
//   if (!state) {
//     state = netaFilterModel;
//   }
//   switch (action.type) {
//     case 'CHECK_FILTER':
//       return state.map(function(node){
//         if (node.label === action.label) {
//           return node.active = true;
//         }
//       });
//     case 'UNCHECK_FILTER':
//       return state.map(function(node){
//         if (node.label === action.label) {
//           return node.active = false;
//         }
//       });
//     default:
//       return state;
//   }
// };

window.NetaFilter.filterView = {
  init: function(filters){
    this.ractive = new Ractive({
      el: '#netafilters',
      template: '#netafilters-template',
      data: {
        filters: filters,
        selectedFilters: []
      }
    });
    this.ractive.on('filterChange', function(e, layer, mapFilter){
      var self = this;
      // var checked = $.map($('form').find('input:checkbox:checked'), function(el){return $(el).data('label')});
      console.log(mapFilter);
      if (e.node.checked){
        this.set('selectedFilters', [].concat(this.get('selectedFilters'), {layer: layer, mapFilter: mapFilter}));
      } else {
        this.set('selectedFilters', this.get('selectedFilters').filter(function(f){f !== label;}));
      }                 
    })
  }
};

window.NetaFilter.mapView = {
  init: function(config){
    var self = this;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ';
    self.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/planemad/ciix3a6g900tkalkidus93oy3', //stylesheet location
      hash: true
    });

    this.ractive = new Ractive({
      data: {
        selectedConstituency: ''
      },
      oninit: function(){
        self.map.off('tile.error', self.map.onError);
        self.map.on('click', function(e){
          self.map.featuresAt(e.point, {
            layer: [config.layer],
            radius: 4,
            includeGeometry: true
          }, function(err, features) {
            // // Reset the tooltip if a different constituency is selected
            // if (this.get('selectedConstituency') !== features[0].properties['PC_NAME2']) {
            //   tooltip.setFeatures(features);
            //   this.set('selectedConstituency', features[0].properties['PC_NAME2']);
            // } else {
            //   // Selected constituency was unselected.
            //   this.set('selectedConstituency', '');
            // }
            // this.get('map').setFilter('myneta-loksabha selected', ['==', 'PC_NAME2', this.get('selectedConstituency')]);
          });
        });

        self.map.on('mousemove', function(e) {
          self.map.featuresAt(e.point, {
            layer: [config.baseLayer],
            radius: 4
          }, function(err, features) {
            // Reset tooltip only if no constituency is currently selected.
            // if (this.get('selectedConstituency') === '') {
            //   tooltip.setFeatures(features);
            // }
          });
        });
      }
    });
  },
  setFilter: function(layer, filter){
    this.map.setFilter(layer, filter);
  },
  applyFilters: function(selectedFilters){
    var self = this;
    selectedFilters.forEach(function(selectedFilter){
      selectedFilter.mapFilter.forEach(function(filter){
        self.setFilter(selectedFilter.layer, filter);
      })
    });
    // filters.forEach(function(node){
    //   console.log(selectedFilters);
    //   console.log(node.label);
    //   if (selectedFilters.indexOf(node.label) > -1) {
    //     node.filter.forEach(function(mapFilter){
    //       console.log(node.layer);
    //       console.log(mapFilter);
    //       netaMapView.setFilter(node.layer, mapFilter); 
    //     });
    //   }
    // })
  }
};

// var netaFilterUpdate = Redux.createStore(netaFilterUpdater);
// netaFilterStore.subscribe(function(){
//   netaFilterView.set('todos', todoStore.getState());
// })
// netaFilterView.init(netaFilterUpdate.getState());
window.NetaFilter.filterView.init(window.NetaFilter.filterModel);
window.NetaFilter.mapView.init(window.NetaFilter.filterModel[0].layer);
// netaFilterView.ractive.on('filter-changed', function(){
  // netaMapView.setFilter(netaFilterUpdate.dispatch({type: , label: }));
// })
