var map;  /*inicializo el mapa*/
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(-33.45, -70.66667),
    mapTypeId: 'roadmap'
  });

 /* var iconBase = "http://maps.google.com/mapfiles/kml/shapes";//creo un icono que servirá como marcador del mapa en lugar del habitual
  var icon = {
    taxi: {
      icon: iconBase + 'cycling.png'
    }
  };
  */
  var feature = {
      //position: new google.maps.LatLng(-33.91722, 151.23064),
      type: "cab"
    }


    function buscar(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(found, notFound);
      }
    }

  //document.getElementById("findme").addEventListener("click", buscar); NO SIRVE ESTA FUNCIÓN, HARÉ UN EVENTO ONLOAD PARA QUE PREGUNTE SI PERMITE ACCEDER A LA UBICACIÓN DEL USUARIO EN CUANTO CARGUE LA PAGINA// 

  window.addEventListener("load", buscar); 


  var latitud, longitud;

  var found = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map, 
      icon: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/64/taxi-icon.png'//animador/marcador del mapa
    });

    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }

  var notFound = function(error){
    alert("No pudimos encontrar tu ubicación");
  }
  /* autocompletado de los input origen y destino (ruta)*/

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
        
        /*función para calcular la tarifa entre las dos distancias EJ tomado de la compañera Amala Kamala que lo solucionó y mostró en el code review del 23.06 */
        function tarifa() {
          var partida = document.getElementById("origen").value;
          var llegada = document.getElementById("destino").value;
          var distancia = document.getElementById("tarifa");

          var request = {
            origin: partida, 
            destination: llegada,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          };


          ds.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              dr.setDirections(response);          
              var costo = (response.routes[0].legs[0].distance.value / 1000) * 500;
              var newDiv = document.createElement("div");
              newDiv.setAttribute("class","costo");
              var resultado = document.createTextNode("$ " + costo);
              newDiv.appendChild(resultado);
              distancia.appendChild(newDiv);
            }
          }); 
        }
        //onChangeHandler = Agrega una propiedad de seguimiento a una definición de lenguaje específico de dominio
        dr.setMap(map);
        var onChangeHandler = function(){
            //Servicio de indicaciones
            rutaVisible(ds, dr);
            tarifa(); //llamamos a la función que calcula la tarifa, de otra manera no imprime el monto en pantalla
          }; 

          document.getElementById("ruta").addEventListener("click",onChangeHandler);

}