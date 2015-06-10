/*
This is a fork of "Trippy Pac Man" by @everblind on codepen.io
*/

var canvas;
var context;
var width;
var height;
var tick = 0;
var PI2 = 128;
var waveAmplitude = 40;
var waveOffset = 0;
var waveSteps = 128;
var mazeHeight = 60;
var mazeBorderGap = 10;
var pillsOffset = 0;
var pacMouth = 1;
var pacRadius = 10;
var pacLineWidth = 44;
var pacX = 10;
var pacY = 10;

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvas.style.width = window.innerWidth + "px";
  setTimeout(function() {
    canvas.style.height = window.innerHeight + "px";
  }, 0);

  context = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  loop();
};

function loop() {
  fillBackground();
  drawLevel();
  drawPills();
  drawPacman();

  waveOffset += 0.1;

  ++tick;

  requestAnimationFrame(loop);
}

function fillBackground() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
}

function drawLevel() {
  drawWave(0, (height >> 1) - mazeHeight, 3);
  drawWave(0, (height >> 1) - mazeHeight - mazeBorderGap, 3);
  drawWave(0, (height >> 1) + mazeHeight, 3);
  drawWave(0, (height >> 1) + mazeHeight + mazeBorderGap, 3);
}

function drawPacman() {
  pacX = Math.sin(tick / 80) * ((width - (600)) >> 1) + ((width - 600) >> 1) + 300;
  //pacX = Math.sin(Math.PI) * (width >> 1) + (width >> 1);
  pacY = Math.sin((pacX / width) * PI2 + waveOffset) * ((Math.sin(tick / 100) + 0.4)) * waveAmplitude;

  context.beginPath();
  context.strokeStyle = "#FCFC00";
  context.lineWidth = pacLineWidth;
  context.arc(pacX, (height >> 1) + pacY, mazeHeight - 16 - (pacLineWidth >> 1), Math.sin(tick / 3) * pacMouth + pacMouth, Math.sin(tick / 3) * -pacMouth + PI2 - pacMouth);
  context.stroke();
}

function drawPills() {
  var i = ((pacX + width / 32) / (width) * PI2);
  var length = 128;

  for (i; i < length; i += waveSteps) {
    var px = (i / PI2) * width - (pillsOffset * (width / (PI2 / waveSteps)));
    var py = Math.sin((px / width) * PI2 + waveOffset) * ((Math.sin(tick / 100) + 0.4) * waveAmplitude) + (height >> 1);

    context.beginPath();
    context.fillStyle = "#feba9e";
    context.arc(px, py, 5, 0, PI2);
    context.fill();
    context.closePath();
  }

  pillsOffset += 0.0942;

  if (pillsOffset >= 1) pillsOffset = 0;
}

function drawWave(x, y, lineWidth) {
  var i = 0;
  var length = PI2;

  context.strokeStyle = '#1919ac';
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(0, Math.sin(i + waveOffset) * ((Math.sin(tick / 100) + 0.4) * waveAmplitude) + y);

  for (i; i < length; i += waveSteps) {
    context.lineTo((i / PI2) * width, Math.sin(i + waveOffset) * ((Math.sin(tick / 100) + 0.4) * waveAmplitude) + y);
    context.stroke();
  }
}