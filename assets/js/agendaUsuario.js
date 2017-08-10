var arregloDatos = [];

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
          <a class="right btn-floating btn-large waves-effect waves-light fondo--azulMedio"><i class="material-icons">check</i></a>
          <h5>Día _dia_</h5>
          <h6> _horario_</h6>
          <h6>Lugar: _lugar_</h6>
          <p>_descripcion_</p>
        </div>`;

var infoEventos = function(){
	fetch("../api/eventos.json").then(function(respuesta){
          return respuesta.json();
      }).then(function(datos){
          console.log(datos.Sheet1);
          var validation_messages = datos;
          
          for (var key in validation_messages) {
              // skip loop if the property is from prototype
              if (!validation_messages.hasOwnProperty(key)) continue;

              var obj = validation_messages[key];
              for (var prop in obj) {
                  // skip loop if the property is from prototype
                  // if(!obj.hasOwnProperty(prop)) continue;

                  // your code
                  arregloDatos.push(obj[prop]);
              }
          }
          mostrarEventos(arregloDatos);
      });
}


var mostrarEventos= function (eventos) {
	var plantillaFinal = "";
	eventos.forEach(function (evento) {
		plantillaFinal += plantillaCard
		.replace("_evento_", evento.evento)
		.replace("_dia_", evento.dia)
		.replace("Titulo_Evento", evento.nombre)
      .replace("Nombre_Ponente", evento.ponente)
	  .replace("Lugar", evento.etiqueta)
      .replace("_horario_", evento.horario);
	});
	$(".eventos-usuario").html(plantillaFinal);
};

function hola(evento){
	console.log(evento)
	var id = this.parentElement.dataset.id;
	console.log(id)
	filtrarInfoModal(id);
}

function filtrarInfoModal(id){
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
	     $('.modal').modal();

}

$(document).ready(function(){
    $(document).on("click", ".mas", hola);
    infoEventos();
  });
