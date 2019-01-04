import {traducirGenero, traducirColorOjos, convertir} from "../utils/traductor"

function peopleController(){
  console.log('Se cargo people');
  
  var url = "https://swapi.co/api/people/";
  
  function cargarPersonajes() {
    $.ajax(url, false)
    .done(obtenerPersonajes)
    .fail(function (error) {
      console.log(error);
    });
  }
  
  cargarPersonajes();

  function eliminarPersonaje() {
    var boton = $(event.target);
    //el boton es hijo de un td que a su vez es hijo del tr que quiero ocultar
    boton.parent().parent().fadeOut("slow");
  }
    
  function imprimirPersonajes(vector) {
    //oculta el personaje en el html
    for (let i = 0; i < vector.length; i++) {
      //obtengo la posicion a partir de la url
      var pos = vector[i].url.slice(28, vector[i].url["length"] - 1);
      var personaje = '<tr><th scope="row">' + pos + '</th><td>' + vector[i].name + '</td><td>' + traducirGenero(vector[i].gender) + '</td><td>' + convertir(vector[i].height,"cm") + '</td><td>' + convertir(vector[i].mass,"kg") + '</td><td>' + traducirColorOjos(vector[i].eye_color) + '</td><td class=""><button type="button" class="btn btn-success btn-block btn-sm p-0" id="boton' + pos + '">Guardar</button></td></tr>';
      // agrego el personaje a la tabla en el html
      $("#tableBody").append(personaje);
      // asocio el evento al boton
      $("#boton" + pos).click(eliminarPersonaje);
    }
  }

  function obtenerPersonajes(data) {
    //obtengo el vector de los personajes
    var personajes = data.results;
    //muestro los personajes en pantalla
    imprimirPersonajes(personajes);
    //obtengo la direccion url de la siguiente lista de personajes
    var nuevaUrl = data.next;
    //si existe la url...
    if (nuevaUrl){
      //desasocio el evento anterior del boton
      $("#seeMore").off("click", cargarPersonajes);
      //sobreescribo la direccion url con la nueva 
      url = nuevaUrl;
      //asocio el evento para que cargue los personajes de la nueva url
      $("#seeMore").click(cargarPersonajes);
    } else $("#seeMore").remove();//si no existe la nueva url, borro el boton "ver más"
  }

}
  
export default peopleController