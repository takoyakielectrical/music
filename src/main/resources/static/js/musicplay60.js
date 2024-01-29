let musics = [];
let isPlaying = false;
let loopPromise;
let currentMusic;
let found = false;//再生中の音楽
let index = 0;//削除関係のindex
let deleted = false;
let offset = 0;
let first = true;
let singingCount = 0;



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
				if (!slideshowPausedface4 && singingCount <= 1) {
					toggleSlideshowFace4()
				}
				if (!slideshowPausedface2 && singingCount <= 2) {
					toggleSlideshowFace2()
				} if (!slideshowPausedface5 && singingCount <= 3) {
					toggleSlideshowFace5()
				}
				if (!slideshowPausedface && singingCount <= 4) {
					toggleSlideshowFace()
				}
				if (singingCount >= 1 && slideshowPausedface3) {
					toggleSlideshowFace3();
				}
				if (singingCount >= 2 && slideshowPausedface4) {
					toggleSlideshowFace4();
				}
				if (singingCount >= 3 && slideshowPausedface2) {
					toggleSlideshowFace2();
				}
				if (singingCount >= 4 && slideshowPausedface5) {
					toggleSlideshowFace5();
				}
				if (singingCount >= 5 && slideshowPausedface) {
					toggleSlideshowFace();
				}

				await playMusic(index);

			} catch (error) {
				console.error("Error during playMusic:", error);
			}
		}));
	}
	toggleSlideshowNon()
	toggleSlideshowRoa()

	if (!slideshowPausedface) {
		toggleSlideshowFace()
	}
	if (!slideshowPausedface2) {
		toggleSlideshowFace2()
	}
	if (!slideshowPausedface3) {
		toggleSlideshowFace3()
	}
	if (!slideshowPausedface4) {
		toggleSlideshowFace4()
	}
	if (!slideshowPausedface5) {
		toggleSlideshowFace5()
	}

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
					singingCount -= 1;


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
		singingCount += 1;
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
//顔動く用1
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
		slideIntervalFace = setTimeout(showSlidesFace, 70); //0.1秒ごとに画像を切り替える場合
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
//顔動く用2
var slideIndexface2 = 0;
var slideshowPausedface2 = true;
showSlidesFace2()

function showSlidesFace2() {
	var i;
	var slides = document.getElementsByClassName("myFaces2");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexface2++;
	if (slideIndexface2 > slides.length) {
		slideIndexface2 = 1;
	}
	slides[slideIndexface2 - 1].style.display = "block";
	if (!slideshowPausedface2) {
		slideIntervalFace2 = setTimeout(showSlidesFace2, 110); //0.1秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowFace2() {
	if (slideshowPausedface2) {
		slideshowPausedface2 = false;
		showSlidesFace2();
	} else {
		slideshowPausedface2 = true;
		clearTimeout(slideIntervalFace2);
	}
}
//顔動く用3
var slideIndexface3 = 0;
var slideshowPausedface3 = true;
showSlidesFace3()

function showSlidesFace3() {
	var i;
	var slides = document.getElementsByClassName("myFaces3");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexface3++;
	if (slideIndexface3 > slides.length) {
		slideIndexface3 = 1;
	}
	slides[slideIndexface3 - 1].style.display = "block";
	if (!slideshowPausedface3) {
		slideIntervalFace3 = setTimeout(showSlidesFace3, 100); //0.1秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowFace3() {
	if (slideshowPausedface3) {
		slideshowPausedface3 = false;
		showSlidesFace3();
	} else {
		slideshowPausedface3 = true;
		clearTimeout(slideIntervalFace3);
	}
}
//顔動く用4
var slideIndexface4 = 0;
var slideshowPausedface4 = true;
showSlidesFace4()

function showSlidesFace4() {
	var i;
	var slides = document.getElementsByClassName("myFaces4");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexface4++;
	if (slideIndexface4 > slides.length) {
		slideIndexface4 = 1;
	}
	slides[slideIndexface4 - 1].style.display = "block";
	if (!slideshowPausedface4) {
		slideIntervalFace4 = setTimeout(showSlidesFace4, 150); //0.1秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowFace4() {
	if (slideshowPausedface4) {
		slideshowPausedface4 = false;
		showSlidesFace4();
	} else {
		slideshowPausedface4 = true;
		clearTimeout(slideIntervalFace4);
	}
}
//顔動く用1
var slideIndexface5 = 0;
var slideshowPausedface5 = true;
showSlidesFace5()

function showSlidesFace5() {
	var i;
	var slides = document.getElementsByClassName("myFaces5");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndexface5++;
	if (slideIndexface5 > slides.length) {
		slideIndexface5 = 1;
	}
	slides[slideIndexface5 - 1].style.display = "block";
	if (!slideshowPausedface5) {
		slideIntervalFace5 = setTimeout(showSlidesFace5, 80); //0.1秒ごとに画像を切り替える場合
	}
}
function toggleSlideshowFace5() {
	if (slideshowPausedface5) {
		slideshowPausedface5 = false;
		showSlidesFace5();
	} else {
		slideshowPausedface5 = true;
		clearTimeout(slideIntervalFace5);
	}
}


// ボタンがクリックされたときに play 関数を呼ぶ
document.getElementById('yellow2_1').addEventListener('click', () => {
	play('./music/BPM60_黄/BPM60_黄1.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}


});
document.getElementById('yellow2_2').addEventListener('click', () => {
	play('./music/BPM60_黄/BPM60_黄2.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
	
});
document.getElementById('yellow2_3').addEventListener('click', () => {
	play('./music/BPM60_黄/BPM60_黄3.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
	
});
document.getElementById('yellow2_4').addEventListener('click', () => {
	play('./music/BPM60_黄/BPM60_黄4.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
	
});
document.getElementById('yellow2_5').addEventListener('click', () => {
	play('./music/BPM60_黄/BPM60_黄5.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}

});
document.getElementById('blue2_1').addEventListener('click', () => {
	play('./music/BPM60_青/BPM60＿青1.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue2_2').addEventListener('click', () => {
	play('./music/BPM60_青/BPM60＿青2.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue2_3').addEventListener('click', () => {
	play('./music/BPM60_青/BPM60＿青3.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue2_4').addEventListener('click', () => {
	play('./music/BPM60_青/BPM60＿青4.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});
document.getElementById('blue2_5').addEventListener('click', () => {
	play('./music/BPM60_青/BPM60＿青5.wav');
	if (slideshowPausedNon) {
		toggleSlideshowNon();
	}
	if (slideshowPausedRoa) {
		toggleSlideshowRoa();
	}
});


