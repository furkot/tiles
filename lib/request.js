var fetchagent = require('fetchagent');

function parser(contentType) {
  if (contentType) {
    if (contentType.indexOf('json') > -1) {
      return 'json';
    }
    if (contentType.indexOf('protobuf') > -1){
      return 'arrayBuffer';
    }
  }
}

function request(options, fn) {
  var req = fetchagent.get(options.url);
  if (options.contentType) {
    req.set('accept', options.contentType);
  }
  return req.parser(parser).end(fn);
}

module.exports = request;
