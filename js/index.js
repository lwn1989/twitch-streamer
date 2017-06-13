$(window).scroll(function () { 
      //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 190) {
      $('.sidenav').addClass('sidenav-fixed');
    }
    if ($(window).scrollTop() <= 190) {
      $('.sidenav').removeClass('sidenav-fixed');
    }
});
$(".navbar a").on("click", function(){
  $(".navbar-collapse").collapse('hide');
})
var idList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","brunofin", "comster404"];
idList.sort();
idList.forEach(getInfo);
var streamDB = {};
var streamTmpDB = {};
function getInfo(item, index){
  $.getJSON("https://wind-bow.glitch.me/twitch-api/users/"+item, function(json){
    //console.log(json);
    streamDB[item]={};
    if (json.hasOwnProperty("error")) {
      streamDB[item].error = true;
      streamDB[item].logo = "https://image.ibb.co/dH98mQ/exclamation_mark.png"
      streamDB[item].disName = item;
      return 0;
    }
    streamDB[item].logo = json.logo;
    streamDB[item].disName = json.display_name;
    streamDB[item].url = "https://www.twitch.tv/"+item;
    $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/"+item, function(json1){
      console.log(json1);
      if (json1.stream) {
        streamDB[item].url = json1.stream.channel.url;
        streamDB[item].game = json1.stream.channel.game;
        if (json1.stream.channel.status.length > 80) {
          streamDB[item].status = json1.stream.channel.status.substring(0, 78)+"...";
        } else {
          streamDB[item].status = json1.stream.channel.status;
        }
      } else {
        streamDB[item].status = false;
      };
    });
  });
};
$(document).ready(function(){
  $(".showlist").html("Loading...");
  setTimeout(function(){
    $("#all2").trigger("click");
  }, 1000);
});
$("#all1, #all2").on("click", function(){
  $(".showlist").html("");
  idList.forEach(showAll);
  $(".btn-plus").addClass("disabled");
})
$("#online1, #online2").on("click", function(){
  $(".showlist").html("");
  idList.forEach(showOnline);
  $(".btn-plus").addClass("disabled");
})
$("#offline1, #offline2").on("click", function(){
  $(".showlist").html("");
  idList.forEach(showOffline);
  $(".btn-plus").addClass("disabled");
})
$("#error1, #error2").on("click", function(){
  $(".showlist").html("");
  idList.forEach(showError);
  $(".btn-plus").addClass("disabled");
})
function showAll(item, index){
  if (streamDB[item].hasOwnProperty("error")) {
    $(".showlist").append("<li class='errSty'><img class='p1' src='"+streamDB[item].logo+"'><span class='p2'>"+streamDB[item].disName+"</span>"+"<span class='p3'>Channel error, please check the channel name!</span><span id='btn-"+index+"' class='p4'><button class='btn-plus fa fa-plus'></button><button class='btn-minus fa fa-minus'></button></span></li>");
    return 0;
  };
  if (!streamDB[item].status) {
    $(".showlist").append("<li class='offSty'><img class='p1' src='"+streamDB[item].logo+"'><a href='"+streamDB[item].url+"' target='_blank'><span class='p2'>"+streamDB[item].disName+"</span></a>"+"<span class='p3'>Offline!</span><span id='btn-"+index+"' class='p4'><button class='btn-plus fa fa-plus'></button><button class='btn-minus fa fa-minus'></button></span></li>");
  } else { 
    $(".showlist").append("<li class='onSty'><img class='p1' src='"+streamDB[item].logo+"'><a href='"+streamDB[item].url+"' target='_blank'><span class='p2'>"+streamDB[item].disName+"</span></a>"+"<span class='p3'>"+streamDB[item].game+":"+streamDB[item].status+"</span><span id='btn-"+index+"' class='p4'><button class='btn-plus fa fa-plus'></button><button class='btn-minus fa fa-minus'></button></span></li>");
  };
};
function showOnline(item, index){
  if (streamDB[item].hasOwnProperty("error")) {
    return 0;
  };
  if (!streamDB[item].status) {
    return 0;
  } else { 
    $(".showlist").append("<li class='onSty'><img class='p1' src='"+streamDB[item].logo+"'><a href='"+streamDB[item].url+"' target='_blank'><span class='p2'>"+streamDB[item].disName+"</span></a>"+"<span class='p3'>"+streamDB[item].game+":"+streamDB[item].status+"</span><span id='btn-"+index+"' class='p4'><button class='btn-plus fa fa-plus'></button><button class='btn-minus fa fa-minus'></button></span></li>");
  };
};
function showOffline(item, index){
  if (streamDB[item].hasOwnProperty("error")) {
    return 0;
  };
  if (!streamDB[item].status) {
    $(".showlist").append("<li class='offSty'><img class='p1' src='"+streamDB[item].logo+"'><a href='"+streamDB[item].url+"' target='_blank'><span class='p2'>"+streamDB[item].disName+"</span></a>"+"<span class='p3'>Offline!</span><span id='btn-"+index+"' class='p4'><button class='btn-plus fa fa-plus'></button><button class='btn-minus fa fa-minus'></button></span></li>");
  } else { 
    return 0;
  };
};
function showError(item, index){
  if (streamDB[item].hasOwnProperty("error")) {
    $(".showlist").append("<li class='errSty'><img class='p1' src='"+streamDB[item].logo+"'><span class='p2'>"+streamDB[item].disName+"</span>"+"<span class='p3'>Channel error, please check the channel name!</span><span id='btn-"+index+"' class='p4'><button class='btn-plus fa fa-plus'></button><button class='btn-minus fa fa-minus'></button></span></li>");
  } else {
    return 0;
  }
};
$(document).on("click",".btn-minus",function(){
  console.log($(this).closest("span")[0].id);
  alert("Function to be added!");
})
$(".btn-search").on("click", function(){
  var searchContent = $("#searchContent").val();
  
});