var arregloDatos = [];

var arregloAgendados = ["evento1", "evento2", "evento3", "evento5"];

var plantillaCard= `<h5>_dia_</h5>
		<section class="card-panel grey lighten-4">
			<div class="row">
				<div class="col s8">
					<h5> Titulo_Evento </h5>
					<p> Nombre_Ponente</p>
					<div class="container">
						<div class="row" data-id= _evento_>
							<span class="center tag col s5 chip"> Lugar </span>
							<a href="#infoEvento" class="center offset-s1 col s5 mas"> Ver Más</a>
						</div>
					</div>
				</div>
				<div class="center col s4 grey lighten-2">
					<p class="center fondo-Az-med letra--blanca p-3"> Agendado</p>
					<h4 class="center"> _horario_ </h4>
				</div>
			</div>
		</section>`;

var modal =  `<div class="modal-content">
             <i class="material-icons modal-close ">close</i>
          <h4 class="center p-3 fondo--azulMedio letra--blanca">Titulo_Evento</h4>
          <a class="right btn-floating btn-large waves-effect waves-light fondo--azulMedio"><i id="btn-agregar" class="material-icons">check</i></a>
          <h5>Día _dia_</h5>
          <h6> _horario_</h6>
          <h6>Lugar: _lugar_</h6>
          <p>_descripcion_</p>
        </div>`;

// OBTENER INFORMACION DE LOS EVENTOS DESDE EL JSON

var infoEventos = function(){
	fetch("../api/eventos.json").then(function(respuesta){
          return respuesta.json();
      }).then(function(datos){
          console.log(datos.Sheet1);
          var validation_messages = datos;
          
          for (var key in validation_messages) {
              if (!validation_messages.hasOwnProperty(key)) continue;

              var obj = validation_messages[key];
              for (var prop in obj) {
            
                  arregloDatos.push(obj[prop]);
              }
          }
         // mostrarEventos(arregloDatos);  // para mostrar todos los eventos del arregloDatos pero en la funcion mostrarEventos se deben eliminar los indices [0]
        filtrarEventosAgendados();
      });
}

// Se obtienen los datos de los eventos agendados a partir del arregloDatos
var filtrarEventosAgendados = function(){
	var eventosAgendados= [];
		arregloAgendados.forEach(function(id){
			eventosAgendados.push (arregloDatos.filter(function (evento) {
				return evento.evento.indexOf(id) >= 0;
			}))
		})
		
	 mostrarEventos(eventosAgendados)
}

// Se pintan las tarjetas de los eventos agendados
var mostrarEventos= function (eventos) {
	var plantillaFinal = "";
	eventos.forEach(function (evento) {
		plantillaFinal += plantillaCard
		.replace("_evento_", evento[0].evento)
		.replace("_dia_", evento[0].dia)
		.replace("Titulo_Evento", evento[0].nombre)
      .replace("Nombre_Ponente", evento[0].ponente)
	  .replace("Lugar", evento[0].etiqueta)
      .replace("_horario_", evento[0].horario);
	});
	$(".eventos-usuario").html(plantillaFinal);
};

// al dar click en ver mas se obtiene el id de la tarjeta para obtener los datos de eventos y mostrarlos en el modal
var obtenerId = function(){
	var id = this.parentElement.dataset.id;
	filtrarInfoModal(id);
}


var filtrarInfoModal = function(id){
		var eventoFiltrado = arregloDatos.filter(function (evento) {
		return evento.evento.indexOf(id) >= 0;
	});
	 mostrarModal(eventoFiltrado)
}

var mostrarModal = function(eventoFiltrado){
	var modalFinal = "";
	eventoFiltrado.forEach(function (eventoFiltrado) {
		modalFinal += modal
		.replace("_evento_", eventoFiltrado.evento)
		.replace("_dia_", eventoFiltrado.dia)
		.replace("Titulo_Evento", eventoFiltrado.nombre)
	    .replace("Nombre_Ponente", eventoFiltrado.ponente)
		.replace("_lugar_", eventoFiltrado.lugar)
	    .replace("_horario_", eventoFiltrado.horario)
	    .replace("_descripcion_", eventoFiltrado.descripcion);

	});
	$("#infoEvento").html(modalFinal);
}



function mostrarAlert() {
	swal({
	  title: "¿Estás segur@ de eliminar este evento?",
	  text: "Puedes volver a agregar el evento en otro momento ;)",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonColor: "#DD6B55",
	  confirmButtonText: "¡Si!",
	  closeOnConfirm: false,
	  closeOnCancel: false
	},
	function(isConfirm){
	  if (isConfirm) {
	    swal("¡Eliminado!", "Este evento ha sido quitado de tu agenda.", "success");
		$('#infoEvento').modal('close');

	  } else {
	    swal("Cancelado", "Podrás encontrar este evento en tu agenda :)", "error");
	  }
	});
}

$(document).ready(function(){
    $(document).on("click", ".mas", obtenerId);
    $('.modal').modal();
    infoEventos();
    $(document).on("click", "#btn-agregar", mostrarAlert);
  });
