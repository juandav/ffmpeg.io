# ffmpeg.io.js
> A quick way to use ffmpeg command

## Install

```js
npm install --save ffmpeg.io
```

## Usage
```js
var iof = require('ffmpeg.io')
```

## Change Quality

```js
var json = {
   input: './myVideo.mp4',
   format: '640x360', 
   output: './myVideoModified.mp4'
}
iof.changerQuality(json, function(value){
  //value is true or false
  console.log(value)
});
```

##Repack
```js
var json = {
   input: './mivideo.mp4',
   output: './mivideo_repack.mp4'
}
iof.repack(json, function(value){
  //value is true or false
  console.log(value)
});
```

## Generate Hls

```js
var json = {
  input: './myVideo.mp4',
  output: './myVideoModified.m3u8'
}

iof.generateHls(json, function(value){
  //value is true or false
  console.log(value);
});
```
