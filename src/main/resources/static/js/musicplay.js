
/**
 * 
 */

const urls = [];
const musics = [];
function play(url) {
	urls.push(url);
	for (const url of urls) {
		const music = new Audio(url);
		musics.push(music);
	}
	console.log(urls)


	function playMusic() {
		return new Promise((resolve) => {
			for (const music of musics) {
				music.addEventListener('ended', resolve); // 再生が終わったらresolve
				music.play();
				
			}
		});
	}

	async function playLoop() {
		while (true) {
			await playMusic();
		}
	}

	playLoop();
}


