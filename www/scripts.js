function loadData(){$.ajax({dataType:"json",url:dataURL,success:handleData})}function handleData(t){
// HANDLEBARS
// BATH
var o=t.bath,e=$("#hb-bath").html(),a=Handlebars.compile(e),n=a(o);$("#de-container-bath").html(n);
// BATH
var i=t.food;foodFormat=i.format,foodNum=i.number;var d=$("#hb-food").html(),r=Handlebars.compile(d),b=r(i);$("#de-container-food").html(b);
// LIVING ROOM
var s=t.livingroom,l=$("#hb-livingroom").html(),h=Handlebars.compile(l),c=h(s);$("#de-container-livingroom").html(c);
// STANDBY
var f=t.standby,u=$("#hb-standby").html(),m=Handlebars.compile(u),v=m(f);$("#de-container-standby").html(v),
// Inits the different sections
bathInit(),initFood(),initLivingRoom(),initStandby(),
// Init mobile
initMobile()}
// BATH
function bathInit(){bathLeftBox=$("#bath-left-box"),bathRedBox=$(".bath-red-box"),arrowGfx=$(".arrow-gfx"),videoElement=$("#bath-video"),videoX=videoElement.css("left").replace(/[^-\d\.]/g,"");
// Dragger indicator loop
new Draggable("#bath-left-box",{type:"x,y",edgeResistance:1,bounds:"#bath-draggable-bounds",lockAxis:!0,throwProps:!1,onPress:function(){bathStartDrag(this)},onRelease:function(){bathRelease(this)},onDrag:function(){bathDrag(this)},onDragEnd:function(){bathDragEnd()}});
// Arrow indicator
$(".bath-dragger").on("mouseover",function(t){$(".arrow-circle").addClass("hover")}),$(".bath-dragger").on("mouseout",function(t){$(".arrow-circle").removeClass("hover")})}function bathStartDrag(t){bathRedBox.removeClass("indicator"),arrowGfx.removeClass("arrow-indicator"),"out"==bathLeftBoxState?$(".bath-bubble").removeClass("show"):$("#bath-you").addClass("hide")}function bathRelease(t){var o=(t.x,t.maxX),e=t.minX;"in"==bathLeftBoxState?redLayerIn(t,e):($("#bath-you").removeClass("hide"),redLayerOut(t,o))}function redLayerOut(t,o){TweenMax.to(bathLeftBox,.5,{x:o+"px",ease:Sine.easeOut,onUpdate:moveVideo,onUpdateParams:[t]}),arrowGfx.removeClass("rotate"),bathLeftBoxState="in"}function redLayerIn(t,o){TweenMax.to(bathLeftBox,.5,{x:o+"px",ease:Sine.easeOut,onUpdate:moveVideo,onUpdateParams:[t]}),arrowGfx.addClass("rotate"),bathLeftBoxState="out",bathDragEnd()}function bathDrag(t){moveVideo(t)}function bathDragEnd(){"out"==bathLeftBoxState&&$(".bath-bubble").each(function(t){setTimeout(function(){$(".bath-bubble").eq(t).addClass("show")},1e3*Math.random())})}function moveVideo(t){var o=bathLeftBox.position().left,e=Math.abs(parseInt(t.minX)),a=Math.abs(100*o/e),n=Math.abs(a)/100*parseInt(videoX);videoElement.css({left:n})}function initFood(){inView.offset(500),inView("#de-container-food").once("enter",function(){TweenMax.to(pct,4,{num:"+="+foodNum,delay:.7,onStart:showPctCounter,onUpdate:foodUpdateCounter,ease:Expo.easeOut}),$(".dish-img").addClass("init-dish")})}function foodUpdateCounter(){
// var randomNumberTwoDigits = Math.floor(Math.random() * 90 + 10);
$("#de-container-food .pct").html(Math.ceil(pct.num)+foodFormat)}function showPctCounter(){$(".food-bubble").addClass("init-bubble"),initFoodCTA()}function initFoodCTA(){$(".food-cta.desktop").addClass("init-btn")}
//LIVING ROOM
function initLivingRoom(){inView.offset(600),inView("#de-container-livingroom").once("enter",function(){var t=document.getElementById("livingroom-video");t.play(),setInterval(initLivingroomCTA,1e3)})}function initLivingroomCTA(){$("#livingroom-cta").addClass("init-btn")}
// STANDBY
function initStandby(){inView.offset(600),inView("#de-container-standby").once("enter",function(){$(".standby-bubble").each(function(t){setTimeout(function(){$(".standby-bubble").eq(t).addClass("show")},1e3*Math.random())}),setTimeout(initStandbyCTA,1e3)})}function initStandbyCTA(){$(".standby-cta").addClass("init-btn")}function initMobile(){var t=$(window).outerWidth();$(window).outerHeight();t<768&&(isMobile=!0,
// Init sections
initMobileFood(),initMobileBath(),initMobileLivingroom())}function initMobileBath(){
// Removes the video from the mark up
$("#bath-video").remove(),
// Removes the forth/back loop that indicates dragging on the red box
$(".bath-red-box").removeClass("indicator")}function initMobileFood(){$(".pct-mobile").html("33% ")}function initMobileLivingroom(){
// Removes the video from the mark up
$("#livingroom-video").remove()}var bathRedBox,bathLeftBox,arrowGfx,videoElement,videoX,bathLeftBoxState="in",dataURL="data.json",foodNum,foodFormat;$(document).ready(function(){loadData()});
// FOOD
var pct={num:0},w,h,isMobile=!1;