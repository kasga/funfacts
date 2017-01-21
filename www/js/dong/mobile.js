function initMobile() {

	if (isMobile) {
		// Init sections
		initMobileFood();
		initMobileBath();
		initMobileLivingroom();
	}
}


function initMobileBath() {
	// Removes the video from the mark up
	$('#bath-video').remove();

	// Removes the forth/back loop that indicates dragging on the red box
	$('.bath-red-box').removeClass('indicator');
}



function initMobileFood() {
	$('.pct-mobile').html('33% ');
}


function initMobileLivingroom() {
	// Removes the video from the mark up
	$('#livingroom-video').remove();
}