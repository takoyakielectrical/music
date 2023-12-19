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

	if (slideshowPaused) {
		slideshowPaused = false;
		showSlides();
	} else {
		slideshowPaused = true;
		clearTimeout(slideInterval);
	}
}