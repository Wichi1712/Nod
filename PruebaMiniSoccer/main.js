function saluda(){
	alert("todo OK");
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ancho = canvas.width;
var alto = canvas.height;

//variables de balon
var posHor = 80;
var posVer = 50;
var velocidadH = 1;
var velocidadV = 1;

//Variables de player
var X = 280;
var Y = 150;
var testX = 200;
var testY = 100;
var testMoveSpeed = 5;
const DIAMETER = 20;
var moveX = 5;
var moveY = 5;
var speed = 5;
var move = true;
var ejex = true;

var teclaIzquierda = 37;
var teclaAbajo = 38;
var teclaArriba = 40;
var teclaDerecha = 39;
var teclaEspacio = 32;
var teclaPulsada = null;
var tecla = [];

var ingAni = 0;
var ingAni2 = 0;
var player_array = new Array();
//var player_arrayRed = new Array();

//Variables de imagenes
var imgBandera;

function cargaImagenes(){
    imgBandera = new Image();
    
    imgBandera.src = "img/sagi 02.jpg"
}

cargaImagenes();
function dibujaBandera(){
    var posX = 20;
    var posY = 10;
    var anchoBandera = 80;
    var altoBandera = 50;
    ctx.drawImage(imgBandera,posX,posY,anchoBandera,altoBandera);
}

function dibujaFondo() {
    var anchoLinea = 5;
    var medioCampoHor = ancho/2;
    var medioCampoVer = alto/2;
    var anchoArcoI = 60;
    var anchoArcoD = ancho - 60;
    
    ctx.fillStyle = "#ffffff";
    //Lineas horizontales
    ctx.fillRect(10,10,ancho - 20,anchoLinea);//Izquierda
    ctx.fillRect(10,alto - 15,ancho - 20,anchoLinea);//Derecha

    //Lineas verticales
    ctx.fillRect(10,10,anchoLinea,alto - 20);//izquierda
    ctx.fillRect(medioCampoHor,10,anchoLinea,alto - 20);//centro
    ctx.fillRect(ancho - 15,10,anchoLinea,alto - 20);//derecha

//prueba
	//ctx.fillStyle = "#ff00ff";
	//ctx.stroke()
	//ctx.strokeRect(0,0,ancho - 50,alto)
    //ctx.fillRect(0,0,ancho,alto);//Izquierda
	/*
    //Lineas de prueba
    //Diagonal
    ctx.moveTo(medioCampoR, 10);
    ctx.lineTo(585, 285);
    //Del punto medio hacia la derecha
    ctx.moveTo(medioCampoR,canvasRequest.height/2);
    ctx.lineTo(550, canvasRequest.height/2);
    //Del punto medio hacia la izquierda
    ctx.moveTo(medioCampoR,canvasRequest.height/2);
    ctx.lineTo(50, canvasRequest.height/2);

    ctx.strokeStyle = "#30ff30";//color de linea
	ctx.stroke();
	*/

    //Circulo centro de campo
    ctx.beginPath();
    ctx.arc(ancho/2, alto/2, 30, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffffff";//color de linea
	ctx.stroke();
	

    //TEST LINES
    //ctx.beginPath();
    /*
    ctx.moveTo(10, 60);
    ctx.lineTo(40, 60);
    ctx.moveTo(40, 60);
    ctx.lineTo(40, 140);
    ctx.moveTo(40, 140);
    ctx.lineTo(10, 140);
    ctx.strokeStyle = "white";
    ctx.stroke();
    */
    
    //ARCOS DERECHO E IZQUIERDO
    /*A partir de aqui se dibuja los arcos donde entrara el balon para hacer puntos.
    Se usan 3 lineas para cada arco (Desde - Hasta)
    */
    //Izquierda
    //ctx.beginPath();
    ctx.moveTo(10, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoI, medioCampoVer - 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoI, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoI, medioCampoVer + 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoI, medioCampoVer + 50);//Desde punto X Y
    ctx.lineTo(10, medioCampoVer + 50);//Hasta punto X Y
    ctx.strokeStyle = "white";
    ctx.stroke();
    
    //Derecho
    //ctx.beginPath();
    ctx.moveTo(ancho - 10, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoD, medioCampoVer - 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoD, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoD, medioCampoVer + 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoD, medioCampoVer + 50);//Desde punto X Y
    ctx.lineTo(ancho - 10, medioCampoVer + 50);//Hasta punto X Y
    ctx.strokeStyle = "white";
    ctx.stroke();
    
}

//BALON
function dibujaBalon() {
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(posHor, posVer, 20, 20);
    
    //Mueve balon
    //colision horizontal
    if(posHor > ancho){
        velocidadH = -1;
	}else if(posHor < 0){velocidadH = 1}
	//Colision vertical
	if(posVer > alto){
        velocidadV = -1;
    }else if(posVer < 0){velocidadV = 1}
	
    //move
	posHor = posHor + velocidadH;
    posVer = posVer + velocidadV;
}
//---------------------------------------------------------------------------------
//OBJETO PLAYER
function Player(posX, posY, tamano, color) {
	this.posX = posX;
	this.posY = posY;
	this.tamano = tamano;
	this.color = color;

	//this.dibuja = function () {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.posX, this.posY, this.tamano, this.tamano);
	//this.posY = this.posY + 10;
	ctx.restore();
	//};
	
}

//----------------------------------------------------------------------------
function Test(posx, posy, tamano, color) {
	this.x = posx;
	this.y = posy;
	this.tamano = tamano;
	this.color = color;

	this.dibuja = function () {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	//this.posY = this.posY + 10;
	ctx.restore();
	};
/*
	this.move = function () {
		if (tecla[teclaDerecha]) this.x += testMoveSpeed;
		if (tecla[teclaIzquierda]) this.x -= testMoveSpeed;
		if (tecla[teclaArriba]) this.y += testMoveSpeed;
		if (tecla[teclaAbajo]) this.y -= testMoveSpeed;
	};

*/
}

function moveTest() {
	//this.move = function () {
		if (tecla[teclaDerecha]) testX += testMoveSpeed;
		if (tecla[teclaIzquierda]) testX -= testMoveSpeed;
		if (tecla[teclaArriba]) testY += testMoveSpeed;
		if (tecla[teclaAbajo]) testY -= testMoveSpeed;
	//};
}

var test = new Test(testX ,testY , 30,"cyan");
//console.log(player);
//--------------------------------------------------------------------------------

//EQUIPO DE PLAYER
function equipoBluePlayer() {
	for (var i = 0; i < 3; i++) {//filas
		for (var j = 0; j < 2; j++) {//columnas
			player_array.push(new Player(X + 30 * j, Y + 45 * i, DIAMETER, "blue"));
		}
	}
}

function equipoRedPlayer() {
	for (var i = 0; i < 3; i++) {//filas
		for (var j = 0; j < 2; j++) {//columnas
			player_array.push(new Player(410 + 40 * j, 30 + 50 * i, DIAMETER, "red"));
		}		
	}
}

function equipoTest() {//Enviamos directo a la funcion animation
	
	for (var i = 0; i < 5; i++) {//filas
		for (var j = 0; j < 3; j++) {//columnas
			var test = new Test(testX + 30 * j, testY  + 30* i, 10, "yellow");
			//test.move();
			test.dibuja();
		}		
	}
			
}


//-----------------------------------------------------------------------------------------------

//PLAYER1
function player1() {
    
    ctx.fillStyle = "#aa0000";
	ctx.fillRect(X, Y, DIAMETER, 30);
    
}

function movePlayer() {

	//Limites de movimiento
	if( X > canvas.width - DIAMETER) {X = canvas.width - DIAMETER;}
	else if( X < 0) {X = 0;}
	else if( Y > canvas.height - DIAMETER) {Y = canvas.height - DIAMETER;}
	else if ( Y < 0) {Y = 0;}

    //move
	//X = X + moveX;
	//Y = Y + moveY;
	if (tecla[teclaDerecha]) X += speed;
	if (tecla[teclaIzquierda]) X -= speed;
	if (tecla[teclaArriba]) Y += speed;
	if (tecla[teclaAbajo]) Y -= speed;
	
	//Verifica cañon
	//if (x > canvas.width - 20) x = canvas.width - 20;
	//if (x < 0) x = 0;
	//Disparo
	if (tecla[teclaEspacio]) {
		console.log("tecla espacio pulsada");
		/*
		if (tiempoBala == true && municion !=0 ){
			tiempoBala = false;
			balas_array.push(new Bala(nave.x + 12, nave.y - 3, 5));
			(municion >0)?municion = municion - 1 : false;
			tecla[teclaEspacio] = false;
			disparaEnemigo();
			setTimeout(function(){tiempoBala = true;}, 300);
		}
		*/
	}
	
}

document.addEventListener("keydown", function(e){
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
	/*
	var cod = e.keyCode;
	if(move){
			
		if(cod == 38){
			moveY = -1;
			//xdir = 0;
			//ejex = false;
			//ejey = true;
			//move = true;
		}
		if(cod == 40){
			moveY = 1;
			//xdir = 0;
			//ejex = false;
			//ejey = true;
		}
			
	}

	if(move){
		if(cod == 37){
			//ydir = 0;
			moveX = -1;
			//ejey = false;
			//ejex = true;
		}
		if(cod == 39){
			//ydir = 0;
			moveX = 1;
			//ejey = false;
			//ejex = true;
		}
	}
    
 */   
});
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
	//moveX = 0; moveY = 0;
});


function puntuacion() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("TEXTO" ,20,60);

	ctx.font = "30px Comic Sans MS";
	ctx.fillText("Hello World", 200, 50);
}


function borraCanvas() {
    ctx.clearRect(0,0, ancho, alto);
}


function animation(){
    borraCanvas();
    //cargaImagenes();
    dibujaBandera();
    dibujaFondo();
	dibujaBalon();
	test.dibuja();
	//test.move();
	moveTest();//Este es para el movimiento de cuadrados amarillos
	player1();
	movePlayer();
	//player2();
	puntuacion();
	//player.dibuja();//Rectangulo de prueba
	equipoBluePlayer();//Funcion de prueba
	equipoRedPlayer();//Funcion de prueba
	equipoTest();
    
    
    requestAnimationFrame(animation);
}

animation();