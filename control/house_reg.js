var House = require('../models/house_reg');

module.exports = function (app) {
    app.post('/sell/reg', function (req, res) {
        var house = new House({
            location: req.body.location,
            apartment: req.body.apartment,
            size: req.body.size,
            floor: req.body.floor,
            grade: req.body.grade,
            hot: req.body.hot,
            mine: req.body.mine,
            price: req.body.price,
            pic: req.body.pic,
        });
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

    app.put('/sell/edit/:id', function (req, res) {
        var house = new House({
            location: req.body.location,
            apartment: req.body.apartment,
            size: req.body.size,
            floor: req.body.floor,
            grade: req.body.grade,
            hot: req.body.hot,
            mine: req.body.mine,
            price: req.body.price,
            pic: req.body.pic,
        });

        console.log("control:"+JSON.stringify(house));
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
    /***********租房control*************/
    app.post('/rent/reg', function (req, res) {
        var house = new House({
            location: req.body.location,
            apartment: req.body.apartment,
            size: req.body.size,
            floor: req.body.floor,
            grade: req.body.grade,
            hot: req.body.hot,
            mine: req.body.mine,
            price: req.body.price,
            pic: req.body.pic
        });
        console.log("control:"+house);
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

    app.put('/rent/edit/:id', function (req, res) {
        var house = new House({
            location: req.body.location,
            apartment: req.body.apartment,
            size: req.body.size,
            floor: req.body.floor,
            grade: req.body.grade,
            hot: req.body.hot,
            mine: req.body.mine,
            price: req.body.price,
            pic: req.body.pic
        });

        console.log("control:"+JSON.stringify(house));
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
}

