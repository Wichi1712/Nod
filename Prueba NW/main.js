var ventana = nw.Window.get();

var maximizado = false;
ventana.setPosition("center");
//ventana.blur();
//ventana.focus();


//var menu = new nw.Menu({type: 'menubar'});
//menu.popup(10,10);




function cerrar(){
	ventana.close();
}

function minimizar(){
	ventana.minimize();
}

//inicio maximizar
function maximizar(){
	if(maximizado){
		ventana.unmaximize();
		maximizado = false;
	}else {
		ventana.maximize();
		maximizado = true;
	}
	
}

ventana.on("maximize" , function() {
	maximizado = true;
});
//fin maximizar



 function mostrarTexto(){
	//alert("Esta es una alerta");
	//confirm("ESte es un confirm");
	var pro = prompt("Inserte texto", "Digite aqui");
	//document.write("Esto se hizo con document.write");
	document.getElementById("txt").innerHTML = "Ahora el texto dice: " + pro;

	
}


	