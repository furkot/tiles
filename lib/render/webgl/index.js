var map;

/* global mapboxgl */

function getAttribution(map) {
  var sourceCaches, attributions;
  if (!map.style) {
    return '';
  }
  sourceCaches = map.style.sourceCaches;
  attributions = Object.keys(sourceCaches).reduce(function (attributions, id) {
    var source = sourceCaches[id].getSource();
    if (source.attribution && attributions.indexOf(source.attribution) < 0) {
      attributions.push(source.attribution);
    }
    return attributions;
  }, []);

  // remove any entries that are substrings of another entry.
  // first sort by length so that substrings come first
  attributions.sort(function (a, b) {
    return a.length - b.length;
  });
  attributions = attributions.filter(function(attrib, i) {
    var j;
    for (j = i + 1; j < attributions.length; j += 1) {
      if (attributions[j].indexOf(attrib) >= 0) {
        return false;
      }
    }
    return true;
  });
  return attributions.join(' ');
}

function render(options, center, zoom, attribution) {
  if (center === undefined) {
    if (map) {
      map.remove();
      map = undefined;
    }
    return;
  }
  if (map) {
    map.jumpTo({
      center: center,
      zoom: zoom - 1
    });
    map.resize();
    return;
  }
  map = new mapboxgl.Map({
    container: options.overlay,
    style: options.style,
    center: center,
    zoom: zoom - 1,
    interactive: false,
    attributionControl: false
  });
  if (attribution) {
    map.on('data', function () {
      attribution.innerHTML = getAttribution(map);
    });
  }
}

function init(options) {
  return render.bind(undefined, options);
}

module.exports = init;
