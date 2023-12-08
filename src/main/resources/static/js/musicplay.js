// Audio要素を作成
var audio = [];

// ボタンの要素を取得
var playPauseButton1 = document.getElementById('b1');
var playPauseButton2 = document.getElementById('b2');
var playPauseButton3 = document.getElementById('b3');
var playPauseButton4 = document.getElementById('b4');
var playPauseButton5 = document.getElementById('b5');

// 再生/停止の状態を判定する変数
var isPlaying1 = false;
var b1Index = null;
var isPlaying2 = false;
var b2Index = null;
var isPlaying3 = false;
var b3Index = null;
var isPlaying4 = false;
var b4Index = null;
var isPlaying5 = false;
var b5Index = null;

var isPlaying = false;

// ボタンがクリックされたときの処理
playPauseButton1.addEventListener('click', function() {
  if (!isPlaying1) {
    const temp = new Audio('./music/test.wav');
    temp.loop = true;
    temp.addEventListener('loadedmetadata', function() {
      synchronizePlayback();
      isPlaying1 = true;
      audio.push(temp);
      console.log(audio);
      b1Index = audio.length - 1;
      play();
    });
  } else {
    isPlaying1 = false;
    play(b1Index);
  }
});

playPauseButton2.addEventListener('click', function() {
  if (!isPlaying2) {
    const temp = new Audio('./music/ああああ.wav');
    temp.loop = true;
    temp.addEventListener('loadedmetadata', function() {
      synchronizePlayback();
      isPlaying2 = !isPlaying2;
      audio.push(temp);
      b2Index = audio.length - 1;
      play();
    });
  } else {
    isPlaying2 = !isPlaying2;
    play(b2Index);
  }
});

playPauseButton3.addEventListener('click', function() {
  if (!isPlaying3) {
    const temp = new Audio('./music/test2.wav');
    temp.loop = true;
    temp.addEventListener('loadedmetadata', function() {
      synchronizePlayback();
      isPlaying3 = !isPlaying3;
      audio.push(temp);
      b3Index = audio.length - 1;
      play();
    });
  } else {
    isPlaying3 = !isPlaying3;
    play(b3Index);
  }
});

playPauseButton4.addEventListener('click', function() {
  if (!isPlaying4) {
    const temp = new Audio('./music/ああああ.wav');
    temp.loop = true;
    temp.addEventListener('loadedmetadata', function() {
      synchronizePlayback();
      isPlaying4 = !isPlaying4;
      audio.push(temp);
      b4Index = audio.length - 1;
      play();
    });
  } else {
    isPlaying4 = !isPlaying4;
    play(b4Index);
  }
});

playPauseButton5.addEventListener('click', function() {
  if (!isPlaying5) {
    const temp = new Audio('./music/ああああ.wav');
    temp.loop = true;
    temp.addEventListener('loadedmetadata', function() {
      synchronizePlayback();
      isPlaying5 = !isPlaying5;
      audio.push(temp);
      b5Index = audio.length - 1;
      play();
    });
  } else {
    isPlaying5 = !isPlaying5;
    play(b5Index);
  }
});

function synchronizePlayback() {
  audio.forEach(function(audioElement) {
    if (audioElement) {
      audioElement.currentTime = 0;
    }
  });
}

function play(index) {
  if (index == null) {
    isPlaying = true;
    for (var temp of audio) {
      if (temp != null) {
        temp.play();
      }
    }
  } else {
    audio[index].pause();
    delete audio[index];
    isPlaying = false;
  }
}




