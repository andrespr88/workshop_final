$(document).ready(function(){
    $("#firstName").one("blur", validarVacio);
    $("#email").one("blur", validarEmail);
    $("#comments").one("blur", validarVacio);
    
    //recibe un nodo html y una condicion, y le agrega la clase "is-valid" si cumple con la condicion o "is-invalid" si no la cumple  
    function agregarClase(nodo, condicion) {
      if (condicion) {
        //le saco la clase "is-invalid", en caso que no la tenga, no rompe ni hace nada        
        nodo.removeClass("is-invalid");
        nodo.addClass("is-valid");
      } else {
        nodo.removeClass("is-valid");
        nodo.addClass("is-invalid");
      }
    }
    
    //verifica que el campo no este vacio
    function validarVacio() {
      var input = $(this);
      input.next().remove();
      agregarClase(input, input.val().trim());
      if (input.hasClass("is-invalid")) {
        input.parent().append("<div class='invalid-feedback'> Campo Requerido </div>");
      }
      if (event.type === "blur") {
        input.keyup(validarVacio);
      }
      validarBoton();
    }
    
    //verifica que el email tenga: string + "@" + string + "." + string de min 2 y max 4 caracteres
    function validarEmail() {
      var input = $(this);
      var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(input.val());
      input.next().remove();
      agregarClase(input, test);
      if (input.hasClass("is-invalid")) {
        input.parent().append("<div class='invalid-feedback'> Ejemplo: usuario@ejemplo.com </div>");
      }
      if (event.type === "blur") {
        input.keyup(validarEmail);
      }
      validarBoton();
    }

    //si todos los campos son validos, habilita el boton  
    function validarBoton() {
      var validos = $(".is-valid");
      (validos.length === 3) ? $("#submitButton").attr("disabled", false) : $("#submitButton").attr("disabled", true);
    }
});