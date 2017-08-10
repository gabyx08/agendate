console.log('Agenda');
// Funcionalidad modal
function cargarPag() {
	setTimeout(function() {
	  var url = "../views/iniciarSesion.html";
	  $(location).attr("href",url);
  }, 500)
}

var sigIn = document.getElementById('btn-InicioSesion');
sigIn.addEventListener('click', cargarPag);

// Funcionalidad alert

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
		agregarEv.textContent = 'add';
	  } else {
	    swal("Cancelado", "Podrás encontrar este evento en tu agenda :)", "error");
	  }
	});
}

function validarEdo() {
	var edo = agregarEv.textContent;
	if (edo == 'add') {
		agendarEv();
		swal("¡Super!", "El evento ha sido agregado a tu agenda", "success")
	}
	else{
		mostrarAlert();
	}
}

function agendarEv() {
	// console.log(agregarEv.textContent);
	agregarEv.textContent = 'check';
}

var agregarEv = document.getElementById('btn-agregar');
agregarEv.addEventListener('click', validarEdo);
// console.log(agregarEv);
// agregarEv.map(function (item) {
// 	item.addEventListener('click', validarEdo);
// });

//

//Función API
fetch("../api/eventos.json").then(function(respuesta){
          return respuesta.json();
      }).then(function(datos){
        //   console.log(datos.Sheet1);
          var validation_messages = datos;
          var arregloDatos = [];
          for (var key in validation_messages) {
              if (!validation_messages.hasOwnProperty(key)) continue;
              var obj = validation_messages[key];
              for (var prop in obj) {
                  arregloDatos.push(obj[prop]);
              }
          }
        //   console.log(arregloDatos);
          console.log(arregloDatos[0].nombre);

      });
// Función para mostrar tarjetas de los eventos
var cont = 0;
var plantillaModal = '<div class="modal-content">'+
	'<div class="row fondo--azulMedio">'+
		'<div class="col s1">'+
			'<i class="material-icons modal-close">close</i>'+
		'</div>'+
		'<h4 class="center p-3 letra--blanca  col s10">Titulo Evento</h4>'+
	'</div>'+
	  '<a class="right btn-floating btn-large waves-effect waves-light fondo-Az-osc mt-015 izq-3"><i class="material-icons" id="btn-agregar">add</i></a>'+
	  '<h5>Día 1</h5>'+
	  '<h6> 0:00 a 0:00</h6>'+
	  '<h6>Lugar: Salón 405</h6>'+
	  '<p class="justificar">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa, repellendus aspernatur aliquid reprehenderit perspiciatis libero enim ullam harum amet accusamus deserunt omnis id rerum architecto natus iste ratione illo.</p>'+
	'</div>';

var plantillaTarjeta = '<section class="card-panel grey lighten-4">'+
			'<div class="row">'+
				'<div class="col s8">'+
					'<h5 class="tituloEv"> __titulo__</h5>'+
					'<p> __ponente__</p>'+
					'<div class="container">'+
						'<div class="row">'+
							'<span class="center tag col s5 chip"> __sala__ </span>'+
							'<a href="__id__" class="center offset-s1 col s5"> ver más</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="center col s4 grey lighten-2">'+
					'<p class="center chip fuente-Az-med ocultar"> Agendado</p>'+
					'<h4 class="center pb-9"> 00:00<br> a <br>00:00 </h4>'+
				'</div>'+
			'</div>'+
		'</section>';

function pintarTarjetas() {
	var tarjetaEvn = "";
	var contenedorTarjetas = document.getElementById('eventos-Diarios');

}

function pintarModal() {
	var tarjetaModal = "";
	var contenedorModal = document.getElementById('modal-Evento');
}

// Función principal
function cargarFns() {
	$('.modal').modal();
	// pintarTarjetas();
	// pintarModal();
}
// Función al cargar página
$(document).ready(cargarFns);
