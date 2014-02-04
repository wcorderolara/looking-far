
/**
 * Module dependencies.
 */

var gm = require('graphicsmagick2/build/Release/GraphicsMagick')
  , debug = require('debug')('resize')
  , fs = require('fs');

/**
 * Supported filters.
 */

var filters = {
  point: 1,
  box: 2,
  triangle: 3,
  hermite: 4,
  hanning: 5,
  hamming: 6,
  blackman: 7,
  gaussian: 8,
  quadratic: 9,
  cubic: 10,
  catrom: 11,
  mitchell: 12,
  lanczos: 13,
  bessel: 14,
  sinc: 15
};

/**
 * Resize the given `img` which may be the file path
 * or a `Buffer` representation of the file.
 *
 * @param {Buffer|String} img path or buffer
 * @param {Number} width
 * @param {Number} height
 * @param {Function} fn
 * @api public
 */

exports = module.exports = function(img, width, height, opts, fn){
  var type ='string' == typeof img
    ? 'file'
    : 'buffer';
  exports[type](img, width, height, opts, fn)
};

/**
 * Resize the given `file` representation of the image
 * to the given dimensions and invoke `fn(null, buf)`.
 *
 * @param {String} file
 * @param {Number} width
 * @param {Number} height
 * @api public
 */

exports.file = function(file, width, height, opts, fn) {
  debug('file %s within %dx%d', file, width, height);
  fs.readFile(file, function(err, buf){
    if (err) return fn(err);
    exports.buffer(buf, width, height, opts, fn);
  });
}

/**
 * Resize the given `buf` representation of the image
 * to the given dimensions and invoke `fn(null, buf)`.
 *
 * @param {Buffer|Image} buf
 * @param {Number} width
 * @param {Number} height
 * @api public
 */

exports.buffer = function(buf, width, height, opts, fn) {
  var filter = opts.filter || 'lanczos';
  var format = opts.format || 'png';
  var quality = opts.quality || 90;

  debug('%dkb within %dx%d as %s %s %s%', buf.length / 1024 | 0, width, height, filter, format, quality);
  var img = 'Image' == buf.constructor.name
    ? buf
    : gm.image(buf);

  var ratio = img.width / width > img.height / height
    ? img.width / width
    : img.height / height;

  var f = filters[filter];
  if (!f) return fn(new Error('invalid filter "' + filter + '"'));

  if (ratio > 1) {
    width = Math.ceil(img.width / ratio);
    height = Math.ceil(img.height / ratio);
  } else {
    width = img.width;
    height = img.height;
  }

  var out = img.resize(width, height, f);
  out.quality(quality);
  out.format(format);

  try {
    var buf = out.buffer;
    fn(null, buf, out.width, out.height);
  } catch (err) {
    debug('error %s', err.message);
    fn(err);
  }
}
