function loadData(){$.ajax({dataType:"json",url:dataURL,success:handleData})}function handleData(o){
// HANDLEBARS
// BATH
var t=o.bath,e=$("#hb-bath").html(),a=Handlebars.compile(e),n=a(t);$("#de-container-bath").html(n);
// BATH
var i=o.food;foodFormat=i.format,foodNum=i.number;var r=$("#hb-food").html(),d=Handlebars.compile(r),s=d(i);$("#de-container-food").html(s);
// LIVING ROOM
var b=o.livingroom,l=$("#hb-livingroom").html(),c=Handlebars.compile(l),h=c(b);$("#de-container-livingroom").html(h);
// STANDBY
var u=o.standby,f=$("#hb-standby").html(),m=Handlebars.compile(f),v=m(u);$("#de-container-standby").html(v),
// Inits the different sections
bathInit(),
// Init mobile
initMobile(),
//Window resize
resizeWindow()}
// BATH
function bathInit(){
// Dragger indicator loop
if(bathLeftBox=$("#bath-left-box"),bathRedBox=$(".bath-red-box"),arrowGfx=$(".arrow-gfx"),videoElement=$("#bath-video"),videoX=videoElement.css("left").replace(/[^-\d\.]/g,""),isMobile){new Draggable("#arrow-circle-mobile",{type:"x",edgeResistance:1,bounds:"#bath-draggable-bounds",lockAxis:!0,throwProps:!1,onPress:function(){bathStartDrag(this)},onRelease:function(){bathRelease(this)}});$(".arrow-circle.back").on("click",function(){bathRelease(this)})}else{new Draggable("#bath-left-box",{type:"x,y",edgeResistance:1,bounds:"#bath-draggable-bounds",lockAxis:!0,throwProps:!1,onPress:function(){bathStartDrag(this)},onRelease:function(){bathRelease(this)},onDrag:function(){bathDrag(this)},onDragEnd:function(){bathDragEnd()}})}
// Arrow indicator
$(".bath-dragger").on("mouseover",function(o){$(".arrow-circle").addClass("hover")}),$(".bath-dragger").on("mouseout",function(o){$(".arrow-circle").removeClass("hover")})}function bathStartDrag(o){bathRedBox.removeClass("indicator"),arrowGfx.removeClass("arrow-indicator"),"out"==bathLeftBoxState?$(".bath-bubble").removeClass("show"):$("#bath-you").addClass("hide")}function bathRelease(o){var t=(o.x,o.maxX),e=o.minX;"in"==bathLeftBoxState?redLayerIn(o,e):($("#bath-you").removeClass("hide"),redLayerOut(o,t)),isMobile&&"out"==bathLeftBoxState?setTimeout(function(){$(".arrow-circle.back").addClass("show")},250):isMobile&&"in"==bathLeftBoxState&&$(".arrow-circle.back").removeClass("show")}function redLayerOut(o,t){TweenMax.to(bathLeftBox,.5,{x:t+"px",ease:Sine.easeOut,onUpdate:moveVideo,onUpdateParams:[o]}),arrowGfx.removeClass("rotate"),bathLeftBoxState="in"}function redLayerIn(o,t){TweenMax.to(bathLeftBox,.5,{x:t+"px",ease:Sine.easeOut,onUpdate:moveVideo,onUpdateParams:[o]}),arrowGfx.addClass("rotate"),bathLeftBoxState="out",bathDragEnd()}function bathDrag(o){moveVideo(o)}function bathDragEnd(){"out"==bathLeftBoxState&&$(".bath-bubble").each(function(o){setTimeout(function(){$(".bath-bubble").eq(o).addClass("show")},1e3*Math.random())})}function moveVideo(o){var t=bathLeftBox.position().left,e=Math.abs(parseInt(o.minX)),a=Math.abs(100*t/e),n=Math.abs(a)/100*parseInt(videoX);videoElement.css({left:n})}function initFood(){TweenMax.to(pct,4,{num:"+="+foodNum,delay:.7,onStart:showPctCounter,onUpdate:foodUpdateCounter,ease:Expo.easeOut}),$(".dish-img").addClass("init-dish")}function foodUpdateCounter(){
// var randomNumberTwoDigits = Math.floor(Math.random() * 90 + 10);
$("#de-container-food .pct").html(Math.ceil(pct.num)+foodFormat)}function showPctCounter(){$(".food-bubble").addClass("init-bubble"),initFoodCTA()}function initFoodCTA(){$(".food-cta.desktop").addClass("init-btn")}
//LIVING ROOM
function initLivingRoom(){var o=document.getElementById("livingroom-video");o.play(),setInterval(initLivingroomCTA,1e3)}function initLivingroomCTA(){$("#livingroom-cta").addClass("init-btn")}
// STANDBY
function initStandby(){$(".standby-bubble").each(function(o){setTimeout(function(){$(".standby-bubble").eq(o).addClass("show")},1e3*Math.random())}),setTimeout(initStandbyCTA,1e3)}function initStandbyCTA(){$(".standby-cta").addClass("init-btn")}
// RESIZE
function resizeWindow(){$(window).resize(function(){iframeCommunicator()}),iframeCommunicator()}
// IFRAME
function iframeCommunicator(){var o={food:$("#de-container-food").position().top,livingroom:$("#de-container-livingroom").position().top,standby:$("#de-container-standby").position().top};window.parent.postMessage(o,"*")}
// COMMUNICATING WITH PARENT
function DongEnergyMessage(o){"food"!=o.data||isMobile?"livingroom"==o.data?initLivingRoom():"standby"!=o.data||isMobile||initStandby():initFood()}function initMobile(){isMobile&&(
// Init sections
initMobileFood(),initMobileBath(),initMobileLivingroom())}function initMobileBath(){
// Removes the video from the mark up
$("#bath-video").remove(),
// Removes the forth/back loop that indicates dragging on the red box
$(".bath-red-box").removeClass("indicator")}function initMobileFood(){$(".pct-mobile").html("33% ")}function initMobileLivingroom(){
// Removes the video from the mark up
$("#livingroom-video").remove()}var w,h,isMobile=!1,bathRedBox,bathLeftBox,arrowGfx,videoElement,videoX,bathLeftBoxState="in",rootURL="",dataURL=rootURL+"data.json",foodNum,foodFormat;$(document).ready(function(){w=$(window).outerWidth(),h=$(window).outerHeight(),w<768&&(isMobile=!0),loadData()});
// FOOD
var pct={num:0};window.addEventListener("message",DongEnergyMessage,!1);