(function() {
    var config = {
        db: {
            host: 'localhost',     //本地数据库
            port: '3306',
            user: 'root',          //数据库用户名
            password: '123456',          //数据库密码
            database: 'house',  //数据库名称
            useConnectionPooling: true
        },
        weixin_db: {
            APPID: 'wxfeb7bc475f972389',
            APPSECRET: '05625c1f0cd89667a5568f57bec845df',
            TOKEN_SERVER: 'http://token.zjfashion.cn'
        }
    };

    module.exports = config;

}).call(this);

