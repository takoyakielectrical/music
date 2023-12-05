const musics = [];
let iiyo = true;
let isPlaying = false;

async function playMusic(index) {
    return new Promise((resolve) => {
        const music = musics[index];

        if (index === 0) {
            music.addEventListener('ended', () => {
                resolve();
            });
        }

        iiyo = true;
        music.play()
            .then(() => {
                iiyo = false;
                console.log(iiyo);
            })
            .catch((error) => {
                console.error("Error playing music:", error);
                resolve(); // Resolve the promise even if there is an error
            });
    });
}

async function playLoop() {
    while (true) {
        if (!isPlaying) {
            isPlaying = true;
            await Promise.all(musics.map((_, index) => playMusic(index)));
            isPlaying = false;
        }
    }
}

// ページがアンロードされる前に再生を停止する
window.addEventListener('beforeunload', () => {
    musics.forEach(music => music.pause());
});

// ボタンのクリックごとに新しい音楽が追加され、新しい playLoop が開始されるのを防ぐ
// 1つの playLoop で全ての音楽が再生されるように修正
async function play(url) {
    const music = new Audio(url);
    musics.push(music);

    console.log(url);

    if (!isPlaying) {
        playLoop();
    }
}
