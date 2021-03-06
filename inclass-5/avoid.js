
//Is shift being pressed?
var shiftPressed = false;

//Is the button in run-mode?
var running = true;

//Is the button currently moving?
var moving = false;

window.onLoad = function(){

}

function buttonPress(){
	if(running){
		document.getElementById('runner').innerHTML="Play Again?";
		document.getElementById('congrats').style.display='inline';
		document.getElementById('border').style.display='inline';
	}else{
		document.getElementById('runner').innerHTML = "Click Me!";
		document.getElementById('congrats').style.display='none';
		document.getElementById('border').style.display='none';

	}
	running = !running;
}

document.onkeydown = function(event) {
	if (event.which === 16) {
		shiftPressed = true;
	}
}; 

document.onkeyup = function(event) {
	if (event.which === 16) {
		shiftPressed = false;
	}
}; 

document.onmousemove = function(event) {
	if(!shiftPressed && running && !moving){
		var mX = event.clientX;
		var mY = event.clientY;

		var bX = document.getElementById('runner').offsetLeft;
		var bY = document.getElementById('runner').offsetTop;
		
		//Check if mouse is close enough to the button.
		if(Math.pow(mX-bX, 2) + Math.pow(mY-bY, 2) < 20000){
			moving = true;
			var newX = 200+Math.random() * (window.screen.availWidth-400);
			var newY = 200+Math.random() * (window.screen.availHeight-400);
			var timer = 1;
			
			//cause button to move to randomly generated location.
			var movement = setInterval(function(){
				if(timer>=60){
					moving = false;
					clearInterval(movement);
				}else{
					document.getElementById('runner').style.left = (bX+(newX-bX)*timer/60)+'px';
					document.getElementById('runner').style.top = (bY+(newY-bY)*timer/60)+'px';
					timer++;
				}
			}, 3);
		}
	}
}; 
