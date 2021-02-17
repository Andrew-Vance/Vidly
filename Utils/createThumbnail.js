const thumb = require('node-video-thumb');

module.exports = async (source, target) => {
    await thumb({
      source: source,
      target: target,
      width: 480,
      height: 340,
      seconds: 10
    });
};