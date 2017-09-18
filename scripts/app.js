var allIncidents = [];
var vicMap = {};
var onScreenMarkers = [];
var template = "";

function initMap() {
  createMap();
  makeCorsRequest();
  startHandlebars();
}

function createMap() {
  vicMap = new GMaps({
    div: '#main',
    mapType: 'roadMap',
    zoom: 15,
    lat: -37.8136,
    lng: 144.9631,
    bounds_changed: function(event) {
      findOnscreenMarkers();
      $(".card-panel").remove();
      updateNumber();
      onScreenMarkers.forEach(function(marker) {
        populateAside(marker);
      });
    },
    dragend: function(event) {
      findOnscreenMarkers();
      $(".card-panel").remove();
      updateNumber();
      onScreenMarkers.forEach(function(marker) {
        populateAside(marker);
      });
    }
  });
}

function updateNumber() {
  var numberOfIncidents = onScreenMarkers.length.toString();
  $("#incident_number").text(numberOfIncidents);
}

function dropMarkers() {
  allIncidents.forEach(function(incident) {
    if (incident.lat !== null && incident.long !== null) {
      vicMap.addMarker({
        lat: incident.lat,
        lng: incident.long,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/micons/caution.png",
          Size: new google.maps.Size(80, 80)
        },
        title: incident.incident_type,
        details: {
          alert: "Alert: " + incident.alert_type,
          title: incident.title
        },
        click: function(event) {
          $('#modal_alert').text(incident.alert_type);
          $('#modal_title').text(incident.title);
          $('#modal_description').text(incident.description);
          $('#modal1').modal();
          $('#modal1').modal('open');
        }
      });
    }
  });
}

function findOnscreenMarkers() {
  markers = vicMap.markers;
  onScreenMarkers = markers.filter(checkInBounds);
}

function checkInBounds(marker) {
  if (vicMap.getBounds().contains(marker.getPosition())) {
    return marker;
  }
}

function startHandlebars(){
  var source = $("#hazard_list_template").html();
  template = Handlebars.compile(source);
}

function populateAside(incident) {
  var result = {title: incident.details.title, alert: incident.details.alert};
  var html = template(result);
  $(".aside").append(html);
}

function buildUI() {
    dropMarkers();
    findOnscreenMarkers();
    onScreenMarkers.forEach(function(marker) {
        populateAside(marker);
    });
    updateNumber();
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
    buildUI();
  };
  xhr.send();
}

function showList() {
  onScreenMarkers.forEach(function(marker){
    Materialize.toast(marker.details.alert + " : " + marker.details.title, 3000, 'rounded');
  });
}

$(".btn-large").click(showList);