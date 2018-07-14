window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;
var g = context.createGain();

play_clip = document.getElementById('play_clip_btn');
play_clip.addEventListener('click',clickHandler);

mute_btn = document.getElementsByClassName('mute')[0];
mute_btn.addEventListener('click',voiceMute);

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
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.start(0);
  g.gain.value = 1;
  source.connect(g);
  g.connect(context.destination);
}

function clickHandler(e) {
    playSound(myBuffer);
}


function voiceMute() {
  console.log()
  if(mute_btn.id == "") {
    g.gain.setValueAtTime(0, context.currentTime);
    mute_btn.id = "activated";
    mute_btn.innerHTML = "Unmute";
  } else {
    g.gain.setValueAtTime(1, context.currentTime);
    mute_btn.id = "";
    mute_btn.innerHTML = "Mute";
  }
}