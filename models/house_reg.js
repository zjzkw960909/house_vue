var pool = require('../config/create'); 
var table_name = "sell_info";
var uid = require('../utils/uuid');


function House_info(house) {
    this.location = house.location,
    this.apartment = house.apartment,
    this.price = house.price,
    this.size = house.size,
    this.mine = house.mine,
    this.hot = house.hot,
    this.floor = house.floor,
    this.pic = house.pic,
    this.grade = house.grade,
    this.ctime = (new Date()).getTime()/1000
}

module.exports = House_info;

House_info.prototype.sell_reg = function ( callback ) {
    var sell_house = {
        location: this.location,
        apartment: this.apartment,
        price: this.price,
        size: this.size,
        mine: this.mine,
        hot: this.hot,
        floor: this.floor,
        pic: this.pic,
        grade: this.grade,
        ctime: (new Date()).getTime()/1000
    };
    
    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "insert into sell_info (pic,price,mine,hot,location,apartment,floor,size,grade,ctime) values(?,?,?,?,?,?,?,?,?,?)";
            client.query(sql,[sell_house.pic,sell_house.price,sell_house.mine,sell_house.hot,sell_house.location,sell_house.apartment,sell_house.floor,sell_house.size,sell_house.grade,sell_house.ctime],function(err,results,fields){
                if( err ) {
                    throw err;
                } else {
                    pool.release(client);
                    callback(err, result, fields);
                }  
            });
        }
    });
}

House_info.prototype.sell_edit = function ( id, callback ) {
    var sell_house = {
        location: this.location,
        apartment: this.apartment,
        price: this.price,
        size: this.size,
        mine: this.mine,
        hot: this.hot,
        floor: this.floor,
        pic: this.pic,
        grade: this.grade,
        ctime: (new Date()).getTime()/1000
    };
    console.log('models:'+sell_house);
    pool.acquire(function(err, client) {
        var sql = "update sell_info set pic = ?,price = ?,mine = ?,hot = ?,location = ?,apartment = ?,floor = ?,size = ?,grade = ?,ctime = ? where sell_id = "+id;
        client.query(sql,[sell_house.pic,sell_house.price,sell_house.mine,sell_house.hot,sell_house.location,sell_house.apartment,sell_house.floor,sell_house.size,sell_house.grade,sell_house.ctime],function(err,results,fields){
            console.log(sql);
            if (err) {
                console.log(err);
            } else {
                pool.release(client);
                //返回用户id
                return callback(err, results, fields);
            }
        });
    });
}


House_info.sell_show = function (page, callback) {
    var pages;
    var start = (page-1)*10;
    
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM sell_info order by sell_id desc LIMIT "+start+",10";
        var sql_all = "select * from sell_info";
        client.query(sql_all, function (err0, result_all){
            client.query(sql, function (err1, result, fileds){
                if( err0 || err1 ) {
                    throw err0;
                } else {
                    pages = Math.ceil(result_all.length/10);
                    var data = { list: result, page: Number(page), pages: pages };
                    pool.release(client);
                    callback(err0, data);
                }
            });
        });
    });
}

House_info.sell_show_one = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM sell_info where sell_id = "+id;
        client.query(sql, function (err, result, fileds){
            if( err ) {
                throw err;
            } else {
                pool.release(client);
                callback(err, result);
            }
        });
    });
}

House_info.sell_del = function (id, callback) {
    console.log(id);
    pool.acquire(function(err, client) {
        var sql = 'DELETE FROM sell_info WHERE sell_id = '+id;
        client.query(sql, function (err, result, fileds){
            if( err ) {
                throw err;
            } else {
                pool.release(client);
                callback(err, result);
            }
        });
    });
}

House_info.sell_search = function (location, callback) {
    pool.acquire(function(err, client) {
        var sql = "select * FROM sell_info WHERE location like '%"+location+"%' order by sell_id desc limit 30";
        client.query(sql, function (err, result, fileds){
            if( err ) {
                throw err;
            } else {
                pool.release(client);
                callback(err, result);
            }
        });
    })
}





/************租房momdles***************/
House_info.prototype.rent_reg = function ( callback ) {
    var rent_house = {
        location: this.location,
        apartment: this.apartment,
        price: this.price,
        size: this.size,
        mine: this.mine,
        hot: this.hot,
        floor: this.floor,
        pic: this.pic,
        grade: this.grade,
        ctime: (new Date()).getTime()/1000
    };
    pool.acquire(function(err, client) {
        var sql = "insert into rent_info (pic,price,mine,hot,location,apartment,floor,size,grade,ctime) values(?,?,?,?,?,?,?,?,?,?)";
        console.log(rent_house);
        client.query(sql,[rent_house.pic,rent_house.price,rent_house.mine,rent_house.hot,rent_house.location,rent_house.apartment,rent_house.floor,rent_house.size,rent_house.grade,rent_house.ctime],function(err,results,fields){
            console.log(sql);
            if (err) {
                console.log(err);
            } else {
                pool.release(client);
                //返回用户id
                return callback(err, results, fields);
            }
        });
    });
}

House_info.prototype.rent_edit = function ( id, callback ) {
    var rent_house = {
        location: this.location,
        apartment: this.apartment,
        price: this.price,
        size: this.size,
        mine: this.mine,
        hot: this.hot,
        floor: this.floor,
        pic: this.pic,
        grade: this.grade,
        ctime: (new Date()).getTime()/1000
    };
    console.log('models:'+rent_house);
    pool.acquire(function(err, client) {
        var sql = "update rent_info set pic = ?,price = ?,mine = ?,hot = ?,location = ?,apartment = ?,floor = ?,size = ?,grade = ?,ctime = ? where rent_id = "+id;
        client.query(sql,[rent_house.pic,rent_house.price,rent_house.mine,rent_house.hot,rent_house.location,rent_house.apartment,rent_house.floor,rent_house.size,rent_house.grade,rent_house.ctime],function(err,results,fields){
            console.log(sql);
            if (err) {
                console.log(err);
            } else {
                pool.release(client);
                //返回用户id
                return callback(err, results, fields);
            }
        });
    });
}

House_info.rent_show = function (page, callback) {
    var pages;
    var start = (page-1)*10;
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM rent_info order by rent_id desc LIMIT "+start+",10";
        var sql_all = "select * from rent_info";

        client.query(sql_all, function (err0, result_all){
            client.query(sql, function (err1, result, fileds){
                if( err0 || err1 ) {
                    throw err0;
                } else {
                    pages = Math.ceil(result_all.length/10);
                    var data = { list: result, page: Number(page), pages: pages };

                    pool.release(client);
                    callback(err0, data);
                }
            });
        });
    });
}

House_info.rent_show_one = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM rent_info where rent_id = "+id;
        client.query(sql, function (err, result, fileds){
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}


House_info.rent_del = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = 'DELETE FROM rent_info WHERE rent_id = '+id;
        client.query(sql, function (err, result, fileds){
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}

House_info.rent_search = function (location, callback) {
    pool.acquire(function(err, client) {
        var sql = "select * FROM rent_info WHERE location like '%"+location+"%' order by rent_id desc limit 30";
        client.query(sql, function (err, result, fileds){
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}
