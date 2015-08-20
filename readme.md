# ffmpeg.io.js
> A quick way to use ffmpeg command

## Install

```js
npm install --save ffmpeg.io
```

## Change Quality

```js
var iof = require('ffmpeg.io')
var json = {
   input: './myVideo.mp4',
   format: '640x360', 
   output: './myVideoModified.mp4'
}
iof.changerQuality(json, function(value){
  //value is true or false
  console.log(value)
})
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
})
```
