var projection = require('../projection');
var svgNS = 'http://www.w3.org/2000/svg';

function pathClass(d) {
  var kind = d.properties.kind || '';
  if (d.properties.boundary) {
    kind += '_boundary';
  }
  return d.layer_name + '-layer ' + kind;
}

function render(options, projection, features, x, y, zoom, document) {
  var width, height, svg;

  width = options.tileSize[0];
  height = options.tileSize[1];

  projection.setOptions(x, y, zoom);

  svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  // put all the features into SVG paths
  features.forEach(function (d) {
    var path = document.createElementNS(svgNS, 'path');
    path.setAttribute('class', pathClass(d));
    path.setAttribute('d', projection.toPath(d));
    svg.appendChild(path);
  });
  return svg;
}

function init(options) {
  return render.bind(undefined, options, projection());
}

module.exports = init;
