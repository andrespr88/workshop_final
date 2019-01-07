import { traducirGenero, traducirColorOjos, convertir } from "../utils/traductor"
import getRequest from "../utils/ajax"
import { getLocalList, setLocalList, buscarPersonajeLocal } from "../utils/localStorage"

function peopleController() {
    const urlInicial = "https://swapi.co/api/people/";
    
    ObtenerTodos();
    
    $("#botonBuscar").click(buscarEnLaLista);
    $("#inputBuscar").keypress(function () {
        if (event.which == 13) {
            buscarEnLaLista();
        }
    });
    
    function ObtenerTodos() {
        getRequest(urlInicial, ProcesarPersonas);
    }

    function ProcesarPersonas(datos) {
        //obtengo el vector de los personajes
        var personajes = datos.results;
        //muestro los personajes en pantalla
        imprimirPersonajes(personajes);
        //obtengo la direccion url de la siguiente lista de personajes
        var nuevaUrl = datos.next;
        //si existe la url...
        if (nuevaUrl) {
            //asocio el evento para que cargue los personajes de la nueva url
            $("#seeMore").one("click", function () {
                getRequest(nuevaUrl, ProcesarPersonas);
            });
        } else $("#seeMore").remove();//si no existe la nueva url, borro el boton "ver más"
    }

    function imprimirPersonajes(vector) {
        //oculta el personaje en el html
        for (let i = 0; i < vector.length; i++) {
            //obtengo la posicion a partir de la url
            var pos = vector[i].url.slice(28, vector[i].url["length"] - 1);
            var boton;
            //si el personaje no se encuentra en el localStorage, agrego el boton
            if (!buscarPersonajeLocal(vector[i].url)){
                boton = '<td><button type="button" class="btn btn-success btn-block btn-sm p-0" data-url="' + vector[i].url + '" id="boton' + pos + '">Guardar</button></td>'
            } else boton = '<td>Guardado</td>';

            var personaje = '<tr><th scope="row">' + pos + '</th><td>' + vector[i].name + '</td><td>' + traducirGenero(vector[i].gender) + '</td><td>' + convertir(vector[i].height, "cm") + '</td><td>' + convertir(vector[i].mass, "kg") + '</td><td>' + traducirColorOjos(vector[i].eye_color) + '</td>' + boton + '</tr>';
            // agrego el personaje a la tabla en el html
            $("#tableBody").append(personaje);
            // asocio el evento al boton
            $("#boton" + pos).click(guardarPersonaje);
        }
    }

    function guardarPersonaje() {
        var boton = $(event.target);
        //oculto el boton con la animacion slideup y en el html muestro: "Guardado"
        boton.slideUp("slow",function(){
            $(this).parent().html("Guardado");
        });
        var url = boton.attr("data-url");
        if (!buscarPersonajeLocal(url)) {
            getRequest(url, almacenarLocal);
        }
    }

    function almacenarLocal(personaje) {
        var personajes = getLocalList("listaPersonajes");
        personajes.push(personaje);
        setLocalList("listaPersonajes", personajes);
    }


    function buscarEnLaLista() {
        var tabla = [];
        var cadena = $("#inputBuscar").val().toLowerCase();
        var lista = $("#tableBody tr");

        for (let i = 0; i < lista.length; i++) {
            const element = lista[i];
            for (let j = 0; j < element.cells.length; j++) {
                var texto = element.cells[j].innerText.toLowerCase()
                var test = texto.indexOf(cadena);
                if (test !== -1) {
                    tabla.push(element);
                }

            }
        }
        $("#tableBody").html(tabla);
    }

}

export default peopleController