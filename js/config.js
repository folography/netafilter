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
