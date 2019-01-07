function getRequest(url, procesar) {

    $.ajax({
        type: "GET",
        dataType: "json",
        //timeout: 10000 ,
        contentType: "application/json",
        async: true,
        url: url,

        success: procesar,
        error: function (a, b, c) {
            debugger;
            // alert("Error..")
        }
    });
}
  
  export default getRequest