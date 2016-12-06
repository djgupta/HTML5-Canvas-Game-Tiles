var play = document.getElementById('play');
var score = document.getElementById('score');
var canvas = document.getElementById('canvas');

var ratio = window.devicePixelRatio || 1;
var w = window.innerWidth;
var h = window.innerHeight - 50;
canvas.width = w;
canvas.height = h;
var context = canvas.getContext('2d');
main();

function main(){
	var a=0;
	var b=0;
	rects = [];
	box = 9;
	if(parseInt(w/(box+1)) < parseInt(h/(box+1))){
		size = parseInt(w/(box+1));
	}
	else{
		size = parseInt(h/(box+1));
	}
	scores = 0;

	score.innerHTML = "Score: " + scores;
	play.value = "play";
	playValue = true;
	gameOn = false;
	conti = false;
	gameOver = false;
	timer = null;
	time = 1000;

	context.clearRect(0,0,canvas.width, canvas.height);

	for(var i=0;i<box;i++){
		for(var j=0;j<box;j++){
			var object = new rectangle(context,a,b);
			object.create();
			rects.push(object);
			a+=size;
		}
		a=0;
		b+=size;
	}
}

function rectangle(context,a,b){
	this.context = context;
	this.a = a;
	this.b = b;
	this.context.globalAlpha = 0.3;
	this.create = function(){
		context.beginPath();		
		context.fillStyle = "black";//'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
		context.rect(a,b,size,size);
		context.stroke();
		context.fill();
		context.closePath();
	}
}

function windowToCanvas(x,y){
		var bbox = canvas.getBoundingClientRect();
		return { x:x - bbox.left*(canvas.width/bbox.width),
				 y:y - bbox.top*(canvas.height/bbox.height)
		};
}

canvas.onmousedown = function(e){
	if(gameOn){
		var loc = windowToCanvas(e.clientX, e.clientY);
		context.clearRect(0,0,canvas.width, canvas.height);
		for(var i=0; i<rects.length;i++){
			rects[i].create();
			if(rects[i].context.isPointInPath(loc.x, loc.y)){
				if(i==random){
					context.globalAlpha = 0.3;
					context.shadowBlur = null;
					conti = true;
					scores++;
					score.innerHTML = 'Score: ' + scores;
					window.clearInterval(timer);
					time = time - 10;
					timer = window.setInterval(gameon, time);

				}
				else{
					context.globalAlpha = 1;
					rects[random].create();
					context.globalAlpha = 0.3;
					gameOver = true;
				}
			}
		}
		gameOn = false;
		if(conti){
			gameon();
		}
		if(gameOver){
			window.clearInterval(timer);
			alert("gameover");
			main();

		}
	}
};

play.onclick = function(e){
	if(playValue){
		play.value = "New Game";
		playValue = false;
		conti = true;
		timer = window.setInterval(gameon, time);
	}
	else{
		play.value = "play";
		playValue = true;
		window.clearInterval(timer);
		main();
	}
}

function gameon(){
	if(conti){
		gameOn = true;
		random = Math.floor(box*box*Math.random());
		context.globalAlpha = 1;
		rects[random].create();
		context.globalAlpha = 0.3;
		conti = false;
	}
	else{
		window.clearInterval(timer);
		alert("gameover");
		main();
	}
}
