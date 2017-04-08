// "Wrap" x (logitude) at 180th meridian properly
function wrapLongitude(x, zoom) {
  var tilesPerGlobe = 1 << zoom;

  x = x % tilesPerGlobe;
  if (x < 0) {
    x = tilesPerGlobe + x;
  }
  return x;
}

module.exports = {
    wrapLongitude: wrapLongitude
};
