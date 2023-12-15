let musics = [];
let isPlaying = false;
let loopPromise;
let currentMusic;
let found = false;//再生中の音楽
let index = 0;//削除関係のindex
let deleted = false;

// 音楽ファイルをプリロードする関数
function preloadMusic(url) {
	return new Promise((resolve, reject) => {
		let music = new Audio(url);
		music.addEventListener('canplaythrough', () => resolve(music));
		music.addEventListener('error', reject);
	});
}

async function playMusic(index) {
	// musics 配列から指定されたインデックスの音楽を取得
	const music = musics[index];

	// 現在の音楽を更新
	currentMusic = music;

	// Promise を返す（この Promise は再生が終了するまで待機する役割を果たす）
	return new Promise((resolve) => {
		// 次の曲を開始するタイミングのオフセット（秒）
		const offset = 0.015;

		// 音楽が再生終了したときに解決するイベントリスナーを追加
		music.addEventListener('ended', () => {
			// Promise を解決して、再生が終了したことを通知
			resolve();
		});

		// 音楽の再生位置をリセット
		music.currentTime = 0;

		// 音楽の再生を開始
		music.play()
			.then(() => {
				// ここには再生が成功したときの処理を追加できます
			})
			.catch((error) => {
				// エラーが発生した場合はコンソールにログを出力し、Promise を解決
				console.error("Error playing music:", error);
				resolve();
			});

		// 次の曲を開始するタイミングを設定
		setTimeout(() => {
			// Promise を解決して、次の曲の再生を開始
			resolve();
		}, (music.duration - offset) * 1000);
	});
}


// 音楽を無限に再生するループ
async function playLoop() {

	while (deleted = false) {
		console.log(deleted);
		console.log("loop");
		await Promise.all(musics.map(async (_, index) => {
			try {
				await playMusic(index);
			} catch (error) {
				console.error("Error during playMusic:", error);
			}
		}));
	}
}


// 新しい音楽を追加し、再生を制御する関数
async function play(url) {
	console.log(url);
	let fa = ("<audio preload=\"auto\" src=\"" + url + "\"></audio>");
	if (musics != null) {
		if (index != 0) {
			// 既に再生中の音楽を探す
			for (i = 0; i < musics.length; i++) {
				if (fa === musics[i].outerHTML) {
					found = true;
					index = i;
					musics.splice(index, 1);
					if (musics.length == 0) {
						deleted = true;
						console.log("trueninatta");
					}

				}
			}
		}
	}
	//音楽がなければ追加
	if (!found) {
		const music = new Audio(url);
		console.log("success");
		musics.push(music);
		index += 1;
		deleted = false;
	}
	if (musics.length != 0) {
		// 既に再生中でない場合のみ新しい playLoop を開始
		if (!isPlaying) {
			isPlaying = true;
			loopPromise = playLoop();
		} else {
			// 既存の playLoop がある場合はそれが終わるまで待機してから新しい playLoop を開始
			await loopPromise;
			isPlaying = false;
			loopPromise = playLoop();
		}
	}
}

// ボタンがクリックされたときに play 関数を呼ぶ
document.getElementById('b1').addEventListener('click', () => {
	play('./music/赤い人/赤い人1.wav');
});
document.getElementById('b2').addEventListener('click', () => {
	play('./music/赤い人/赤い人2.wav');
});
document.getElementById('b3').addEventListener('click', () => {
	play('./music/test2.wav');
});
document.getElementById('b4').addEventListener('click', () => {
	play('./music/test.wav');
});
document.getElementById('b5').addEventListener('click', () => {
	play('./music/test3.wav');
});
