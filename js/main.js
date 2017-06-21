var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(-33.91722, 151.23064),
    mapTypeId: 'roadmap'
  });

  var iconBase = "http://maps.google.com/mapfiles/kml/shapes";//creo un icono que servirá como marcador del mapa en lugar del habitual
  var icon = {
    bike: {
      icon: iconBase + 'cycling.png'
    }
  };

  var feature = {
      //position: new google.maps.LatLng(-33.91722, 151.23064),
      type: "bike"
    }

// Create marker (BIKE).
  /*var marker = new google.maps.Marker({
    position: {lat:latitud, lng:longitud},
    icon: icon[feature.type].icon,
    map: map
  });*/

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(found, notFound);
    }
  }

  document.getElementById("findme").addEventListener("click", buscar);
  var latitud, longitud;

  var found = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map, 
      icon: 'http://icons.iconarchive.com/icons/aha-soft/transport/48/bike-icon.png'//animador/marcador del mapa
    });

    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }

  var notFound = function(error){
    alert("No pudimos encontrar tu ubicación");
  }

  var desde = (document.getElementById("origen"));
  var autocompletar = new google.maps.places.Autocomplete(desde);
  autocompletar.bindTo("bounds", map);
  var hacia = (document.getElementById("destino"));
  var autocompletar = new google.maps.places.Autocomplete(hacia);
  autocompletar.bindTo("bounds", map);
  // ejemplo extraido desde internet
        //DirectionsService y DirectionsDisplay se desprenden de google, son objetos de google
        var ds = new google.maps.DirectionsService();//obtiene las coordenadas
        var dr = new google.maps.DirectionsRenderer();//traduce esas coordenadas a la ruta visible (ruta en azul en el mapa)
        document.getElementById("origen").addEventListener("change", onChangeHandler);
        document.getElementById("destino").addEventListener("change", onChangeHandler);
        
        function rutaVisible (ds, dr) {
          ds.route({
            origin: document.getElementById("origen").value,
            destination: document.getElementById("destino").value,
            travelMode: "DRIVING"
          },

          function(response, status) {
            if (status === "OK") {
              dr.setDirections(response);
            } else {
              window.alert("Ruta "+ status);
            }
          });
        }
        
        dr.setMap(map);
        //onChangeHandler = Agrega una propiedad de seguimiento a una definición de lenguaje específico de dominio
        var onChangeHandler = function(){
            //Servicio de indicaciones
            rutaVisible(ds, dr);
          }; 

          document.getElementById("ruta").addEventListener("click",onChangeHandler); 
        }
