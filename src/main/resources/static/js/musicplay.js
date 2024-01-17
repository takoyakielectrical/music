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
			offset = 0.0001;
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
	toggleSlideshowNon()
	toggleSlideshowRoa()
	toggleSlideshowFace()
	
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
					musics.splice(i, 1);
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

//のんちゃん動く用
var slideIndexNon = 0;
var slideshowPausedNon = true;
showSlidesNon()

function showSlidesNon() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexNon++;
	if (slideIndexNon > slides.length) {
		slideIndexNon = 1;
	}
	slides[slideIndexNon - 1].style.display = "block";
	if (!slideshowPausedNon) {
		slideIntervalNon = setTimeout(showSlidesNon, 70); //0.7秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowNon() {
	console.log(slideshowPausedNon)
	if (slideshowPausedNon) {
		slideshowPausedNon = false;
		showSlidesNon();
	} else {
		slideshowPausedNon = true;
		clearTimeout(slideIntervalNon);
	}
}

//ロアくん動く用
var slideIndexRoa = 0;
var slideshowPausedRoa = true;
showSlidesRoa()

function showSlidesRoa() {
	var i;
	var slides = document.getElementsByClassName("mySlides2");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexRoa++;
	if (slideIndexRoa > slides.length) {
		slideIndexRoa = 1;
	}
	slides[slideIndexRoa - 1].style.display = "block";
	if (!slideshowPausedRoa) {
		slideIntervalRoa = setTimeout(showSlidesRoa, 70); //0.07秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowRoa() {
	console.log(slideshowPausedRoa);
	if (slideshowPausedRoa) {
		slideshowPausedRoa = false;
		showSlidesRoa();
	} else {
		slideshowPausedRoa = true;
		clearTimeout(slideIntervalRoa);
	}
}
//顔動く用
var slideIndexface = 0;
var slideshowPausedface = true;
showSlidesFace()

function showSlidesFace() {
	var i;
	var slides = document.getElementsByClassName("myFaces");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexface++;
	if (slideIndexface > slides.length) {
		slideIndexface = 1;
	}
	slides[slideIndexface - 1].style.display = "block";
	if (!slideshowPausedface) {
		slideIntervalFace = setTimeout(showSlidesface, 100); //0.1秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowFace() {
	if (slideshowPausedface) {
		slideshowPausedface = false;
		showSlidesFace();
	} else {
		slideshowPausedface = true;
		clearTimeout(slideIntervalFace);
	}
}

// ボタンがクリックされたときに play 関数を呼ぶ
document.getElementById('red1').addEventListener('click', () => {
	play('./music/赤い人/赤い人1.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
	if (slideshowPausedface) {
		toggleSlideshowFace();
	}
});
document.getElementById('red2').addEventListener('click', () => {
	play('./music/赤い人/赤い人2.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('red3').addEventListener('click', () => {
	play('./music/赤い人/赤い人3.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('red4').addEventListener('click', () => {
	play('./music/赤い人/赤い人4.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue1').addEventListener('click', () => {
	play('./music/青い人/青い人1.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue2').addEventListener('click', () => {
	play('./music/青い人/青い人2.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue3').addEventListener('click', () => {
	play('./music/青い人/青い人3.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue4').addEventListener('click', () => {
	play('./music/青い人/青い人4.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue5').addEventListener('click', () => {
	play('./music/青い人/青い人5.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('green1').addEventListener('click', () => {
	play('./music/緑の人/緑の人1.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('green2').addEventListener('click', () => {
	play('./music/緑の人/緑の人2.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('green3').addEventListener('click', () => {
	play('./music/緑の人/緑の人3.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('green4').addEventListener('click', () => {
	play('./music/緑の人/緑の人4.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('green5').addEventListener('click', () => {
	play('./music/緑の人/緑の人5.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
