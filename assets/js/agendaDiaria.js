console.log('Agenda');

function cargarPag() {
	setTimeout(function() {
	  var url = "../views/iniciarSesion.html";
	  $(location).attr("href",url);
  }, 500)
}

var sigIn = document.getElementById('btn-InicioSesion');
sigIn.addEventListener('click', cargarPag);
