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


//   function postData (url, data, cbk) {
//     $.ajax({
//       url: url,
//       method: 'POST',
//       data: data
//     })
//       .done(function (data) {
//         cbk(null, data)
//       })
//       .fail(function (error) {
//         cbk(error)
//       })
//   }
  
  export default getRequest