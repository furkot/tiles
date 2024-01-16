let map;

/* global mapboxgl */

function getAttribution({ style }) {
  if (!style) {
    return '';
  }
  const { sourceCaches } = style;
  const attributions = Object.keys(sourceCaches)
    .reduce((attributions, id) => {
      const source = sourceCaches[id].getSource();
      if (source.attribution && !attributions.includes(source.attribution)) {
        attributions.push(source.attribution);
      }
      return attributions;
    }, [])
    // first sort by length so that substrings come first
    .sort((a, b) => a.length - b.length)
    // remove any entries that are substrings of another entry.
    .filter((attrib, i) => {
      for (let j = i + 1; j < attributions.length; j += 1) {
        if (attributions[j].includes(attrib)) {
          return false;
        }
      }
      return true;
    });
  return attributions.join(' ');
}

function render({ overlay, style }, center, zoom, attribution) {
  if (center === undefined) {
    if (map) {
      map.remove();
      map = undefined;
    }
    return;
  }
  if (map) {
    map.jumpTo({
      center,
      zoom: zoom - 1
    });
    map.resize();
    return;
  }
  map = new mapboxgl.Map({
    container: overlay,
    style,
    center,
    zoom: zoom - 1,
    interactive: false,
    attributionControl: false
  });
  if (attribution) {
    map.on('data', () => attribution.innerHTML = getAttribution(map));
  }
}

function init(options) {
  return render.bind(undefined, options);
}

module.exports = init;
