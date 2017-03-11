var fs = require('fs');
var watch = require('watch');
var _ = require('underscore');

var watch_files = function ( watch_path, num, patt ) {
    fs.watch(watch_path, function (status){
        if( status == 'rename' ){
            read_dir(watch_path, num, patt);
        }
    });
}

function read_dir (watch_path, num, patt) {
    fs.readdir(watch_path, function (err, all_file) {
        if( err ) throw err;
        return del_all(watch_path, all_file, num, patt);
    })
}
    
function del_all (watch_path, all_file, num, patt) {
    var check_file = _.filter(all_file, function (v) {
        return patt.test(v)===true;
    })
    get_earlier(watch_path, check_file, num);
}

function get_earlier (watch_path, path, num) {
    var time, filename, path_time, del_num;
    //给文件创建时间 处理后的格式为字符串: filename:time 
    path_time = path.map(function (v) {
        time = Date.parse(fs.statSync(watch_path+'/'+v).birthtime);
        return v+':'+time;
    });
    //将时间戳从小到大进行排序
    path_time = path_time.sort(function (prev, curr) {
        return prev.split(':')[1] > curr.split(':')[1]; 
    });

    //需要删除的文件数量
    del_num = path_time.length - num;
    for( ; del_num>0; del_num-- ){
        del_file( watch_path, path_time.shift().split(':')[0] );
    } 
}

function del_file (watch_path, file) {
    fs.unlink(watch_path+'/'+file, function (err, data) {
        console.log(err);
    });
}

module.exports = watch_files;
