window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;

play_clip = document.getElementById('play_clip');
play_clip.addEventListener('click',clickHandler);

var request = new XMLHttpRequest();

request.open('GET', '/audiofiles/piano1.wav', true);

request.responseType = 'arraybuffer';

// Decode asynchronously
request.onload = function() {
  context.decodeAudioData(request.response, function(theBuffer) {
    myBuffer = theBuffer;
  }, onError);
}
request.send();

function onError() {
  console.log("error")
}

function playSound(buffer) {
  var source = context.createBufferSource(), g = context.createGain();
  source.buffer = buffer;
  source.start(0);
  g.gain.value = 0.5;
  source.connect(g);
  g.connect(context.destination);
}

function clickHandler(e) {
    playSound(myBuffer);
}