var Search = require('../models/house_search');
module.exports = function (app) {
    app.post('/add/location', function (req, res){
        var location = new Search({
            location: req.body.location
        });
        location.exits(function (err, data){
            console.log(data.length);
            if( data.length == 0 ){
                location.add_location(function (err, data) {
                    res.json({status: 0});
                    res.end();
                });
            }else{
                res.json({status: 1});
                res.end();
                return;
            }
        });
        
    });

    app.post('/del/location', function (req, res){
        var location = new Search({
            location: req.body.location
        });

        location.del_location(function (err, data) {
            res.json({status: 0});
            res.end();
        });
    });

    app.get('/api/location', function (req, res) {
        Search.location(function (err, result) {
            res.json({data: result});
            res.end();
        });
    });

    app.get('/api/apartment', function (req, res) {
        Search.apartment(function (err, result) {
            res.json({data: result});
            res.end();
        });
    });
/*********售房*************/
    app.post('/api/findSell', function (req, res) {
        Search.find_sell(req.body.page, function (err ,data) {
            res.json({status: 0, data: data});
            res.end();
        });
    });

    app.post('/api/findSellOne', function (req, res) {
        var sell_one = new Search({
            location: req.body.location,
            apartment: req.body.apartment,
            price: req.body.price,
            page: req.body.page
        });
        console.log(req.body);
        sell_one.find_sell_one(function (err, data) {
            res.json({data: data});
            res.end();
        });
        
    })
    
    app.post('/find/sell/input', function (req, res){
        Search.find_sell_input(req.body.location, function (err, data) {
            res.json({status: 0, data: data});
            res.end();
        })
    })

    app.post('/find/sell/detail', function (req, res){
        Search.find_sell_detail(req.body.sell_id, function (err, data) {
            res.json({status: 0, data: data});
            res.end();
        })
    })
/*********租房*************/
    app.post('/find/rent', function (req, res) {
        Search.find_rent(req.body.page, function (err ,data) {
            res.json({status: 0, data: data});
            res.end();
        });
    });

    app.post('/find/rent/one', function (req, res) {
        var sell_one = new Search({
            location: req.body.location,
            apartment: req.body.apartment,
            price: req.body.price,
            page: req.body.page
        });
        console.log(req.body);
        sell_one.find_rent_one(function (err, data) {
            res.json({ status:0, data: data});
            res.end();
        });
        
    })
    
    app.post('/find/rent/input', function (req, res){
        Search.find_rent_input(req.body.location, function (err ,data) {
            res.json({status: 0, data: data});
            res.end();
        })
    })

    app.post('/find/rent/detail', function (req, res){
        Search.find_rent_detail(req.body.rent_id, function (err, data) {
            res.json({status: 0, data: data});
            res.end();
        })
    })
/************微信登记**********/
    app.post('/wx/sell', function (req, res) {
        Search.wx_sell(req.body.page, function (err ,data) {
            res.json({status: 0, data: data});
            res.end();
        });
    });


}
