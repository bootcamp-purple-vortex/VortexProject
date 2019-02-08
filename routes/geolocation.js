
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function initMap(position){
      // Map options
      var options = {
        zoom:4,
        center:{lat:position.coords.latitude, lng:position.coords.longitude}
      }

      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);

      // Listen for click on map
      google.maps.event.addListener(map, 'click', function(event){
        // Add marker
        addMarker({coords:event.latLng});
      });

      /*
      // Add marker
      var marker = new google.maps.Marker({
        position:{lat:42.4668,lng:-70.9495},
        map:map,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      var infoWindow = new google.maps.InfoWindow({
        content:'<h1>Lynn MA</h1>'
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
      */

      // Array of markers
      var markers = [
        //{
        //   coords:{lat:42.042301,lng:-87.889320},
        //   iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        //   content:'<h1>Lynn MA</h1>'
        // },
        // {
        //   coords:{lat:42.042301,lng:-87.889320},
        //   content:'<h1>Des Plaine IL/h1>'
        // },
        // {
        //   coords:{lat:42.0423201,lng:-87.889320}
        // },
        {
          coords:{lat:position.coords.latitude, lng:position.coords.longitude}
        }
      ];

      // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }

      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          //icon:props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    }
    </script>
    <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOqZ4b64rE6s0wntq-zsV1Kk0qSQWdQqQ&callback=getLocation">
  </script>