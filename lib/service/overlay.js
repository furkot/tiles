
module.exports = init;

function init(options) {
  return {
    render: options.render(options)
  };
}
