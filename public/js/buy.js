const $buysubmit = $("#buysubmit");
// eslint-disable-next-line no-unused-vars

updateBuy = toys => {
  $.ajax({
    method: "PUT",
    url: "/api/toys",
    data: toys
  }).then(() => {
    $("#buyModal").modal("show");
  });
};

const buySubmit = () => {
  const toyID = $buysubmit.attr("data");
  const newBuyStatus = {
    id: toyID,
    buystatus: true
  };

  console.log(`ToyID to update: ${toyID}`);
  event.preventDefault();

  updateBuy(newBuyStatus);
};

$buysubmit.on("click", buySubmit);


// ===========================saller location start===============

// Get location form
// eslint-disable-next-line no-unused-vars
const $locationname = $("#locationname");
// console.log($locationname);
// console.log($locationname[0].lastChild.data);

var formattedAddress;
// eslint-disable-next-line no-unused-vars
var sallerlatitude;
// eslint-disable-next-line no-unused-vars
var sallerlongitude;
// eslint-disable-next-line no-unused-vars
var sallerlocality;

geocode();
function geocode() {
  var location = $locationname[0].lastChild.data;
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyBOqZ4b64rE6s0wntq-zsV1Kk0qSQWdQqQ"
      }
    })
    .then(function (response) {
      // Log full response
      console.log(response);

      // Formatted Address
      formattedAddress = response.data.results[0].formatted_address;
      console.log(formattedAddress);
      var formattedAddressOutput = `
          <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
          </ul>
        `;

      // Address Components
      var addressComponents = response.data.results[0].address_components;
      console.log(addressComponents);
      sallerlocality = addressComponents[0].long_name;
      var addressComponentsOutput = "<ul class=\"list-group\">";
      for (var i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `
            <li class="list-group-item"><strong>${
          addressComponents[i].types[0]
          }</strong>: ${addressComponents[i].long_name}</li>
          `;
      }
      addressComponentsOutput += "</ul>";

      // Geometry      
      sallerlatitude = response.data.results[0].geometry.location.lat;      
      sallerlongitude = response.data.results[0].geometry.location.lng;
      
      
    })
    .catch(function (error) {
      console.log(error);
    });
}
// =========================saller location end============

// =========== ==========geo location start ===========
var myLatLng;

function geoSuccess(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  myLatLng = {
    lat: latitude,
    lng: longitude
  };
  var mapProp = {
    center: new google.maps.LatLng(latitude, longitude), // puts your current location at the centre of the map,
    zoom: 8,
    mapTypeId: "roadmap"
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  //call renderer to display directions
  directionsDisplay.setMap(map);

  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: "roadmap"
  };

  // Multiple Markers
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "My location"
  });
  var markers = [
    [sallerlocality, sallerlatitude, sallerlongitude],
    // ['McDonalds', 53.200482, -6.111337],
    ["your location", latitude, longitude]
  ];

  // Info Window Content
  var infoWindowContent = [
    [
      "<div id='start'>" +
      "<h3>Saller Location</h3>" +
      `<p>${formattedAddress}</p>` +
      " <button onclick=\"calculateAndDisplayRoute(marker, i)\"> Get Directions</button>" +
      "</div>"
    ],
    [
      "<div>" +
      "<p>your current location.</p>" +
      " <button onclick=\"calculateAndDisplayRoute(marker, i)\"> Get Directions</button>" +
      "</div>"
    ]
    // ['<div class="info_content">' +
    //     '<h3>McDonalds</h3>' +
    //     '<p>Excellent food establishment, NOT!.</p>' + '<button onclick="calculateAndDisplayRoute(marker, i)"> Get Directions</button>' +
    //     '</div>'
    // ]
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(),
    marker,
    i;

  // Loop through our array of markers & place each one on the map
  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });

    // Allow each marker to have an info window
    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        };
      })(marker, i)
    );

    marker.addListener("click", function () {
      directionsService.route(
        {
          origin: document.getElementById("start").value,
          origin: myLatLng,
          destination: marker.getPosition(),
          travelMode: "DRIVING"
        },
        function (response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    });
    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }
}

// eslint-disable-next-line no-unused-vars
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route(
    {
      // origin: document.getElementById('start').value,
      origin: myLatLng,
      destination: marker.getPosition(),
      travelMode: "DRIVING"
    },
    function (response, status) {
      if (status === "OK") {
        console.log("all good");
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function geoError() {
  alert("Geocoder failed.");
}

// eslint-disable-next-line no-unused-vars
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    // alert("Geolocation is supported by this browser.");
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//=========================== geo location end===========
