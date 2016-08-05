var exports = modules.exports = {};

var c;
var ctx;
var width;
var height;
var emitters;
var sources;
var FPS = 60;
var on = false;

exports.init = function(id) {
  c = document.getElementById(id);
  ctx = c.getContext("2d");
  width = window.innerWidth;
  height = window.innerHeight;
  emitters = [];
  sources = [];
}
/*
takes in an emitter preset specifier and adds that preset to the list of emitters.
*/
exports.newEmitter = function(preset, position) {
}
/*
takes in an emitter with custom properties and adds it to the list of emitters.
type: 'point', 'line'
size: decimal, used to specify length for type 'line'
spread: the spread in velocity of spawned emojis
frequency: amount of times per second an emoji is spawned
duration: how long the emoji lasts, -1 for infinite (disappears once off the canvas)
velocity: 
*/
exports.newEmitterCustom = function(type, size, spread, frequency, duration, velocity, gravity, position, live) {
  emitters.push({
    type: type,
    size: size,
    spread: spread,
    frequency: frequency,
    duration: duration,
    velocity: velocity,
    gravity: gravity,
    position: position,
    live: live,
    emojis: []
  });
}
exports.newEmoji = function() {
    var emojiID = Math.floor(Math.random() * images.length);
    var initX = Math.floor(Math.random() * ctx.canvas.width); 
    var initY = -200;
    var initVelX = Math.floor((Math.random() * -5) + 2.5);
    var initVelY = Math.floor(Math.random() * 5);
    return ({emoji: emojiID, posX: initX, posY: initY, velX: initVelX, velY: initVelY});
}

exports.update = function() {
  //Update each emitter
  for (var i = 0; i < emitters.length; i++) {

    //Update emojis in emitter
    for (var j = 0; j < emitters[i].emojis.length; j++) {
      emitters[i].emojis[j].velX += emitters[i].gravity[0];
      emitters[i].emojis[j].velY += emitters[i].gravity[1];
      emitters[i].emojis[j].posX += emitters[i].emojis[j].velX;
      emitters[i].emojis[j].posY += emitters[i].emojis[j].velY;
    }
  }
}

setInterval(function() {
  if (on) {
    update();
    draw();
  }
}, 1000/FPS);


