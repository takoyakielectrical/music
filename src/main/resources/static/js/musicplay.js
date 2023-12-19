let musics = [];
let isPlaying = false;
let loopPromise;
let currentMusic;
let found = false;//再生中の音楽
let index = 0;//削除関係のindex
let deleted = false;
let offset = 0;
let first = true;



async function playMusic(index) {
	// musics 配列から指定されたインデックスの音楽を取得
	const music = musics[index];

	// 現在の音楽を更新
	currentMusic = music;

	// Promise を返す（この Promise は再生が終了するまで待機する役割を果たす）
	return new Promise((resolve) => {
		// 次の曲を開始するタイミングのオフセット（秒）
		if (first) {
			offset = 0.015;
		}
		else {
			offset = 0.015;
		}

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
	while (deleted === false) {
		await Promise.all(musics.map(async (_, index) => {
			try {
				await playMusic(index);
			} catch (error) {
				console.error("Error during playMusic:", error);
			}
		}));
	}
	toggleSlideshow()
}



// 新しい音楽を追加し、再生を制御する関数
async function play(url) {
	let fa = ("<audio preload=\"auto\" src=\"" + url + "\"></audio>");
	if (musics != null) {
		if (index != 0) {
			// 既に再生中の音楽を探す
			first = false;
			for (i = 0; i < musics.length; i++) {
				if (fa === musics[i].outerHTML) {
					found = true;
					index = i;
					musics.splice(index, 1);
					if (musics.length == 0) {
						deleted = true;
					}

				}
			}
		}
	}
	//音楽がなければ追加
	if (!found) {
		const music = new Audio(url);
		musics.push(music);
		index += 1;
		deleted = false;
	}
	found = false;
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
var slideIndex = 0;
var slideshowPaused = true;
showSlides()
function showSlides() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	slides[slideIndex - 1].style.display = "block";
	if (!slideshowPaused) {
		slideInterval = setTimeout(showSlides, 70); //0.1秒ごとに画像を切り替える場合
	}
}
function toggleSlideshow() {
	console.log(slideshowPaused)
	if (slideshowPaused) {
		slideshowPaused = false;
		showSlides();
	} else {
		slideshowPaused = true;
		clearTimeout(slideInterval);
	}
}

// ボタンがクリックされたときに play 関数を呼ぶ
document.getElementById('red1').addEventListener('click', () => {
	play('./music/赤い人/赤い人1.wav');
	if (slideshowPaused) {
		toggleSlideshow()
	}
});
document.getElementById('red2').addEventListener('click', () => {
	play('./music/赤い人/赤い人2.wav');
});
document.getElementById('red3').addEventListener('click', () => {
	play('./music/赤い人/赤い人3.wav');
});
document.getElementById('red4').addEventListener('click', () => {
	play('./music/赤い人/赤い人4.wav');
});
document.getElementById('blue1').addEventListener('click', () => {
	play('./music/青い人/青い人1.wav');
});
document.getElementById('blue2').addEventListener('click', () => {
	play('./music/青い人/青い人2.wav');
});
document.getElementById('blue3').addEventListener('click', () => {
	play('./music/青い人/青い人3.wav');
});
document.getElementById('blue4').addEventListener('click', () => {
	play('./music/青い人/青い人4.wav');
});
document.getElementById('blue5').addEventListener('click', () => {
	play('./music/青い人/青い人5.wav');
});
document.getElementById('green1').addEventListener('click', () => {
	play('./music/緑の人/緑の人1.wav');
});
document.getElementById('green2').addEventListener('click', () => {
	play('./music/緑の人/緑の人2.wav');
});
document.getElementById('green3').addEventListener('click', () => {
	play('./music/緑の人/緑の人3.wav');
});
document.getElementById('green4').addEventListener('click', () => {
	play('./music/緑の人/緑の人4.wav');
});
document.getElementById('green5').addEventListener('click', () => {
	play('./music/緑の人/緑の人5.wav');
});
