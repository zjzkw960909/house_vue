var Want = require('../models/weixin_want');

module.exports = function (app) {
    app.post('/api/want', function (req, res) {
        var want = new Want({
            apartment: req.body.apartment,
            address: req.body.address,
            other: req.body.other,
            price: req.body.price,
            name: req.body.name,
            phone: req.body.phone,
            way: req.body.way
        });
        want.wx_want(function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    
    });

    app.post('/wx/show/want', function (req, res) {
        Want.find_want(req.body.page, function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: data });
                res.end();
            }        
        },'all');
    })

    app.post('/show/want/sell', function (req, res) {
        Want.find_want(req.body.page, function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: data });
                res.end();
            }        
        },'我要买');
    })
    
    app.post('/show/want/rent', function (req, res) {
        Want.find_want(req.body.page, function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: data });
                res.end();
            }        
        },'我要租');
    })
}


