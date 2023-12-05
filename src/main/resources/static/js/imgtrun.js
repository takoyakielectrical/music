// 画像のパスの配列
const imagePaths = [
  '../static/img/リオセスリ.png',
  '../static/img/水龍.png'
];

// 画像を表示する要素の取得
const animationFrame = document.getElementById('animationFrame');

// アニメーションの感覚（ミリ秒単位）
const interval = 100; // 0.1秒

// 現在のフレームのインデックス
let currentFrameIndex = 0;

// アニメーションを開始する関数
function startAnimation() {
  // 画像のパスを設定
  animationFrame.src = imagePaths[currentFrameIndex];

  // 次のフレームへ移動
  currentFrameIndex++;

  // 最後のフレームまで到達した場合、最初のフレームに戻る
  if (currentFrameIndex === imagePaths.length) {
    currentFrameIndex = 0;
  }

  // 次のフレームを表示するまで再帰的に呼び出す
  setTimeout(startAnimation, interval);
}

// アニメーションを開始
startAnimation();