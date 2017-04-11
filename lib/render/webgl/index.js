var _defaults = require('lodash.defaults');

var actor = require('./actor');

// Mapbox classes
var Painter = require('mapbox-gl/src/render/painter');
var Style = require('mapbox-gl/src/style/style');
var StyleLayerIndex = require('mapbox-gl/src/style/style_layer_index');
var TileCoord = require('mapbox-gl/src/source/tile_coord');
var Transform = require('mapbox-gl/src/geo/transform');
var WorkerTile = require('mapbox-gl/src/source/worker_tile');

var renderQueue = [];
var renderInProgress = true;

function initMapbox(options) {
  var style, mapbox;
  
  style = options.style || require('./style');
  mapbox = options.mapbox = {
    style: new Style(style),
    styleSource: Object.keys(style.sources)[0],
    transform: new Transform(options.minZoom || 0, options.maxZoom || 22, true)
  };
  mapbox.actor = actor(mapbox.style);
  mapbox.style.on('style.load', function () {
    mapbox.style.update([], {
      transition: false
    });
    mapbox.style.getSource(mapbox.styleSource).loadTile = function (tile, callback) {
      tile.loadVectorData(mapbox.tileData, {
        style: mapbox.style
      });
      callback(null);
    };
    mapbox.layerIndex = new StyleLayerIndex(mapbox.style._serializeLayers(mapbox.style._order));
    mapbox.cache = mapbox.style.sourceCaches[mapbox.styleSource];
    // associate with dummy map
    mapbox.cache.onAdd({
      painter: {
        tileExtentVAO: {}
      },
      transform: mapbox.transform
    });
    mapbox.cache.update(mapbox.transform);
    renderInProgress = false;
    if (renderQueue.length) {
      renderQueue.shift()();
    }
  });
}

function resetAtlas(atlas) {
  delete atlas.gl;
  delete atlas.texture;
}

function reset(atlases) {
  Object.keys(atlases).forEach(function (key) {
    resetAtlas(atlases[key]);
  });
}

function doRender(canvas, options, features, x, y, zoom) {
  var coord, width, height, mapbox = options.mapbox;
  
  if (renderInProgress) {
    return;
  }
  renderInProgress = true;

  width = options.tileSize[0];
  height = options.tileSize[1];

  reset(mapbox.style.glyphSource.atlases);
  resetAtlas(mapbox.style.spriteAtlas);

  coord = new TileCoord(zoom, x, y);
  new WorkerTile({
    source: mapbox.styleSource,
    coord: coord,
    zoom: zoom,
    overscaling: 1
  }).parse(features, mapbox.layerIndex, mapbox.actor, function (err, data) {
    mapbox.tileData = _defaults({
      rawTileData: features.rawData
    }, data);
    mapbox.transform.zoom = zoom;
    mapbox.transform.resize(width, height);
    mapbox.cache.addTile(coord);
    new Painter(canvas.getContext('webgl'), mapbox.transform).render(mapbox.style, {});
    mapbox.cache.removeTile(coord.id);
    //renderInProgress = false;
    if (renderQueue.length) {
      renderQueue.shift()();
    }
  });
}

function render(options, features, x, y, zoom, document) {
  var width, height, canvas;

  width = options.tileSize[0];
  height = options.tileSize[1];

  canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'webgl-rendered-tile');
  canvas.width = width;
  canvas.height = height;

  if (renderInProgress) {
    renderQueue.push(doRender.bind(undefined, canvas, options, features, x, y, zoom));
    return canvas;
  }

  doRender(canvas, options, features, x, y, zoom);
  return canvas;
}

function init(options) {
  initMapbox(options);
  return render.bind(undefined, options);
}

module.exports = init;
