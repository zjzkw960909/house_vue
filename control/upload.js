var upload = require('../utils/upload')

module.exports = function (app) {
    upload(app, '/photo', './public/upload/');
}
