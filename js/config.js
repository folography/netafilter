// Configure your Mapbox map project

var project = {
    name: 'Netafilter Parliament Constituency Visualization',
    map: {
      container: 'map',
      style: 'mapbox://styles/planemad/cijswl6y7009rcakwxo2nuu7x',
      zoom: 5.1,
      center: [80.181,27.161],
      maxBounds: [[50.3,5.45], [110,39]]
    },
    accessToken: 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiemdYSVVLRSJ9.g3lbg_eN0kztmsfIPxa9MQ'
}

// Export module
module.exports = project;
