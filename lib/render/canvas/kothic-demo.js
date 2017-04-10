var MapCSS = require('kothic-js/src/style/mapcss');

(function(MapCSS) {
  'use strict';

  function restyle(style, tags, zoom, type, selector) {
    var s_default = {}, s_centerline = {}, s_ticks = {}, s_label = {};

    if ((selector === 'canvas')) {
      s_default['fill-color'] = '#F7EFEB';
    }

    if (selector === 'area') {
      s_default['fill-color'] = '#F7EFEB';
      s_default['z-index'] = 2;
    }

    if (selector === 'line') {
      s_default['width'] = 0.3;
      s_default['opacity'] = 0.6;
      s_default['color'] = '#996703';
      s_default['z-index'] = 10;
    }

    if (selector === 'node' && zoom >= 12) {
      s_label['text'] = MapCSS.e_localize(tags, 'name');
      s_label['text-offset'] = 11;
      s_label['font-size'] = '9';
      s_label['font-family'] = 'DejaVu Sans Book';
      s_label['text-halo-radius'] = 2;
      s_label['text-color'] = '#1300bb';
      s_label['text-halo-color'] = '#ffffff';
      s_label['text-allow-overlap'] = 'false';
      s_label['-x-mapnik-min-distance'] = '0';
    }

    if (type === 'way' && zoom >= 14) {
      s_default['text'] = MapCSS.e_localize(tags, 'name');
      s_default['text-position'] = 'line';
      s_default['text-color'] = '#404040';
      s_default['font-family'] = 'DejaVu Sans Book';
      s_default['font-size'] = '9';
      s_default['text-halo-radius'] = 1;
      s_default['text-halo-color'] = '#ffffff';
      s_default['width'] = 1.5;
      s_default['color'] = '#ffffff';
      s_default['casing-width'] = 0.5;
      s_default['casing-color'] = '#996703';
      s_default['z-index'] = 9;
    }

    if (Object.keys(s_default).length) {
      style['default'] = s_default;
    }
    if (Object.keys(s_centerline).length) {
      style['centerline'] = s_centerline;
    }
    if (Object.keys(s_ticks).length) {
      style['ticks'] = s_ticks;
    }
    if (Object.keys(s_label).length) {
      style['label'] = s_label;
    }
    return style;
  }

  var sprite_images = {}, external_images = [], presence_tags = [], value_tags = [ 'kind' ];

  MapCSS.loadStyle('demo', restyle, sprite_images, external_images,
      presence_tags, value_tags);
  MapCSS.preloadExternalImages('demo');
})(MapCSS);
