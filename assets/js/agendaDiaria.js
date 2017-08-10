console.log('Agenda');
//********FUNCÍÓN PARA FILTRAR EL DÍA*****
var day = 19;
console.log(day);

function filtrarDia(dia) {
	arregloDatos.forEach(function (evento) {
		// console.log(evento.dia);
		var coincidencia = []
		if(evento.dia == day){
			coincidencia.push(evento);
			console.log(coincidencia);
			mostrarEventos(coincidencia);
			// return coincidencia;
		}else{
			console.log('ÑO');
			// $('#eventos-Diarios').html('<h3 class="center"> Lo sentimos, aún no hay eventos programados :( </h3>');
		}
	});
}
// *******Funcionalidad modal************
function cargarPag() {
	setTimeout(function() {
	  var url = "../views/iniciarSesion.html";
	  $(location).attr("href",url);
  }, 500)
}

var sigIn = document.getElementById('btn-InicioSesion');
sigIn.addEventListener('click', cargarPag);

// ************Funcionalidad alert************
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
		$('#btn-agregar').text('add');
		tipo = "add";
		actualizarTipo(tipo);
	  } else {
	    swal("Cancelado", "Podrás encontrar este evento en tu agenda :)", "error");
	  }
	});
}

function validarEdo() {
	var edo = $('#btn-agregar').text();
	console.log(edo);
	if (edo == 'add') {
		agendarEv();
		swal("¡Super!", "El evento ha sido agregado a tu agenda", "success");
		// agendados();
	}
	else{
		mostrarAlert();
	}
}

//*******************Función Agendar Evento***************
function agendarEv() {
	// console.log(agregarEv.textContent);
	$('#btn-agregar').text('check');
	tipo = 'check';
	actualizarTipo(tipo);
}

////*******************Arreglo de eventos agendados***********
//  var arregloAgendados = [];
// function agendados(e) {
// 	var cod = $(e.target).data('id');
// 	arregloAgendados.push(cod);
// 	localStorage[‘arregloAgendados’]=JSON.stringify(arregloAgendados);
// 	console.log(arregloAgendados);
// 	console.log(localStorage[‘arregloAgendados’]=JSON.stringify(arregloAgendados))
// }

//************Función API************************
var arregloDatos = [];
function api() {
	fetch("../api/eventos.json").then(function(respuesta){
	          return respuesta.json();
	      }).then(function(datos){
	        //   console.log(datos.Sheet1);
	          var validation_messages = datos;
	          for (var key in validation_messages) {
	              if (!validation_messages.hasOwnProperty(key)) continue;
	              var obj = validation_messages[key];
	              for (var prop in obj) {
	                  arregloDatos.push(obj[prop]);
	              }
	          }
	        //   console.log(arregloDatos);
	        //   console.log(arregloDatos[0].nombre);
			//  mostrarEventos(arregloDatos);
			filtrarDia();
	      });
}

// ***********Función para mostrar tarjetas de los eventos*******************
var plantillaModal = '<div class="modal-content">'+
	'<div class="row fondo--azulMedio">'+
		'<div class="col s1">'+
			'<i class="material-icons modal-close">close</i>'+
		'</div>'+
		'<h4 class="center p-3 letra--blanca  col s10">__titulo__</h4>'+
	'</div>'+
	  '<a class="right btn-floating btn-large waves-effect waves-light fondo-Az-osc mt-015 izq-3"><i class="material-icons" id="btn-agregar" data-id="__num-evento__">__tipo-evento__</i></a>'+
	  '<h5> __fecha__</h5>'+
	  '<h6> __horario__</h6>'+
	  '<h6>__direccion__</h6>'+
	  '<p class="justificar">__descripcion__</p>'+
	'</div>';

var plantillaTarjeta = '<section class="card-panel grey lighten-4">'+
			'<div class="row">'+
				'<div class="col s8">'+
					'<h5 class="tituloEv"> __titulo__</h5>'+
					'<p> __ponente__</p>'+
					'<div class="container">'+
						'<div class="row">'+
							'<span class="center tag col s5 chip"> __tag__ </span>'+
							'<a href="#modal-Evento" class="center offset-s1 col s5 mas" data-id="__id__"> ver más</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="center col s4 grey lighten-2">'+
					'<p class="center chip fuente-Az-med ocultar"> Agendado</p>'+
					'<h4 class="center pb-9">__horario__ </h4>'+
				'</div>'+
			'</div>'+
		'</section>';

//************Función para mostrar eventos********************
function mostrarEventos(evnt) {
	var tarjetaEvn = "";
	// var contenedorTarjetas = document.getElementById('eventos-Diarios');
	evnt.forEach(function (evnt) {
		tarjetaEvn += plantillaTarjeta.replace('__titulo__', evnt.nombre)
		.replace('__ponente__', evnt.ponente)
		.replace('__tag__',evnt.etiqueta)
		.replace('__horario__', evnt.horario)
		.replace('__id__', evnt.evento);
		$('#titulo-mes').text(evnt.mes);
		$('#titulo-dia').text('Día: ' + evnt.dia);
	});
	$('#eventos-Diarios').html(tarjetaEvn);

}
//******************Función par aobtener id del evento************
var obtenerId = function(){
	var id = this.dataset.id;
	// console.log(id);
	filtrarInfoModal(id);
}
//*****************FUnción para filtrar evento *********************
eventoFiltrado = [];
var filtrarInfoModal = function(id){
		eventoFiltrado = arregloDatos.filter(function (evento) {
		return evento.evento.indexOf(id) >= 0;
	});
	console.log(eventoFiltrado);
	 mostrarModal(eventoFiltrado);
}

//**********************Función par actualizarel tipo de evento*********************
function actualizarTipo(tipo) {
		var plantilla = "";
		eventoFiltrado.forEach(function (filtro) {
			plantilla = plantillaModal.replace('__tipo-evento__', tipo);
		})
}

///*************Función que muestra el modal****************
function mostrarModal(filtro) {
	var verModal = "";
	var tipo = 'add';
	filtro.forEach(function (filtro) {
		verModal = plantillaModal.replace('__titulo__', filtro.nombre)
		.replace('__num-evento__', filtro.evento)
		.replace('__fecha__', filtro.dia + ' de ' + filtro.mes)
		.replace('__horario__', filtro.horario)
		.replace('__direccion__', filtro.lugar)
		.replace('__descripcion__', filtro.descripcion)
		.replace('__tipo-evento__', tipo);
	});
	actualizarTipo(tipo);
	$('#modal-Evento').html(verModal);
}

// **************Función principal*******************
function cargarFns() {
	api();
	$(document).on('click', '.mas', obtenerId);
	$('.modal').modal();
	$(document).on('click', "#btn-agregar", validarEdo);//Funcion del modal
}

// *******Función que se ejecuta al cargar página**********
$(document).ready(cargarFns);
