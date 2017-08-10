
var peticionApi = function(){
    fetch("/agendate/assets/api/eventos.json").then(function(respuesta){
      return respuesta.json();
  }).then(function(datos){
      //console.log(datos.Sheet1);
      var respuestaApiEventos = datos;
      for (var evento in respuestaApiEventos) {
          // skip loop if the property is from prototype
          if (!respuestaApiEventos.hasOwnProperty(evento)) continue;

          var obj = respuestaApiEventos[evento];
          for (var prop in obj) {
              // skip loop if the property is from prototype
              // if(!obj.hasOwnProperty(prop)) continue;

              // your code
              arregloDatos.push(obj[prop]);


          }
      }
    console.log(arregloDatos);
    //console.log(arregloDatos[0].nombre)
    //console.log(typeof arregloDatos);
    agregarData(arregloDatos);
});

}
var mostrarAgendaDia = function(e){

    console.log("hola");
    console.log(this.dataset.dia);
    localStorage.setItem('diaSeleccionado',this.dataset.dia);
    console.log(localStorage.diaSeleccionado);
    location.href="/assets/views/agendaDiaria.html";
    //  location.href="../assets/views/agendaDiaria.html";

}

var arregloObjetos=[{}];
var agregarData = function (arreglo){
  var arregloNombres= [];
  for(var i = 0 ; i < arreglo.length ;i++){
    // console.log(arreglo[i]);
    $(".fechaDia").each(function(indice,elemento){
      // indice=indice+1;
      elemento.dataset.dia = indice+1;
      if(arreglo[i].dia == elemento.dataset.dia){
           $(this).addClass('fecha-evento');
           $(this).data('evento',arreglo[i].evento);
          //  console.log($(this).data('evento'));
          $(this).data('nombre',arreglo[i].nombre);
          $(this).data('ponente',arreglo[i].ponente);
          $(this).data('horario',arreglo[i].horario);
          $(this).data('lugar',arreglo[i].lugar);
          $(this).data('dia',arreglo[i].dia);
          $(this).data('descripcion',arreglo[i].descripcion);
          $(this).click(mostrarAgendaDia);
          //  $(this).click(mostrarAgendaDia);
         }
    });
  }

}

var arregloDatos = [];
$(document).ready(function(){
  // console.log(location.href);
  // $(document).on('load','#eventosDiarios',nuevasTarjetas);
  // if(location.href == "../views/calendarioUsuario.html"){
    peticionApi();
    agregarData();



});
