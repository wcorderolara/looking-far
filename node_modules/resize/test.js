
/**
 * Module dependencies.
 */

var resize = require('./');
var fs = require('fs');

var file = process.argv[2];
console.log('resize %s', file);

var opts = {
  filter: 'point',
  format: 'jpeg',
  quality: 90
};

resize(file, 1200, 1200, opts, function(err, buf, w, h){
  if (err) throw err;
  fs.writeFile('out.jpg', buf);
  console.log('%dkb', buf.length / 1024 | 0);
  console.log(w, h);
});
