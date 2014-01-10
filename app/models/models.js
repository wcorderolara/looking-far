var mongoose = require('mongoose');

//mongoose.connect('mongodb://lookingfar:7aada11eb9539db3d8117c62df869cc0@ds061148.mongolab.com:61148/looking-far' + 'looking-far');
mongoose.connect('mongodb://localhost/' + 'lookingfar');

module.exports = mongoose;