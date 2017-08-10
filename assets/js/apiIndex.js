
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
    //console.log(arregloDatos);
    //console.log(arregloDatos[0].nombre)
    //console.log(typeof arregloDatos);
    agregarData(arregloDatos);
});

}
var mostrarAgendaDia = function(){

    location.href="/agendate/assets/views/agendaDiaria.html";

}
var Evento = function (titulo,ponente,horario,lugar,descripcion){
  this.titulo = titulo,
  this.ponente= ponente,
  this.horario= horario,
  this.lugar=   lugar,
  this.descripcion= descripcion,
  this.agregado= 'false';
}
var arregloObjetos=[{}];
var agregarData = function (arreglo){

  for(var i = 0 ; i < arreglo.length ;i++){
    // console.log(arreglo[i]);
    $(".fechaDia").each(function(indice,elemento){
      // indice=indice+1;
      elemento.dataset.dia = indice+1;
      if(arreglo[i].dia == elemento.dataset.dia){
           $(this).addClass('fecha-evento');
           $(this).data('evento',arreglo[i].evento);
          //  console.log($(this).data('evento'));
           var titulo = $(this).data('titulo',arreglo[i].nombre);
           var ponente = $(this).data('ponente',arreglo[i].ponente);
           var horario = $(this).data('horario',arreglo[i].horario);
           var lugar = $(this).data('lugar',arreglo[i].lugar);
           var descripcion = $(this).data('descripcion',arreglo[i].descripcion);
          var nuevoObjeto = new Evento(titulo,ponente,horario,lugar,descripcion);
          arregloObjetos.push(nuevoObjeto);
          console.log(arregloObjetos);
          $(this).click(mostrarAgendaDia);
          //  $(this).click(mostrarAgendaDia);
         }
    });
  }
  // //console.log(arregloDatos);
  // var jaja = arregloDatos.forEach(function(dato,indice){
  //   return(dato[indice].dia);
  // });
  // //console.log(jaja);
}

var arregloDatos = [];
$(document).ready(function(){
  // console.log(location.href);
  // $(document).on('load','#eventosDiarios',nuevasTarjetas);
  // if(location.href == "../views/calendarioUsuario.html"){
    peticionApi();
    agregarData();



});
