var fs = require('fs');

module.exports = function (app, path, uploadDir) {
    app.post(path, function (req, res, next) {
        var files_path = [];
        var files = req.body.file;
        var fName = (new Date()).getTime();

        if( files.length == undefined ){
            fs.rename(files.path, uploadDir+fName, function (err) {
                if( err ){
                    throw err;
                } else {
                    res.json({path: '/upload/'+fName});
                    res.end();
                }
            });
        }else{
            for(var k in files){
                var file = files[k];
                fs.rename(file.path, uploadDir+fName, function (err) {
                    if( err ){
                        throw err;
                    } else {
                        files_path.push('/upload/'+fName);
                    }
                    if( files.length == files_path.length ){
                        res.json({path: files_path});
                        res.end();
                    }
                });
            }

        }
        
    })
};

