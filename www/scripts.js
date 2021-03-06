function loadData(){$.ajax({dataType:"json",url:dataURL,success:handleData})}function handleData(t){
// HANDLEBARS
// BATH
var o=t.bath,e=$("#hb-bath").html(),a=Handlebars.compile(e),n=a(o);$("#de-container-bath").html(n);
// BATH
var i=t.food;foodFormat=i.format,foodNum=i.number;var d=$("#hb-food").html(),r=Handlebars.compile(d),s=r(i);$("#de-container-food").html(s);
// LIVING ROOM
var b=t.livingroom,l=$("#hb-livingroom").html(),c=Handlebars.compile(l),h=c(b);$("#de-container-livingroom").html(h);
// STANDBY
var m=t.standby,u=$("#hb-standby").html(),f=Handlebars.compile(u),g=f(m);$("#de-container-standby").html(g),
// Inits the different sections
bathInit(),
// Init mobile
initMobile(),
//Window resize
resizeWindow();new Waypoint({element:document.getElementById("de-container-food"),handler:function(t){initFood()},offset:300}),new Waypoint({element:document.getElementById("de-container-standby"),handler:function(t){initStandby()},offset:300}),new Waypoint({element:document.getElementById("de-container-livingroom"),handler:function(t){initLivingRoom()},offset:300})}
// BATH
function bathInit(){
// Dragger indicator loop
if(bathLeftBox=$("#bath-left-box"),bathRedBox=$(".bath-red-box"),arrowGfx=$(".arrow-gfx"),videoElement=$("#bath-video"),videoX=videoElement.css("left").replace(/[^-\d\.]/g,""),isMobile){new Draggable("#arrow-circle-mobile",{type:"x",edgeResistance:1,bounds:"#bath-draggable-bounds",lockAxis:!0,throwProps:!1,onPress:function(){bathStartDrag(this)},onRelease:function(){bathRelease(this)}});$(".arrow-circle.back").on("click",function(){bathRelease(this)})}else{new Draggable("#bath-left-box",{type:"x,y",edgeResistance:1,bounds:"#bath-draggable-bounds",lockAxis:!0,throwProps:!1,onPress:function(){bathStartDrag(this)},onRelease:function(){bathRelease(this)},onDrag:function(){bathDrag(this)},onDragEnd:function(){bathDragEnd()}})}
// Arrow indicator
$(".bath-dragger").on("mouseover",function(t){$(".arrow-circle").addClass("hover")}),$(".bath-dragger").on("mouseout",function(t){$(".arrow-circle").removeClass("hover")})}function bathStartDrag(t){bathRedBox.removeClass("indicator"),arrowGfx.removeClass("arrow-indicator"),"out"==bathLeftBoxState?$(".bath-bubble").removeClass("show"):$("#bath-you").addClass("hide")}function bathRelease(t){var o=(t.x,t.maxX),e=t.minX;"in"==bathLeftBoxState?redLayerIn(t,e):($("#bath-you").removeClass("hide"),redLayerOut(t,o)),isMobile&&"out"==bathLeftBoxState?setTimeout(function(){$(".arrow-circle.back").addClass("show")},250):isMobile&&"in"==bathLeftBoxState&&$(".arrow-circle.back").removeClass("show")}function redLayerOut(t,o){TweenMax.to(bathLeftBox,.5,{x:o+"px",ease:Sine.easeOut,onUpdate:moveVideo,onUpdateParams:[t]}),arrowGfx.removeClass("rotate"),bathLeftBoxState="in"}function redLayerIn(t,o){TweenMax.to(bathLeftBox,.5,{x:o+"px",ease:Sine.easeOut,onUpdate:moveVideo,onUpdateParams:[t]}),arrowGfx.addClass("rotate"),bathLeftBoxState="out",bathDragEnd()}function bathDrag(t){moveVideo(t)}function bathDragEnd(){"out"==bathLeftBoxState&&$(".bath-bubble").each(function(t){setTimeout(function(){$(".bath-bubble").eq(t).addClass("show")},1e3*Math.random())})}function moveVideo(t){var o=bathLeftBox.position().left,e=Math.abs(parseInt(t.minX)),a=Math.abs(100*o/e),n=Math.abs(a)/100*parseInt(videoX);videoElement.css({left:n})}function initFood(){TweenMax.to(pct,4,{num:"+="+foodNum,delay:.7,onStart:showPctCounter,onUpdate:foodUpdateCounter,ease:Expo.easeOut}),$(".dish-img").addClass("init-dish")}function foodUpdateCounter(){
// var randomNumberTwoDigits = Math.floor(Math.random() * 90 + 10);
$("#de-container-food .pct").html(Math.ceil(pct.num)+foodFormat)}function showPctCounter(){$(".food-bubble").addClass("init-bubble"),initFoodCTA()}function initFoodCTA(){$(".food-cta.desktop").addClass("init-btn")}
//LIVING ROOM
function initLivingRoom(){var t=document.getElementById("livingroom-video");t.play(),setInterval(initLivingroomCTA,1e3)}function initLivingroomCTA(){$("#livingroom-cta").addClass("init-btn")}
// STANDBY
function initStandby(){$(".standby-bubble").each(function(t){setTimeout(function(){$(".standby-bubble").eq(t).addClass("show")},1e3*Math.random())}),setTimeout(initStandbyCTA,1e3)}function initStandbyCTA(){$(".standby-cta").addClass("init-btn")}
// RESIZE
function resizeWindow(){$(window).resize(function(){iframeCommunicator()}),iframeCommunicator()}
// IFRAME
function iframeCommunicator(){var t={food:$("#de-container-food").position().top,livingroom:$("#de-container-livingroom").position().top,standby:$("#de-container-standby").position().top};window.parent.postMessage(t,"*")}
// COMMUNICATING WITH PARENT
function DongEnergyMessage(t){"food"!=t.data||isMobile?"livingroom"==t.data?initLivingRoom():"standby"!=t.data||isMobile||initStandby():initFood()}function initMobile(){isMobile&&(
// Init sections
initMobileFood(),initMobileBath(),initMobileLivingroom())}function initMobileBath(){
// Removes the video from the mark up
$("#bath-video").remove(),
// Removes the forth/back loop that indicates dragging on the red box
$(".bath-red-box").removeClass("indicator")}function initMobileFood(){$(".pct-mobile").html("33% ")}function initMobileLivingroom(){
// Removes the video from the mark up
$("#livingroom-video").remove()}var w,h,isMobile=!1,bathRedBox,bathLeftBox,arrowGfx,videoElement,videoX,bathLeftBoxState="in",rootURL="http://de-test-cm.westeurope.cloudapp.azure.com/-/media/Dong%20Energy/Assets/DCS/Projects/Fun%20Facts/data",dataURL=rootURL,foodNum,foodFormat;$(document).ready(function(){w=$(window).outerWidth(),h=$(window).outerHeight(),w<768&&(isMobile=!0),loadData()});
// FOOD
var pct={num:0};window.addEventListener("message",DongEnergyMessage,!1);