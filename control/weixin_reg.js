var House = require('../models/weixin_reg');

module.exports = function (app, times) {
    app.post('/api/sellReg', function (req, res) {
        var house = new House({
            location: req.body.location,
            apartment: req.body.apartment,
            size: req.body.size,
            address: req.body.address,
            floor: req.body.floor,
            price: req.body.price,
            pic: req.body.pic,
            name: req.body.name,
            phone: req.body.phone,
        });
        house.wx_sell_reg(function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    
    });

    app.post('/wx/rent/reg', function (req, res) {
        var house = new House({
            location: req.body.location,
            apartment: req.body.apartment,
            size: req.body.size,
            address: req.body.address,
            floor: req.body.floor,
            price: req.body.price,
            pic: req.body.pic,
            name: req.body.name,
            phone: req.body.phone,
        });
        house.wx_rent_reg(function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    
    });
//pc出售后台功能
    app.post('/sell/reg', function (req, res) {
        var house = _house(req);
        console.log('1'+house);
        house.sell_reg(function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    });
    
    app.post('/sell/show', function (req, res) {
        House.sell_show(req.body.page, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data });
                res.end();
            }
        });   
    });

    app.post('/weixin/show', function (req, res) {
        House.weixin_show(req.body.page, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data });
                res.end();
            }
        });   
    });

    app.post('/weixin/rent', function (req, res) {
        House.weixin_rent(req.body.page, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data });
                res.end();
            }
        });   
    });

    app.post('/sell/show/one', function (req, res) {
        House.sell_show_one(req.body.id, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data });
                res.end();
            }
        });   
    });


    app.put('/sell/edit/:id', function (req, res) {
        var house = _house(req);
        house.sell_edit(req.url.split('/')[3], function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    
    });

    app.delete('/sell/del/:id', function (req, res) {
        House.sell_del(req.url.split('/')[3], function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0});
                res.end();
            }
        });   
    });

    app.post('/sell/search', function (req, res) {
        House.sell_search(req.body.location, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data});
                res.end();
            }
        });   
    });

//pc出租后台功能
    app.post('/rent/reg', function (req, res) {
        var house = _house(req);
        house.rent_reg(function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    });
    app.post('/rent/show', function (req, res) {
        House.rent_show(req.body.page, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data });
                res.end();
            }
        });   
    });

    app.post('/rent/show/one', function (req, res) {
        House.rent_show_one(req.body.id, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data });
                res.end();
            }
        });   
    });


    app.put('/rent/edit/:id', function (req, res) {
        var house = _house(req);
        house.rent_edit(req.url.split('/')[3], function (err, data) {
            if(err){
                res.json({ status: err });
                res.end();
            }else{
                res.json({ status: 0 });
                res.end();
            }
        });
    
    });

    app.delete('/rent/del/:id', function (req, res) {
        House.rent_del(req.url.split('/')[3], function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0});
                res.end();
            }
        });   
    });

    app.post('/rent/search', function (req, res) {
        House.rent_search(req.body.location, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data});
                res.end();
            }
        });   
    });

    app.get('/times', function (req, res) {
        House.times(times, function (err, data) {
            if( err ){
                throw err;
            } else {
                res.json({ status:0, data: data});
                res.end();
            }
        });   
    });
}


function _house(req) {
    return new House({
        location: req.body.location,
        phone: req.body.phone,
        name: req.body.name,
        apartment: req.body.apartment,
        size: req.body.size,
        address: req.body.address,
        floor: req.body.floor,
        grade: req.body.grade,
        hot: req.body.hot,
        mine: req.body.mine,
        price: req.body.price,
        pic: req.body.pic,
    });
}

