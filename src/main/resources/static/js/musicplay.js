// Audio要素を作成
var audio = [];

// ボタンの要素を取得
var playPauseButton1 = document.getElementById('b1');
// ボタンの要素を取得
var playPauseButton2 = document.getElementById('b2');
// ボタンの要素を取得
var playPauseButton3 = document.getElementById('b3');
// ボタンの要素を取得
var playPauseButton4 = document.getElementById('b4');
// ボタンの要素を取得
var playPauseButton5 = document.getElementById('b5');


// 再生/停止の状態を判定する変数
var isPlaying1 = false;
var b1Index = null;
// 再生/停止の状態を判定する変数
var isPlaying2 = false;
var b2Index = null;
// 再生/停止の状態を判定する変数
var isPlaying3 = false;
// 再生/停止の状態を判定する変数
var isPlaying4 = false;
// 再生/停止の状態を判定する変数
var isPlaying5 = false;

var isPlaying = false;

// ボタンがクリックされたときの処理
playPauseButton1.addEventListener('click', function() {
	if (!isPlaying1) {
		const temp = new Audio('./music/test.wav');
		temp.loop = true;
		audio.push(temp);
		console.log(audio);
		b1Index = audio.length - 1;
		isPlaying1 = true;
		play();
	} else {
		isPlaying1 = false;
		play(b1Index);
	}
});
// ボタンがクリックされたときの処理
playPauseButton2.addEventListener('click', function() {
	if (!isPlaying2) {
		const temp = new Audio('./music/ああああ.wav');
		temp.loop = true;
		audio.push(temp);
		b2Index = audio.length - 1;
		isPlaying2 = !isPlaying2;
		play();
	} else {
		isPlaying2 = !isPlaying2;
		play(b2Index);
	}
});
function play(index) {
	if (index == null) {
		isPlaying = true;
		for (var temp of audio) {
			if (temp != null) {
				temp.play();
			}
		}

	} else {
		audio[index].pause()
		delete audio[index]
		isPlaying = false;

	}
}



