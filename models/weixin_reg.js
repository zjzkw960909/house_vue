var pool = require('../config/create'); 


function House_info(house) {
    this.phone = house.phone,
    this.name = house.name,
    this.location = house.location,
    this.apartment = house.apartment,
    this.price = house.price,
    this.size = house.size,
    this.address = house.address,
    this.floor = house.floor,
    this.pic = house.pic,
    this.mine = house.mine,
    this.grade = house.grade,
    this.ctime = (new Date()).getTime()/1000
}

module.exports = House_info;

/***************pc端出租功能**************/
//pc端出租删除
House_info.rent_del = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = 'DELETE FROM rent_reg WHERE rent_id = '+id;
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

//pc端出租登记
House_info.prototype.rent_reg = function ( callback ) {
    var rent_house = back_pc_reg(this);
    console.log(rent_house);
    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "insert into rent_reg (pic,phone,name,price,mine,hot,location,apartment,address,floor,size,grade,ctime,weixin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            client.query(sql,[rent_house.pic,rent_house.phone,rent_house.name,rent_house.price,rent_house.mine,'热推',rent_house.location,rent_house.apartment,rent_house.address,rent_house.floor,rent_house.size,rent_house.grade,rent_house.ctime,'0'],function(err,result,fields){
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
//pc端出租显示
House_info.rent_show = function (page, callback) {
    var pages;
    var start = (page-1)*10;
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM rent_reg where weixin = '0' order by rent_id desc LIMIT "+start+",10";
        var sql_all = "select * from rent_reg where weixin = '0'";
        client.query(sql_all, function (err0, result_all){
            client.query(sql, function (err1, result, fileds){
                if( err0 || err1 ) {
                    console.log( 'err0:'+err0);
                    console.log( 'err1:'+err1);
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
//出租显示一个
House_info.rent_show_one = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM rent_reg where rent_id = "+id;
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


//pc端出租编辑
House_info.prototype.rent_edit = function (id, callback ) {
    var rent_house = back_pc_reg(this);
    pool.acquire(function(err, client) {
        var sql = "update rent_reg set pic = ?,phone = ?, name = ?,price = ?,mine = ?,hot = ?,location = ?,apartment = ?,address = ?,floor = ?,size = ?,grade = ?,ctime = ? where rent_id = "+id;
        client.query(sql,[rent_house.pic,rent_house.phone,rent_house.name,rent_house.price,rent_house.mine,'热推',rent_house.location,rent_house.apartment,rent_house.address,rent_house.floor, rent_house.size,rent_house.grade,rent_house.ctime],function(err,results,fields){
            if (err) {
            } else {
                pool.release(client);
                return callback(err, results, fields);
            }
        });
    });
}
//pc端查询位置
House_info.rent_search = function (location, callback) {
    pool.acquire(function(err, client) {
        var sql = "select * FROM rent_reg WHERE location like '%"+location+"%' order by rent_id desc limit 50";
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
//pc端显示微信租房reg
House_info.weixin_rent = function (page, callback) {
    var pages;
    var start = (page-1)*10;
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM rent_reg where weixin = '1' order by rent_id desc LIMIT "+start+",10";
        var sql_all = "select * from rent_reg where weixin = '1'";
        client.query(sql_all, function (err0, result_all){
            client.query(sql, function (err1, result, fileds){
                if( err0 || err1 ) {
                    console.log( 'err0:'+err0);
                    console.log( 'err1:'+err1);
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

/***************pc端出售功能**************/
//pc端出售删除
House_info.sell_del = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = 'DELETE FROM sell_reg WHERE sell_id = '+id;
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


//pc端出售登记
House_info.prototype.sell_reg = function ( callback ) {
    var sell_house = back_pc_reg(this);
    console.log(sell_house);
    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "insert into sell_reg (pic,phone,name,price,mine,hot,location,apartment,address,floor,size,grade,ctime,weixin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            client.query(sql,[sell_house.pic,sell_house.phone,sell_house.name,sell_house.price,sell_house.mine,'热推',sell_house.location,sell_house.apartment,sell_house.address,sell_house.floor,sell_house.size,sell_house.grade,sell_house.ctime,'0'],function(err,result,fields){
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

//pc端出售显示
House_info.sell_show = function (page, callback) {
    var pages;
    var start = (page-1)*10;
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM sell_reg where weixin = '0' order by sell_id desc LIMIT "+start+",10";
        var sql_all = "select * from sell_reg where weixin = '0'";
        client.query(sql_all, function (err0, result_all){
            client.query(sql, function (err1, result, fileds){
                if( err0 || err1 ) {
                    console.log( 'err0:'+err0);
                    console.log( 'err1:'+err1);
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
//显示一个
House_info.sell_show_one = function (id, callback) {
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM sell_reg where sell_id = "+id;
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


//pc端出售编辑
House_info.prototype.sell_edit = function (id, callback ) {
    var sell_house = back_pc_reg(this);
    pool.acquire(function(err, client) {
        var sql = "update sell_reg set pic = ?,phone = ?, name = ?,price = ?,mine = ?,hot = ?,location = ?,apartment = ?,address = ?,floor = ?,size = ?,grade = ?,ctime = ? where sell_id = "+id;
        client.query(sql,[sell_house.pic,sell_house.phone,sell_house.name,sell_house.price,sell_house.mine,'热推',sell_house.location,sell_house.apartment,sell_house.address,sell_house.floor,sell_house.size,sell_house.grade,sell_house.ctime],function(err,results,fields){
            if (err) {
            } else {
                pool.release(client);
                return callback(err, results, fields);
            }
        });
    });
}

//pc端查询位置
House_info.sell_search = function (location, callback) {
    pool.acquire(function(err, client) {
        var sql = "select * FROM sell_reg WHERE location like '%"+location+"%' order by sell_id desc";
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
//pc端显示微信reg
House_info.weixin_show = function (page, callback) {
    var pages;
    var start = (page-1)*10;
    pool.acquire(function(err, client) {
        var sql = "SELECT * FROM sell_reg where weixin = '1' order by sell_id desc LIMIT "+start+",10";
        var sql_all = "select * from sell_reg where weixin = '1'";
        client.query(sql_all, function (err0, result_all){
            client.query(sql, function (err1, result, fileds){
                if( err0 || err1 ) {
                    console.log( 'err0:'+err0);
                    console.log( 'err1:'+err1);
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

/***************pc端登记功能**************/
//微信端出售登记
House_info.prototype.wx_sell_reg = function ( callback ) {
    var sell_house = {
        phone: this.phone,
        name: this.name,
        location: this.location,
        apartment: this.apartment,
        price: this.price,
        floor: this.floor,
        size: this.size,
        mine: this.mine,
        address: this.address,
        pic: this.pic,
        ctime: (new Date()).getTime()/1000,
    };
    console.log('aa:'+sell_house);
    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "insert into sell_reg (phone,name,pic,price,mine,hot,location,apartment,address,floor,size,grade,ctime,weixin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            client.query(sql,[sell_house.phone,sell_house.name,sell_house.pic,sell_house.price,'自己房源','热推',sell_house.location,sell_house.apartment,sell_house.address,sell_house.floor,sell_house.size,'',sell_house.ctime,'1'],function(err,results,fields){
                if( err ) {
                    throw err;
                } else {
                    pool.release(client);
                    callback(err, results, fields);
                }  
            });
        }
    });
}

//微信端出租登记
House_info.prototype.wx_rent_reg = function ( callback ) {
    var sell_house = {
        phone: this.phone,
        name: this.name,
        location: this.location,
        apartment: this.apartment,
        price: this.price,
        size: this.size,
        mine: this.mine,
        address: this.address,
        floor: this.floor,
        pic: this.pic,
        ctime: (new Date()).getTime()/1000,
    };
    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "insert into rent_reg (phone,name,pic,price,mine,hot,location,apartment,address,floor,size,grade,ctime,weixin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            client.query(sql,[sell_house.phone,sell_house.name,sell_house.pic,sell_house.price,'自己房源','热推',sell_house.location,sell_house.apartment,sell_house.address,sell_house.floor,sell_house.size,'',sell_house.ctime,'1'],function(err,results,fields){
                if( err ) {
                    throw err;
                } else {
                    pool.release(client);
                    callback(err, results, fields);
                }  
            });
        }
    });
}
/***************浏览人数统计**************/
House_info.times = function ( times, callback ) {
    pool.acquire(function(err, client) {
        console.log(times.times);
        if( err ) {
            console.log(err);  
        } else {
            var sql = "update times set times = ? where id = 1";
            times.times+=1;
            client.query(sql,times.times,function(err,result,fields){
                if( err ) {
                    console.log( err );
                } else {
                    pool.release(client);
                    callback(err, { times: times });
                }  
            });
        }
    });
}

function back_pc_reg(space) {
    var that = space;
    return {
        location: that.location,
        apartment: that.apartment,
        price: that.price,
        size: that.size,
        mine: that.mine,
        hot: that.hot,
        address: that.address,
        floor: that.floor,
        pic: that.pic,
        grade: that.grade,
        phone: that.phone,
        name: that.name,
        ctime: (new Date()).getTime()/1000
    };
}



