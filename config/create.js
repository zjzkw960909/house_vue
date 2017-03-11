var config = require('./config');
var mysql = require('mysql');
var poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name     : 'mysql',
    create   : function(callback) {
        var client = mysql.createConnection(config.db);
        client.connect();
        // parameter order: err, resource
        // new in 1.0.6
        callback(null, client);
    },
    destroy  : function(client) { client.end(); },
    max      : 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 2, 
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
     // if true, logs via console.log - can also be a function
    log : true 
});


module.exports = pool;

