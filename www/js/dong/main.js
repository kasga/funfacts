var bathRedBox;
var bathLeftBox;
var arrowGfx;
var videoElement;
var videoX;
var bathLeftBoxState = "in";
var dataURL = "data.json";

// Food
var foodNum;
var foodFormat;



$(document).ready(function() {
	loadData();
});


function loadData() {
	$.ajax({
		dataType: "json",
		url: dataURL,
		success: handleData
	});
}


function handleData(data) {

	// HANDLEBARS

	// BATH
	var bathData = data.bath;
	var bathTemplateMarkup = $("#hb-bath").html();
	var bathTemplate = Handlebars.compile(bathTemplateMarkup);
	var bathCompiledHtml = bathTemplate(bathData);
	$('#de-container-bath').html(bathCompiledHtml);

	// BATH
	var foodData = data.food;
	foodFormat = foodData.format;
	foodNum = foodData.number;
	var foodTemplateMarkup = $("#hb-food").html();
	var foodTemplate = Handlebars.compile(foodTemplateMarkup);
	var foodCompiledHtml = foodTemplate(foodData);
	$('#de-container-food').html(foodCompiledHtml);

	// LIVING ROOM
	var livingroomData = data.livingroom;
	var livingroomTemplateMarkup = $("#hb-livingroom").html();
	var livingroomTemplate = Handlebars.compile(livingroomTemplateMarkup);
	var livingroomCompiledHtml = livingroomTemplate(livingroomData);
	$('#de-container-livingroom').html(livingroomCompiledHtml);

	// STANDBY
	var standbyData = data.standby;
	var standbyTemplateMarkup = $("#hb-standby").html();
	var standbyTemplate = Handlebars.compile(standbyTemplateMarkup);
	var standbyCompiledHtml = standbyTemplate(standbyData);
	$('#de-container-standby').html(standbyCompiledHtml);


	// Inits the different sections
	bathInit();
	initFood();
	initLivingRoom();
	initStandby();

	// Init mobile
	initMobile();
}



// BATH
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
		},
		onDragEnd: function() {
			bathDragEnd();
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

	if (bathLeftBoxState == "out") {
		$('.bath-bubble').removeClass('show');
	} else {
		$('#bath-you').addClass('hide');
	}
}

function bathRelease(el) {

	var x = el.x;
	var maxX = el.maxX;
	var minX = el.minX;

	if (bathLeftBoxState == "in") {
		redLayerIn(el, minX);
	} else {
		$('#bath-you').removeClass('hide');
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

	bathDragEnd();
}


function bathDrag(el) {
	moveVideo(el);
}


function bathDragEnd() {
	if (bathLeftBoxState == 'out') {
		$('.bath-bubble').each(function(index) {
			setTimeout(function() {
				$('.bath-bubble').eq(index).addClass('show');
			}, Math.random() * 1000);
		})
	}
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



// FOOD
var pct = {
	num: 0
};

function initFood() {
	inView.offset(500);
	inView('#de-container-food').once('enter', function() {
		TweenMax.to(pct, 4, {
			num: "+=" + foodNum,
			delay: .7,
			onStart: showPctCounter,
			onUpdate: foodUpdateCounter,
			ease: Expo.easeOut,

		});

		$('.dish-img').addClass('init-dish')
	});
}

function foodUpdateCounter() {
	// var randomNumberTwoDigits = Math.floor(Math.random() * 90 + 10);
	$('#de-container-food .pct').html(Math.ceil(pct.num) + foodFormat);
}

function showPctCounter() {
	$('.food-bubble').addClass('init-bubble');
	initFoodCTA();
}

function initFoodCTA() {
	$('.food-cta.desktop').addClass('init-btn');
}



//LIVING ROOM
function initLivingRoom() {
	inView.offset(600);
	inView('#de-container-livingroom').once('enter', function() {

		var video = document.getElementById('livingroom-video');
		video.play()
		setInterval(initLivingroomCTA, 1000);

	});
}


function initLivingroomCTA() {
	$('#livingroom-cta').addClass('init-btn');
}



// STANDBY
function initStandby() {
	inView.offset(600);
	inView('#de-container-standby').once('enter', function() {
		$('.standby-bubble').each(function(index) {
			setTimeout(function() {
				$('.standby-bubble').eq(index).addClass('show');
			}, Math.random() * 1000);
		})

		setTimeout(initStandbyCTA, 1000);
	});
}

function initStandbyCTA() {
	$('.standby-cta').addClass('init-btn');
}