window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;
var g = context.createGain();

// PLAY BUTTON
play_clip = document.getElementById('play_clip_btn');
play_clip.addEventListener('click',clickHandler);

// MUTE BUTTON
mute_btn = document.getElementsByClassName('mute')[0];
mute_btn.addEventListener('click',playbackMute);

// VOLUME SLIDER
vol_slider = document.getElementById('volume');
vol_slider.addEventListener('change', volumeSlider);

function volumeSlider(e) {
  if (mute_btn.id == "activated") {
    g.gain.value = 0;
  }
  else {
    g.gain.value = vol_slider.value
  }
}
// GET: AUDIO FILE
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

// PLAY HANDLER
function clickHandler(e) {
    playSound(myBuffer);
}

// PLAY FUNCTION
function playSound(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.start(0);
  if (mute_btn.id == "activated") {
    g.gain.value = 0;
  }
  else {
    g.gain.value = vol_slider.value;
  }
  
  source.connect(g);
  g.connect(context.destination);
}

// MUTE FUNCTION
function playbackMute() {
  console.log()
  if(mute_btn.id == "") {
    g.gain.setValueAtTime(0, context.currentTime);
    mute_btn.id = "activated";
    mute_btn.innerHTML = "Unmute";
  } else {
    g.gain.setValueAtTime(vol_slider.value, context.currentTime);
    mute_btn.id = "";
    mute_btn.innerHTML = "Mute";
  }
}