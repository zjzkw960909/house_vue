var crypto = require('crypto');
var Admin = require('../models/admin');

module.exports = function (app) {
    app.post('/admin-login', function (req, res) {
        if( !req.cookies.username || req.cookies.username !== req.body.username){
            res.cookie('username',req.body.username,{maxAge: (60*1000*60*24)*7});
        }
        if( !req.session.username ){
            req.session.username = req.body.username;
        }
        var md5 = crypto.createHash("md5");
		var password = md5.update(req.body.password).digest('base64');
        var login_admin = new Admin({
            name: req.body.username,
            password: password
        });
        login_admin.login( function (err , data) {
            if( err ){
                res.json({ status: err });
            }else{
                req.session.username = req.body.username;
                req.cookies.username = req.body.username;
                res.json({ status: 0 });
                res.end();
            }
        });
    })

    app.get('/admin-authorized', function (req, res) {
        if( req.cookies.username == req.session.username ) {
            res.json({status: 0});
            res.end();
        }else{
            res.json({status: 1});
            res.end();
        }
    });

    app.get('/admin-logout', function (req, res) {
        req.cookies.username = req.session.username = null;
        res.json({status: 0});
        res.end();
    });
}



