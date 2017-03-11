var fs = require('fs');
var formidable = require("formidable");
var form = new formidable.IncomingForm();
var _ = require('underscore');
//var uploadDir = "./public/upload/";//文件存储目录，注意 ./ 不是../
form.keepExtensions = true;//保留后缀
form.multiples = true;
form.uploadDir = './public/upload/'
module.exports = function (app, path, uploadDir) {
    app.post(path, function (req, res, next) {
        console.log(req.body);
        /******************************/
        /******************************/
        /*formidable是一个无比坑爹的插件*/
        /******************************/
        /******************************/
        //不知什么原因，多文件上传时，form.parse里对对象进行循环时，只能得到一个，所以用form.on循环读出来然后给新的对象
        //定义数组长度，判断是否循环完，解决异步问题
        /*form.on('file', function (name, file) {
            console.log(file);
        });*/ 
        /*form.parse(req, function(error, fields, files){
            //console.log(JSON.stringify(files));
            files_length = _.toArray(temp_files.file).length;
            _.each(temp_files.file, function (file){
                //var file_name = file.path.split('/')[2];
                var fName = (new Date()).getTime();
                switch (file.type){
                    case "image/jpeg":
                        fName = fName + ".jpg";
                        break;
                    case "image/png":
                        fName = fName + ".png";
                        break;
                    default :
                        fName =fName + ".png";
                        break;
                }
                fs.rename(file.path, uploadDir+fName, function (err) {
                    now_length += 1;
                    if( err ){
                        throw err;
                    } else {
                        files_path.push('/upload/'+fName);
                    }
                    if( now_length == files_length ){
                        res.json({path: files_path});
                        res.end();
                    }
                });
                res.end();
            });
        });*/
        
    });
}
