var pool = require('../config/create'); 
var uid = require('../utils/uuid');

function Admin(admin){
    this.name = admin.name;
    this.password = admin.password;
}

var tableName = "admins";
module.exports = Admin;

Admin.prototype.login = function login( callback ) {
    var login = {
        name: this.name,
        password: this.password
    }

    pool.acquire(function(err, client) {
        if( err ) {
            
        } else {
            var sql = "select username from admins where username = '"+login.name+"' and password = '"+login.password+"'";
            client.query(sql, function (err, result) {
                if( result.length == 0 ) {
                    callback(-1);
                } else {
                    callback(err, result);
                    pool.release(client);
                }  
            });
        }
    });
}

