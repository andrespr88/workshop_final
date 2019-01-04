function traducirGenero(texto){
    switch (texto){
        case "male":
            texto = "masculino";
            break;
        case "female":
            texto = "femenino";
            break;
        case "hermaphrodite":
            texto = "hermafrodita";
            break;
        case "n/a":
        case "none":
            texto = "no aplica";
            break;
        default:
            break;
    }
    return texto;
}

function traducirColorOjos(texto){
    switch (texto){
        case "blue":
            texto = "azul";
            break;
        case "yellow":
            texto = "amarillo";
            break;
        case "red":
            texto = "rojo";
            break;
        case "brown":
            texto = "marrón";
            break;
        case "blue-gray":
            texto = "azul grisáceo";
            break;
        case "orange":
            texto = "naranja";
            break;
        case "black":
            texto = "negro";
            break;
        case "hazel":
            texto = "avellana";
            break;
        default:
            break;
    }
    return texto;
}

function convertir(alturaOPeso, medida){
    return (alturaOPeso === "unknown") ? "desconocido" : alturaOPeso + " " + medida; 
  }

export {traducirGenero, traducirColorOjos, convertir}