 // Audio要素を作成
  var audio1 = new Audio('./music/test.wav');
   // Audio要素を作成
  var audio2= new Audio('./music/test2.wav');
   // Audio要素を作成
  var audio3 = new Audio('./music/test3.wav');
   // Audio要素を作成
  var audio4 = new Audio('./music/test4.wav');
   // Audio要素を作成
  var audio5 = new Audio('./music/test4秒.wav');
  
  // ボタンの要素を取得
  var playPauseButton1 = document.getElementById('b1');
   // ボタンの要素を取得
  var playPauseButton2 = document.getElementById('b2');
   // ボタンの要素を取得
  var playPauseButton3 = document.getElementById('b3');
   // ボタンの要素を取得
  var playPauseButton4 = document.getElementById('b4');
   // ボタンの要素を取得
  var playPauseButton5 = document.getElementById('b5');
  
  
  // 再生/停止の状態を判定する変数
  var isPlaying1 = false;
    // 再生/停止の状態を判定する変数
  var isPlaying2 = false;
    // 再生/停止の状態を判定する変数
  var isPlaying3 = false;
    // 再生/停止の状態を判定する変数
  var isPlaying4 = false;
    // 再生/停止の状態を判定する変数
  var isPlaying5 = false;
  
  // ボタンがクリックされたときの処理
  playPauseButton1.addEventListener('click', function() {
    if (isPlaying1) {
      // 再生中なら停止する
      audio1.pause();
      audio1.currentTime = 0; // 再生位置を初期化
    } else {
      // 停止中なら再生する
      // ループを設定
		audio1.loop = true;
      audio1.play();
    }
    
    // 状態を切り替える
    isPlaying1 = !isPlaying1;
  });
  
  // ボタンがクリックされたときの処理
  playPauseButton2.addEventListener('click', function() {
    if (isPlaying2) {
      // 再生中なら停止する
      audio2.pause();
      audio2.currentTime = 0; // 再生位置を初期化
    } else {
      // 停止中なら再生する
      // ループを設定
		audio2.loop = true;
      audio2.play();
    }
    
    // 状態を切り替える
    isPlaying2 = !isPlaying2;
  });
  
  // ボタンがクリックされたときの処理
  playPauseButton3.addEventListener('click', function() {
    if (isPlaying3) {
      // 再生中なら停止する
      audio3.pause();
      audio3.currentTime = 0; // 再生位置を初期化
    } else {
      // 停止中なら再生する
      // ループを設定
		audio3.loop = true;
      audio3.play();
    }
    
    // 状態を切り替える
    isPlaying3 = !isPlaying3;
  });
  
  // ボタンがクリックされたときの処理
  playPauseButton4.addEventListener('click', function() {
    if (isPlaying4) {
      // 再生中なら停止する
      audio4.pause();
      audio4.currentTime = 0; // 再生位置を初期化
    } else {
      // 停止中なら再生する
      // ループを設定
		audio4.loop = true;
      audio4.play();
    }
    
    // 状態を切り替える
    isPlaying4 = !isPlaying4;
  });
  
   // ボタンがクリックされたときの処理
  playPauseButton5.addEventListener('click', function() {
    if (isPlaying5) {
      // 再生中なら停止する
      audio5.pause();
      audio5.currentTime = 0; // 再生位置を初期化
    } else {
      // 停止中なら再生する
      // ループを設定
		audio5.loop = true;
      audio5.play();
    }
    
    // 状態を切り替える
    isPlaying5 = !isPlaying5;
  });