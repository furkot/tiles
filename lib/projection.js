var d3 = require('d3-geo');

function projection(x, y, zoom) {
  var mercator = d3.geoMercator(), path;

  function setOptions(x, y, zoom) {
    var k = Math.pow(2, zoom) * 256; // size of the world in pixels
    mercator
      .translate([k / 2 - x * 256, k / 2 - y * 256]) // [0°,0°] in pixels
      .scale(k / 2 / Math.PI)
      .precision(0);
  }

  function convert(pt) {
    return mercator(pt);
  }

  function toPath(feature) {
    path = path || d3.geoPath().projection(mercator);
    return path(feature);
  }

  if (x !== undefined) {
    setOptions(x, y, zoom);
  }

  return {
    setOptions: setOptions,
    convert: convert,
    toPath: toPath
  };
}

module.exports = projection;
