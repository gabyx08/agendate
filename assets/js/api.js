var peticionApi = function(){
  fetch("../api/eventos.json").then(function(respuesta){
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
    location.href="../views/agendaDiaria.html";

}

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
           $(this).data('titulo',arreglo[i].nombre);
           $(this).data('ponente',arreglo[i].ponente);
           $(this).data('horario',arreglo[i].horario);
           $(this).data('lugar',arreglo[i].lugar);
           $(this).data('descripcion',arreglo[i].descripcion);
           $(this).click(mostrarAgendaDia);
         }
    });
  }
  // //console.log(arregloDatos);
  // var jaja = arregloDatos.forEach(function(dato,indice){
  //   return(dato[indice].dia);
  // });
  // //console.log(jaja);
}
var nuevasTarjetas = function(){
  var plantillaTarjeta = `
    <section class="eventos-Diarios container">
      <h4 class="row"> <strong>__dia__/strong></h4>
      <!-- Tarjeta evento -->
      <section class="card-panel grey lighten-4">
        <div class="row">
          <div class="col s8">
            <h5>__tituloEvento__</h5>
            <p>__nombrePonente__</p>
            <div class="container">
              <div class="row">
                <span class="center tag col s5 chip">__Lugar__</span>
                <a href="#infoEvento" class="center offset-s1 col s5"> ver más</a>
              </div>
            </div>
          </div>
          <div class="center col s4 grey lighten-2">
            <p class="center chip fuente-Az-med ocultar"> Agendado</p>
            <h4 class="center pb-9"> 00:00<br> a <br>00:00 </h4>
          </div>
        </div>
      </section>
      <!-- Fin tarjeta evento -->
    </section>
    `
  var plantillaModal = `
    <div id="infoEvento" class="modal">
      <div class="modal-content">
    <div class="row fondo--azulMedio">
      <div class="col s1">
        <i class="material-icons modal-close">close</i>
      </div>
      <h4 class="center p-3 letra--blanca  col s10">__tituloEvento__</h4>
    </div>
        <a class="right btn-floating btn-large waves-effect waves-light fondo-Az-osc mt-015 izq-3"><i class="material-icons" id="btn-agregar">add</i></a>
        <h5>__dia__</h5>
        <h6> __horario__</h6>
        <h6>Lugar:__lugar__</h6>
        <p class="justificar">__descripcion__</p>
      </div>
    </div>
    `
  var tarjetaFinal = "";
  tarjetaFinal += plantillaTarjeta.replace('__tituloEvento__',$(this).data('titulo'));
  $('#eventosDiarios').append(tarjetaFinal);
  local
};


var arregloDatos = [];
$(document).ready(function(){
  console.log(location.href);
  $(document).on('load','#eventosDiarios',nuevasTarjetas);
  // if(location.href == "../views/calendarioUsuario.html"){
    peticionApi();
    agregarData();



});
