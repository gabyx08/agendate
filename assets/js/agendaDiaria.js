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

// Función al cargar página
$(document).ready(function(){
    $('.modal').modal();
});
