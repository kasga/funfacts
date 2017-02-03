var iframeY;
var ifr;
var food = 0;
var livingroom = 0;
var standby = 0;
var iframe;

var foodInit = false;
var livingroomInit = false;
var standbyInit = false;

$(document).ready(function(){

	iframe = $('#funfacts-iframe');
	ifr = document.getElementById('funfacts-iframe').contentWindow;
})



function initScroll() {
    $(window).scroll(function() {
        var scrollPosY = $(document).scrollTop();
        handleScroll(scrollPosY);
    })
}


function handleScroll(scrollPosY) {
	var exactYpos = scrollPosY - iframeY;

	if(!foodInit && exactYpos > food){
		ifr.postMessage('food', '*');
		foodInit = true;
	}
	if(!livingroomInit && exactYpos > livingroom){
		ifr.postMessage('livingroom', '*');
		livingroomInit = true;
	}
    if(!standbyInit && exactYpos > standby){
    	ifr.postMessage('standby', '*');
		standbyInit = true;
	}
    
}


function initResize() {
    $(window).resize(function() {
        iframeY = iframe.position().top;
    });

    iframeY = iframe.position().top;
}



function funfactMessage(event) {
    food = event.data.food - 300;
    livingroom = event.data.livingroom - 300;
    standby = event.data.standby - 300;

     initScroll();
     initResize();
}


window.addEventListener("message", funfactMessage, false);
