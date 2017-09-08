var $main = $('main');
var $aside = $('aside');

function initMap() {
  new GMaps({
    div: '#main',
    mapType: 'roadMap',
    lat: -37.8136,
    lng: 144.9631
  });
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
 
  var url = 'https://victraffic-api.wd.com.au/api/v3/incidents';
  var xhr = createCorsRequest('GET', url);

  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    var allIncidents = response.incidents;

    allIncidents.forEach(function(incident) {
      console.log(incident);
    });
  };

  xhr.send();
}