var bathRedBox;
var bathLeftBox;
var arrowGfx;
var videoElement;
var videoX;
var bathLeftBoxState = "in";



$(document).ready(function() {
	bathInit();
});


function bathInit() {

	bathLeftBox = $('#bath-left-box');
	bathRedBox = $('.bath-red-box');
	arrowGfx = $('.arrow-gfx');
	videoElement = $('#bath-video');
	videoX = videoElement.css('left').replace(/[^-\d\.]/g, '');

	// Dragger indicator loop
	var bathDragger = new Draggable("#bath-left-box", {
		type: "x,y",
		edgeResistance: 1,
		bounds: "#bath-draggable-bounds",
		lockAxis: true,
		throwProps: false,
		onPress: function() {
			bathStartDrag(this);
		},
		onRelease: function() {
			bathRelease(this);
		},
		onDrag: function() {
			bathDrag(this);
		}
	});

	// Arrow indicator
	$('.bath-dragger').on('mouseover', function(event) {
		$('.arrow-circle').addClass('hover');
	});
	$('.bath-dragger').on('mouseout', function(event) {
		$('.arrow-circle').removeClass('hover');
	});
}


function bathStartDrag(el) {
	bathRedBox.removeClass('indicator');
	arrowGfx.removeClass('arrow-indicator');
}

function bathRelease(el) {

	var x = el.x;
	var maxX = el.maxX;
	var minX = el.minX;

	if (bathLeftBoxState == "in") {
		redLayerIn(el, minX);
	} else {
		redLayerOut(el, maxX);
	}
}


function redLayerOut(el, x) {
	TweenMax.to(bathLeftBox, .5, {
		x: x + 'px',
		ease: Sine.easeOut,
		onUpdate: moveVideo,
		onUpdateParams: [el]
	});

	arrowGfx.removeClass('rotate');
	bathLeftBoxState = "in";
}

function redLayerIn(el, x) {
	TweenMax.to(bathLeftBox, .5, {
		x: x + 'px',
		ease: Sine.easeOut,
		onUpdate: moveVideo,
		onUpdateParams: [el]
	});

	arrowGfx.addClass('rotate');
	bathLeftBoxState = "out";
}


function bathDrag(el) {
	moveVideo(el);
}


function moveVideo(el) {
	var currentVidX = bathLeftBox.position().left;
	var minX = Math.abs(parseInt(el.minX));
	var pct = Math.abs((currentVidX * 100) / minX);
	var x = (Math.abs(pct) / 100) * parseInt(videoX);

	videoElement.css({
		'left': x
	});
}