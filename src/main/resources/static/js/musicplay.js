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
var b3Index = null;
// 再生/停止の状態を判定する変数
var isPlaying4 = false;
var b4Index = null;
// 再生/停止の状態を判定する変数
var isPlaying5 = false;
var b5Index = null;

var isPlaying = false;

// ボタンがクリックされたときの処理
playPauseButton1.addEventListener('click', function() {
	//選択している楽曲が再生されてなかったら再生
	if (!isPlaying1) {
		const temp = new Audio('./music/test.wav');
		temp.loop = true;
		//配列にAudioを格納
		audio.push(temp);
		console.log(audio);
		//添え字保存
		b1Index = audio.length - 1;
		isPlaying1 = true;
		play();
		//再生されていたら保存してた添え字を渡して削除
	} else {
		isPlaying1 = false;
		play(b1Index);
	}
});
// ボタンがクリックされたときの処理
playPauseButton2.addEventListener('click', function() {
	//選択している楽曲が再生されてなかったら再生
	if (!isPlaying2) {
		const temp = new Audio('./music/ああああ.wav');
		temp.loop = true;
		//配列にAudioを格納
		audio.push(temp);
		//添え字保存
		b2Index = audio.length - 1;
		isPlaying2 = !isPlaying2;
		play();
		//再生されていたら保存してた添え字を渡して削除
	} else {
		isPlaying2 = !isPlaying2;
		play(b2Index);
	}
});
// ボタンがクリックされたときの処理
playPauseButton3.addEventListener('click', function() {
	//選択している楽曲が再生されてなかったら再生
	if (!isPlaying3) {
		const temp = new Audio('./music/test2.wav');
		temp.loop = true;
		//配列にAudioを格納
		audio.push(temp);
		//添え字保存
		b2Index = audio.length - 1;
		isPlaying3 = !isPlaying3;
		play();
		//再生されていたら保存してた添え字を渡して削除
	} else {
		isPlaying3 = !isPlaying3;
		play(b3Index);
	}
});
// ボタンがクリックされたときの処理
playPauseButton4.addEventListener('click', function() {
	//選択している楽曲が再生されてなかったら再生
	if (!isPlaying4) {
		const temp = new Audio('./music/ああああ.wav');
		temp.loop = true;
		//配列にAudioを格納
		audio.push(temp);
		//添え字保存
		b4Index = audio.length - 1;
		isPlaying4 = !isPlaying4;
		play();
		//再生されていたら保存してた添え字を渡して削除
	} else {
		isPlaying4 = !isPlaying4;
		play(b4Index);
	}
});
// ボタンがクリックされたときの処理
playPauseButton5.addEventListener('click', function() {
	//選択している楽曲が再生されてなかったら再生
	if (!isPlaying5) {
		const temp = new Audio('./music/ああああ.wav');
		temp.loop = true;
		//配列にAudioを格納
		audio.push(temp);
		//添え字保存
		b2Index = audio.length - 1;
		isPlaying5 = !isPlaying5;
		play();
		//再生されていたら保存してた添え字を渡して削除
	} else {
		isPlaying5 = !isPlaying5;
		play(b5Index);
	}
});






function play(index) {
	//添え字が渡されてないなら楽曲を再生する
	if (index == null) {
		isPlaying = true;
		for (var temp of audio) {
			//すでに消した添え字のところ以外を再生
			if (temp != null) {
				temp.play();
			}
		}
//添え字が渡された場合楽曲をリストから削除
	} else {
		audio[index].pause()
		delete audio[index]
		isPlaying = false;

	}
}



