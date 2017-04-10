var Kothic = require('kothic-js/src/kothic');

function render(options, kothic, features, x, y, zoom, document) {
  var width, height, canvas;

  width = options.tileSize[0];
  height = options.tileSize[1];

  canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'kothic-rendered-tile');
  canvas.width = width;
  canvas.height = height;

  kothic.render(
    canvas, // canvas element (or its id) to render on
    { // JSON data to render
      features: features,
      granularity: width
    },
    zoom, // zoom level
    {
      styles: [options.style]
    }
  );
  return canvas;
}

function init(options) {
  if (!options.style) {
    options.style = 'demo';
    require('./kothic-demo');
  }

  return render.bind(undefined, options, new Kothic());
}

module.exports = init;
