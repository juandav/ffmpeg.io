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
        params = helpers.objectToArray({
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
         return callback('Error');
    }
};

//Comando base para la generación hls y generacion de arbol

//ffmpeg -i mivideo.mp4 pl.m3u8

//ffmpeg -i video-a.mp4  -c:a libmp3lame -ar 48000 -ab 64k  -c:v libx264   -b:v 128k -flags -global_header -map 0 -f segment  -segment_list test.m3u8 -segment_time 30 -segment_format mpegts segment_%05d.ts

//mkdir ts
//ffmpeg -y -framerate 24 -i 720/sintel_trailer_2k_%4d.png -i sintel_trailer-audio.flac -c:a aac -strict experimental -ac 2 -b:a 64k -ar 44100 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 1.3 -b:v 120K -maxrate 192K -bufsize 1M -r 10 -g 30 -f hls -hls_time 9 -hls_list_size 0 -s 320x180 ts/320x180.m3u8
//ffmpeg -y -framerate 24 -i 720/sintel_trailer_2k_%4d.png -i sintel_trailer-audio.flac -c:a aac -strict experimental -ac 2 -b:a 64k -ar 44100 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 2.1 -b:v 400K -maxrate 500K -bufsize 2M  -r 10 -g 30  -f hls -hls_time 9 -hls_list_size 0 -s 480x270 ts/480x270.m3u8
//ffmpeg -y -framerate 24 -i 720/sintel_trailer_2k_%4d.png -i sintel_trailer-audio.flac -c:a aac -strict experimental -ac 2 -b:a 96k -ar 44100 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.1 -b:v 600K -maxrate 1M -bufsize 3M  -r 24 -g 72 -f hls -hls_time 9 -hls_list_size 0 -s 640x360 ts/640x360.m3u8
//ffmpeg -y -framerate 24 -i 720/sintel_trailer_2k_%4d.png -i sintel_trailer-audio.flac -c:a aac -strict experimental -ac 2 -b:a 96k -ar 44100 -c:v libx264 -pix_fmt yuv420p -profile:v main -level 3.2 -b:v 1.5M -maxrate 2M -bufsize 6M -r 24 -g 72 -f hls -hls_time 9 -hls_list_size 0 -s 1280x720 ts/1280x720.m3u8

//-i <-> Equivale a la ruta donde se encuentra el video.
//-f hls 
//-hls_time 9 
//-hls_list_size 0 
//-s 320x180 <-> Formato del video
//(Se deja al final del comando) 180p/pl.m3u8

//{input:'mivideo.mp4', output:'mihls.m3u8', format:'640x360'}
// ffmpeg -i mivideo.mp4 -s 640x360 -y mihls.m3u8

//{input:'mivideo.mp4', output:'mihls.m3u8'}
//// ffmpeg -i mivideo.mp4 -y mihls.m3u8
ffmpegio.generateHls = function(json, callback){
    if(Object.keys(json).length === 2){
        var params = {};
        params = helpers.objectToArray({
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
        return callback('Error');
    }
};

//EJEMPLO DE USO
//command
//params
//value -> resultado de la ejecución del comando
//exec('node', ['-v', '-v'], function(stdout, stderr, code){
   //console.log(stdout + stderr + code);    
//});