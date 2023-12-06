const musics = [];
let isPlaying = false;
let loopPromise;

// 音楽ファイルをプリロードする関数
function preloadMusic(url) {
    return new Promise((resolve, reject) => {
        const music = new Audio(url);
        music.addEventListener('canplaythrough', () => resolve(music));
        music.addEventListener('error', reject);
    });
}

// 音楽を再生する関数
async function playMusic(index) {
    const music = musics[index];

    return new Promise((resolve) => {
        music.addEventListener('ended', () => {
            resolve();
        });

        // 再生前に再生位置をリセット
        music.currentTime = 0;

        music.play()
            .then(() => {
                console.log("Played:", decodeURI(music.src));
            })
            .catch((error) => {
                console.error("Error playing music:", error);
                resolve();
            });
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
    musics.forEach(music => music.pause());
});

// 新しい音楽を追加し、再生を制御する関数
async function play(url) {
    const music = new Audio(encodeURI(url)); // ファイル名をエンコード
    musics.push(music);

    console.log("Added:", decodeURI(url));

    // 既に再生中でない場合のみ新しい playLoop を開始
    if (!isPlaying) {
        isPlaying = true;
        loopPromise = playLoop();
    } else {
        // 既存の playLoop がある場合はそれが終わるまで待機してから新しい playLoop を開始
        await loopPromise;
        isPlaying = false;
        isPlaying = true;
        loopPromise = playLoop();
    }
}

// ボタンがクリックされたときに play 関数を呼ぶ
document.getElementById('b1').addEventListener('click', () => {
    play('./music/ああああ.wav');
});
document.getElementById('b2').addEventListener('click', () => {
    play('./music/test4秒.wav');
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
