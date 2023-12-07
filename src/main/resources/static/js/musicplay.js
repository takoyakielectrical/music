const musics = [];
let isPlaying = false;
let loopPromise;
let currentMusic; // 現在再生中の音楽

// 音楽ファイルをプリロードする関数
function preloadMusic(url) {
	return new Promise((resolve, reject) => {
		const music = new Audio(url);
		music.addEventListener('canplaythrough', () => resolve(music));
		music.addEventListener('error', reject);
	});
}

async function playMusic(index) {
	const music = musics[index];
	currentMusic = music; // 現在の音楽を更新

	return new Promise((resolve) => {
		const offset = 0.017; // 次の曲を開始するタイミングのオフセット（秒）

		music.addEventListener('ended', () => {
			resolve();
		});

		// 再生前に再生位置をリセット
		music.currentTime = 0;

		// 音楽が既に再生中でない場合にのみ再生
		if (music.paused) {
			music.play()
				.then(() => {
					console.log("Played:", music.src);
				})
				.catch((error) => {
					console.error("Error playing music:", error);
					resolve();
				});
		}

		// 次の曲を開始するタイミングを設定
		setTimeout(() => {
			resolve();
		}, (music.duration - offset) * 1000);
	});
}


// 音楽を無限に再生するループ
async function playLoop() {
	while (true) {
		await Promise.all(musics.map((_, index) => playMusic(index)));
	}
}

// ページがアンロードされる前に再生を停止する
window.addEventListener('beforeunload', () => {
	if (currentMusic) {
		currentMusic.pause();
		currentMusic = null;
	}
});

// 新しいボタンの活性化状態を管理する配列
const buttonStates = [true, true, true, true, true];

// 音楽を停止する関数
function stopMusic() {
	if (currentMusic) {
		currentMusic.pause();
		currentMusic = null;
	}
	isPlayingMusic = false;
}

// 新しい音楽を追加し、再生を制御する関数
async function play(url) {
	stopMusic();

	const music = new Audio(url);
	musics.push(music);

	if (!isPlayingMusic) {
		isPlayingMusic = true;
		loopPromise = playLoop();
	}

	// 新しいボタンを非活性化
	const newButtonIndex = musics.length - 1;
	buttonStates[newButtonIndex] = false;
	updateButtonStates();

	console.log("Added:", url);
}

// ボタンの状態を更新する関数
function updateButtonStates() {
	for (let i = 1; i <= 5; i++) {
		const button = document.getElementById(`b${i}`);
		button.disabled = !buttonStates[i - 1];
	}
}

// ボタンがクリックされたときに play 関数を呼ぶ
document.getElementById('b1').addEventListener('click', () => {
    disableButton('b1'); // ボタン1がクリックされたら非活性化
    play('./music/ああああ.wav');
});

document.getElementById('b2').addEventListener('click', () => {
    disableButton('b2'); // ボタン1がクリックされたら非活性化
    play('./music/test4秒.wav');
});

document.getElementById('b3').addEventListener('click', () => {
    disableButton('b3'); // ボタン1がクリックされたら非活性化
    play('./music/test2.wav');
});

document.getElementById('b4').addEventListener('click', () => {
    disableButton('b4'); // ボタン1がクリックされたら非活性化
    play('./music/test.wav');
});

document.getElementById('b5').addEventListener('click', () => {
    disableButton('b5'); // ボタン1がクリックされたら非活性化
    play('./music/test3.wav');
});


// 新しいボタンがクリックされたときの処理
for (let i = 1; i <= 5; i++) {
    const newButton = document.getElementById(`活性${i}`);
    newButton.addEventListener('click', () => {
        // 既に再生中の音楽があれば停止
        stopMusic();
        // 対応するボタンを非活性化
        const originalButtonId = `b${i}`;
        disableButton(originalButtonId);
        // 非活性化されたボタンを活性化
        buttonStates[i - 1] = true;
        updateButtonStates();
    });
}



// 新しい音楽を追加し、再生を制御する関数
async function play(url) {
	// 同じ曲が既に再生中である場合は何もしない
	if (currentMusic && currentMusic.src === url) {
		return;
	}

	// 既に再生中の音楽があれば停止
	stopMusic();

	// ボタンIDの取得
	const buttonId = getButtonIdFromUrl(url);

	// ボタンを非活性化
	disableButton(buttonId);

	const music = new Audio(url);
	musics.push(music);

	// 新しい playLoop を開始
	isPlayingMusic = true;
	loopPromise = playLoop();

	console.log("Added:", url);
}

// ボタンを非活性化する関数
function disableButton(buttonId) {
	const button = document.getElementById(buttonId);
	if (button) {
		button.disabled = true;
	}
}

// ボタンを活性化する関数
function enableButton(buttonId) {
	const button = document.getElementById(buttonId);
	if (button) {
		button.disabled = false;
	}
}

	// URLからボタンIDを取得する関数
	function getButtonIdFromUrl(url) {
	    // "活性" から始まり、その後に数字が続く場合、対応する元のボタンのIDを生成
	    const match = url.match(/活性(\d+)/);
	    if (match) {
	        const originalButtonNumber = parseInt(match[1]);
	        if (originalButtonNumber >= 1 && originalButtonNumber <= 5) {
	            return `b${originalButtonNumber}`;
	        }
	    }
	    return "";
	}





