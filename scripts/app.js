var $main = $('main');
var $aside = $('aside');
var allIncidents = [];
var vicMap = {};

function initMap() {
  createMap();
  makeCorsRequest();
}

function createMap() {
  vicMap = new GMaps({
    div: '#main',
    mapType: 'roadMap',
    lat: -37.8136,
    lng: 144.9631
  });
}

function dropMarkers() {
  allIncidents.forEach(function(incident) {
    vicMap.addMarker({
      lat: incident.lat,
      lng: incident.long,
      title: incident.description,
      click: function(event) {
        console.log(incident);
      }
    });
  });
}

function populateAside() {
  // var source = $("#hazard_list_template").html();
  // var template = Handlebars.compile(source);
  // var result = {description: incident.description};
  // var html = template(result);
  // console.log(html);
  // $aside.append(html);
}

function createCorsRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest() {
  var url = 'https://cors-anywhere.herokuapp.com/https://victraffic-api.wd.com.au/api/v3/incidents';
  var xhr = createCorsRequest('GET', url);

  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    allIncidents = response.incidents;
    dropMarkers();
  };
  xhr.send();
}