var play = document.getElementById('play');
var score = document.getElementById('score');
var canvas = document.getElementById('canvas');
var message = document.getElementById('message');

var ratio = window.devicePixelRatio || 1;
var w = window.innerWidth;
var h = window.innerHeight - 50;
canvas.width = w;
canvas.height = h;
var context = canvas.getContext('2d');
var state = {};

function main(){
	state = init();
	create_grid(context, state.boxNumbers, 0, 0, getSize(state.boxNumbers, w, h));
}

function init(){
	play.value = "play";
	return {
		boxNumbers : 9,
		time : 1000	,
		timedelta:-1,
		rects:[],
		random : null,
		playing : false,
		timer : null,
		score:0,
		gameOn:false,
		gameOver:false
	};
}

function getSize(boxNumbers, width, height){
	var size;
	if(parseInt(width/(boxNumbers+1)) < parseInt(height/(boxNumbers+1))){
		size = parseInt(width/(boxNumbers+1));
	}
	else{
		size = parseInt(height/(boxNumbers+1));
	}
	return size;
}

function rectangle(context,a, b, size){
	this.context = context;
	this.a = a;
	this.b = b;
	this.create = function(){
		context.globalAlpha = 0.3;
		context.beginPath();		
		context.fillStyle = "black";//'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
		context.rect(a,b,size,size);
		context.stroke();
		context.fill();
		context.closePath();
	}
}

function create_grid(context, boxNumbers, a, b, size){
	context.clearRect(0,0,canvas.width, canvas.height);
	for(var i=0;i<boxNumbers;i++){
		for(var j=0;j<boxNumbers;j++){
			var object = new rectangle(context,a,b, size);
			object.create();
			state.rects.push(object);
			a+=size;
		}
		a=0;
		b+=size;
	}
};

function windowToCanvas(x,y, width, height){
	var bbox = canvas.getBoundingClientRect();
	return { x:x - bbox.left*(width/bbox.width),
				y:y - bbox.top*(height/bbox.height)
	};
}

canvas.onmousedown = function(e){
	if(state.gameOn){
		var loc = windowToCanvas(e.clientX, e.clientY, canvas.width, canvas.height)
		context.clearRect(0,0,canvas.width, canvas.height);
		for(var i=0; i<state.rects.length;i++){
			state.rects[i].create();
			if(state.rects[i].context.isPointInPath(loc.x, loc.y)){
				if(i==state.random){
					context.globalAlpha = 0.3;
					state.playing = true;
					state.score++;
					score.innerHTML = 'Score: ' + state.score;
					window.clearInterval(state.timer);
					state.time = state.time + state.timedelta;
					state.timer = window.setInterval(gameon, state.time);
				}
				else{
					state.gameOver = true;
				}
			}
		}
		state.gameOn = false;
		if(state.playing){
			gameon();
		}
		if(state.gameOver){
			gameOver();
		}
	}
};

function gameOver(){
	window.clearInterval(state.timer);
	message.innerHTML = "Game over!";
	window.setTimeout(function() {message.innerHTML='';},2000);
	main();
}

play.onclick = function(e){
	if(play.value == "play"){
		score.innerHTML = "Score: 0";
		play.value = "New Game";
		state.playing = true;
		state.timer = window.setInterval(gameon, state.time);
	}
	else{
		play.value = "play";
		window.clearInterval(state.timer);
		main();
	}
}

function gameon(){
	if(state.playing){
		state.gameOn = true;
		state.random = Math.floor(state.boxNumbers*state.boxNumbers*Math.random());
		context.globalAlpha = 1;
		state.rects[state.random].create();
		context.globalAlpha = 0.3;
		state.playing = false;
	}
	else{
		gameOver();
	}
}

main();