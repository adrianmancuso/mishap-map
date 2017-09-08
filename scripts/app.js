var $main = $('main');
var $aside = $('aside');

var initMap = function() {
  new GMaps({
    div: '#main',
    mapType: 'roadMap',
    lat: -37.8136,
    lng: 144.9631
  })
}

// var invocation = new XMLHttpRequest();
// var url = "https://victraffic-api.wd.com.au/api/3v/incidents/";

// function callOtherDomain() {
//   if(invocation) {
//     invocation.open('GET', url, true);
//     invocation.onreadystatechange = handler;
//     invocation.send();
//   }
// }

// $.getJSON("https://victraffic-api.wd.com.au/api/3v/incidents.json?callback=?", function(response){
//   console.log(response);
// });

var fetchData = function() {

  var script = document.createElement('script');
  script.src = "https://victraffic-api.wd.com.au/api/3v/incidents";
  document.querySelector('head').appendChild(script);


  var settings = {
    url: "https://victraffic-api.wd.com.au/api/3v/incidents",
    crossDomain: true,
    type: 'GET',
    dataType: 'json',
    contentType: 'json',
    header: "Access-Control-Allow-Origin"
  }

  $.ajax(settings).done(function(returnedData) {
    console.log(returnedData.response);
  });

}

// // $aside.on('click', function(event) {
// //   event.preventDefault();
// //   fetchData();
// // });