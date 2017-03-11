var pool = require('../config/create'); 

function Search(search){
    this.location = search.location;
    this.apartment = search.apartment;
    this.price = search.price;
    this.page = search.page;
}

module.exports = Search;

Search.prototype.add_location = function ( callback ) {
    var location = this.location;
    pool.acquire(function(err, client) {
        var sql = "insert into location set location = '" +location+"'";

        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {
                pool.release(client);
                callback(err, result);
            }
        });
    });
}

Search.prototype.del_location = function ( callback ) {
    var location = this.location;
    pool.acquire(function(err, client) {   
        var sql = "DELETE FROM location WHERE location = '"+location+"'";
        
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}


Search.location = function ( callback ) {
    pool.acquire(function(err, client) {
        var sql = "select location from location order by id desc";
        //var sql = "select location from location";
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}

Search.apartment = function ( callback ) {
    pool.acquire(function(err, client) {
        var sql = "select apartment from apartment";
        //var sql = "select location from location";
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}

/***********买房查询************/

Search.find_sell = function ( page, callback ) {
    var string = " limit "+(page-1)*10+","+page*10; 
    pool.acquire(function(err, client) {
        var sql = "select * from sell_reg order by sell_id desc"+string;
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}

Search.find_sell_input = function ( location, callback ) {
    pool.acquire(function(err, client) {
        var sql = "select * from sell_reg where location like '%"+location+"%' order by sell_id desc limit 30";
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}

Search.prototype.find_sell_one = function ( callback ){
    var count = 0,
        price = this.price,
        apartment = this.apartment,
        location = this.location,
        page = this.page;
    var sql = "select * from sell_reg ";
    page = " limit "+(page-1)*30+","+page*30; 
    if( location != 0 ){
        sql = sql+"where location like '%"+location+"%'";
        count++;
    }
    
    if( apartment != 0 ){
        if( count > 0){
            and = " and ";
        }else{
            and = "where ";
        }
        sql = sql+and+"apartment = '"+apartment+"'";
        count++;
    }
    if( price != 0){
        var string;
        if( count > 0 ){
            and = " and ";
        }else{
            and = "where ";
        }
        switch (price){
            case '1':
                string = "price < '50'";
                break;
            case '2':
                string = "price > '50' and price < '100'";
                break;
            case '3':
                string = "price > '100' and price < '150'";
                break;
            case '4':
                string = "price > '150'";
                break;
        }
        sql = sql+and+string+" order by sell_id desc"+page;
        count++;
    }
    console.log(sql);
    pool.acquire(function(err, client) {
        client.query(sql, function (err, result,data) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}

Search.find_sell_detail = function ( sell_id, callback ) {
    pool.acquire(function(err, client) {
        var sql = "select * from sell_reg where sell_id = '"+sell_id+"'";
        client.query(sql, function (err, result,data) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}


/*********出租房查询*******/
Search.find_rent = function ( page, callback ) {
    var string = " limit "+(page-1)*10+","+page*10; 
    pool.acquire(function(err, client) {
        var sql = "select * from rent_reg order by rent_id desc"+string;
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}

Search.find_rent_input = function ( location, callback ) {
    pool.acquire(function(err, client) {
        var sql = "select * from rent_reg where location like '%"+location+"%' order by rent_id desc limit 30";
        client.query(sql, function (err, result) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    })
}

Search.prototype.find_rent_one = function ( callback ){
    var count = 0,
        price = this.price,
        apartment = this.apartment,
        location = this.location,
        page = this.page;
    var sql = "select * from rent_reg ";
    page = " limit "+(page-1)*30+","+page*30; 
    if( location != 0 ){
        sql = sql+"where location like '%"+location+"%'";
        count++;
    }
    
    if( apartment != 0 ){
        if( count > 0){
            and = " and ";
        }else{
            and = "where ";
        }
        sql = sql+and+"apartment = '"+apartment+"'";
        count++;
    }
    if( price != 0){
        var string;
        if( count > 0 ){
            and = " and ";
        }else{
            and = "where ";
        }
        switch (price){
            case '1':
                string = "price < '500'";
                break;
            case '2':
                string = "price > '500' and price < '1000'";
                break;
            case '3':
                string = "price > '1000' and price < '1500'";
                break;
            case '4':
                string = "price > '1500' and price < '3000'";
                break;
            case '5':
                string = "price > '3000' and price < '5000'";
                break;
            case '6':
                string = "price > '5000'";
                break;

        }
        sql = sql+and+string+" order by rent_id desc"+page;
        count++;
    }
    console.log(sql);
    pool.acquire(function(err, client) {
        client.query(sql, function (err, result,data) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}

Search.find_rent_detail = function ( rent_id, callback ) {
    pool.acquire(function(err, client) {
        var sql = "select * from rent_reg where rent_id = '"+rent_id+"'";
        client.query(sql, function (err, result,data) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}




/**********判断位置是否存在*****/
Search.prototype.exits = function (callback) {
    pool.acquire(function(err, client) {
        var sql = "select location from location where location = '"+this.location+"'"; 
        client.query(sql, function (err, result,data) {
            if( err ) {
                throw err;
            } else {

                pool.release(client);
                callback(err, result);
            }
        });
    });
}





