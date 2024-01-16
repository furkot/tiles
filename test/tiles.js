const { describe, it } = require('node:test');
const assert = require('node:assert');

const furkotTiles = require('../lib/tiles');

describe('furkot-tiles node module', function () {

  it('overlay', function () {
    const tiles = furkotTiles({
      overlay: true,
      render: function () {}
    });
    assert.equal(typeof tiles.render, 'function');
  });
});
