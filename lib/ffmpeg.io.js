var spawn = require('child_process').spawn;
//var fs = require('');

var ffmpegio = module.exports;

function exec(command, params, callback){
    var e = spawn(command, params);
    var stderr = '', stdout = '';

    e.stdout.on('data', function (data) {
        stdout += data;
    });

    e.stderr.on('data', function (err) {
        stderr += err;
    });

    e.on('close', function (code) {
        callback(stdout, stderr, code);
    });
};

function objectToArray (obj) {
    var arr = [], key;

    for (key in obj) {
        var objectValue = obj[key];
        if(objectValue instanceof Array) {
            objectValue.forEach(function (elm, i) {
                arr.push(key, elm);
            });
        } else {
            arr.push(key, objectValue);
        }
    }
    return arr;
};

//{input:'miVideo.mp4', format:'640x360', output:'miVideo.mp4'}
//ffmpeg -i miVideo.mp4 -vcodec libx264 -crf 30 -threads 0 -s 640x360 -acodec copy -y modificado.mp4
ffmpegio.changerQuality = function(json, callback){
    if(Object.keys(json).length === 3){
        var params = {};
        params = objectToArray({
            '-i': json.input,            
            '-vcodec': 'libx264',
            '-crf': json.quality || '30',
            '-threads': json.threads || '0',
            '-s': json.format,
            '-acodec': 'copy',
            '-y': json.output
        });
        exec('ffmpeg', params, function(stdout, stderr, code){
            console.log(stdout + stderr + code);
            if(code === 0){
                callback(true);
            }else{
                callback(false);
            }
        });
    }else{
         return callback('number of parameters unvalid');
    }
};

//{input:'mivideo.mp4', output:'mihls.m3u8'}
//// ffmpeg -i mivideo.mp4 -y mihls.m3u8
ffmpegio.generateHls = function(json, callback){
    if(Object.keys(json).length === 2){
        var params = {};
        params = objectToArray({
            '-i': json.input,
            '-y': json.output
        });
        exec('ffmpeg', params, function(stdout, stderr, code){
            console.log(stdout + stderr + code);
            if(code === 0){
                callback(true);
            }else{
                callback(false);
            }
        });
    }else{
        return callback('number of parameters unvalid');
    }
};

//EXAMPLE OF USE
//command
//params
//value -> result of command execution
//exec('node', ['-v', '-v'], function(stdout, stderr, code){
   //console.log(stdout + stderr + code);    
//});
