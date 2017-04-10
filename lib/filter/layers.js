var layers = ['water', 'landuse', 'roads', 'buildings'];

function collect(feature) {
  var features = this.features, layer = this.layer, zoom = this.zoom;
  // Don't include any label placement points
  if (feature.properties.label_placement) {
    return;
  }
  // Don't show large buildings at z13 or below.
  if (zoom <= 13 && layer === 'buildings') {
    return;
  }
  // Don't show small buildings at z14 or below.
  if(zoom <= 14 && layer === 'buildings' && feature.properties.area < 2000) {
    return;
  }
  feature.layer_name = layer;
  features.push(feature);
}

function convert(result, layer) {
  var data = result.data;
  if (data[layer]) {
    result.layer = layer;
    data[layer].features.forEach(collect, result);
  }
  return result;
}

function compare(a, b) {
  return a.properties.sort_rank ? a.properties.sort_rank - b.properties.sort_rank : 0;
}

// build up a single concatenated array of all tile features from all tile layers
function collateLayers(geojson, x, y, zoom) {
  var features = layers.reduce(convert, {
    data: geojson,
    zoom: zoom,
    features: []
  }).features;
  features.sort(compare);
  return features;
}

module.exports = collateLayers;
