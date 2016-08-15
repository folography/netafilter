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
