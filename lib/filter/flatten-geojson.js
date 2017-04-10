var projection = require('../projection');

function project(pt) {
  var projection = this;
  pt = projection.convert(pt);
  return pt;
}

function array(coords) {
  var projection = this;
  return coords.map(project, projection);
}

function convert(feature) {
  var projection = this, coords, type;
  if (!feature.geometry) {
    return feature;
  }
  coords = feature.geometry.coordinates;
  type = feature.geometry.type;
  if (type === 'Point') {
    coords = project.call(projection, coords);
  }
  else if (type === 'LineString') {
    coords = coords.map(project, projection);
  }
  else {
    coords = coords.map(array, projection);
  }
  return {
    coordinates: coords,
    type: type,
    properties: feature.properties
  };
}

function extract(features, x, y, zoom) {
  return features.map(convert, projection(x, y, zoom));
}

module.exports = extract;
