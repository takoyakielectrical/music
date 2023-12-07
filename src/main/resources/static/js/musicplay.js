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
            // 音楽が終了したら musics から削除
            const indexToRemove = musics.findIndex((m) => m.src === music.src);
            if (indexToRemove !== -1) {
                musics.splice(indexToRemove, 1);
            }

            // 再生が終了したら停止
            stopMusic(music);

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

// 音楽を停止する関数
function stopMusic(music) {
    if (music) {
        music.pause();
        music.currentTime = 0;
    }
}

// 新しい音楽を追加し、再生を制御する関数
async function play(url) {
    const existingIndex = musics.findIndex((music) => music.src === url);

    if (existingIndex !== -1) {
        // 既に存在する音楽を停止
        const existingMusic = musics[existingIndex];
        stopMusic(existingMusic);

        // 既に存在する音楽を削除
        musics.splice(existingIndex, 1);
    } else {
        // 新しい音楽を追加
        const music = new Audio(url);
        musics.push(music);
    }

    // 既に再生中の音楽がある場合は終了まで待機
    if (isPlaying) {
        await loopPromise;
    }

    // 新しい playLoop を開始
    isPlaying = true;
    loopPromise = playLoop();

    console.log("Added/Stopped:", url);
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
