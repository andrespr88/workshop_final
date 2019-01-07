/*La función tiene que recibir como parámetro una key y buscar en el localStorage por esa key devolviendo 
un objeto de JavaScript, si no existe el elemento debe devolver un Array vacío. La función tiene que
validar los parámetros que recibe, en caso de que alguno sea incorrecto no debe romper ni hacer nada.*/
function getLocalList(key) {
  if (typeof key === "string") {
      //recupero la lista del local storage
      var localList = localStorage.getItem(key);
      //verifico que sea distinto de null o undefined
      if (localList) {
          //si existe, la transformo en Javascript y la devuelvo
          var resultado = JSON.parse(localList);
          return resultado;
      } else return [];
  }
}

/*La función tiene que recibir como parámetros una key y un Array y convertir el Array en JSON para 
guardarlo en el localStorge. La función tiene que validar los parámetros que recibe, en caso de que 
alguno sea incorrecto no debe romper ni guardar nada*/
function setLocalList(key, testList) {
  if (typeof key === "string" && Array.isArray(testList)) {
      //convertimos en JSON el array
      testList = JSON.stringify(testList);
      //creo el localStorage
      localStorage.setItem(key, testList);
  }
}

//recibe una url y busca si coincide con la de algun personaje almacenado en el localStorage, devuelve true o false
function buscarPersonajeLocal(url) {
  var condicion = false
  var personajes = getLocalList("listaPersonajes");
  personajes.forEach(personaje => {
    if (personaje.url === url) {
      condicion = true;
    }
  });
  return condicion;
}

export { getLocalList, setLocalList, buscarPersonajeLocal }