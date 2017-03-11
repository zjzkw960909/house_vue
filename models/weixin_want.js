var pool = require('../config/create'); 


function Want_info(house) {
    this.phone = house.phone,
    this.name = house.name,
    this.apartment = house.apartment,
    this.price = house.price,
    this.address = house.address,
    this.other = house.other,
    this.ctime = (new Date()).getTime()/1000,
    this.way = house.way
}

module.exports = Want_info;

/**
 * 微信端需求登记
 */
Want_info.prototype.wx_want = function ( callback ) {
    var want_house = {
        phone: this.phone,
        name: this.name,
        apartment: this.apartment,
        price: this.price,
        other: this.other,
        address: this.address,
        ctime: (new Date()).getTime()/1000,
        way: this.way
    };
    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "insert into wx_want (phone,name,price,apartment,address,other,ctime,way) values(?,?,?,?,?,?,?,?)";
            client.query(sql,[want_house.phone,want_house.name,want_house.price,want_house.apartment,want_house.address,want_house.other,want_house.ctime,want_house.way],function(err,results,fields){
                if( err ) {
                    console.log(err);
                } else {
                    pool.release(client);
                    callback(err, results, fields);
                }  
            });
        }
    });
}

Want_info.find_want = find;
Want_info.find_want_sell = find;
Want_info.find_want_rent = find;
function find( page, callback, conditions ) {
    var pages;
    var start = (page-1)*10;
    pool.acquire(function(err, client) {
        if( err ) {
        } else {
            var suf = conditions === 'all' ? '':" where way = '"+conditions+"'";
            var sql_all = "select * from wx_want"+suf+' order by want_id desc';
            var sql = "select * from wx_want"+suf+" order by want_id desc LIMIT "+start+",10";
            client.query(sql_all,function(err,result_all){
                client.query(sql,function(err1,result){
                    if( err || err1 ) {
                        console.log( 'err0:'+err);
                        console.log( 'err1:'+err1);
                    } else {
                        pages = Math.ceil(result_all.length/10);
                        var data = { list: result, page: Number(page), pages: pages };
                        pool.release(client);
                        callback(err, data);
                    }
                });
            });
        }
    });
}

