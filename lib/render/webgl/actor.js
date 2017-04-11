
function init(style) {

  function send(msg, params, callback) {
    if (msg === 'getGlyphs' || msg === 'getIcons') {
      return style[msg](undefined, params, callback);
    }
    console.log('Need to handle message: ', msg);
  }

  return {
    send: send
  };
}

module.exports = init;
