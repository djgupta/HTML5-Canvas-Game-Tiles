
var play = document.getElementById('play');
var score = document.getElementById('score');
var canvas = document.getElementById('canvas');
var message = document.getElementById('message');
var levelId = document.getElementById('level');

var ratio = window.devicePixelRatio || 1;
var w = window.innerWidth;
var h = window.innerHeight - 0.2*window.innerHeight;
canvas.width = w;
canvas.height = h;
var context = canvas.getContext('2d');

var user = {};
var game = {};
var level = {};
var state = {};
var winner = false;

function main(){
	user = initUser();
	game = initGame(user);
	starter(game);
}

function initUser(){
	return null;
}

function initGame(user){
	return {
		level: 1
	}
}

function starter(game){
	level = initLevel(game.level);
	if(level == undefined){
		displayMessage("Thanks for playing! :)")
		return;
	}
	else{
		state = initState(level);
		generateNumbers(state);
		create_grid(context, level.boxNumbers, 0, 0, getSize(level.boxNumbers, w, h), level.levelFunc);
	}
	if(winner){
		gameStart();
	}
}


function initState(level){
	play.value = "play";
	return {
		rects:[],
		random : null,
		playing : false,
		timer : null,
		score:0,
		gameOn:false,
		gameOver:false,
		target: level.target,
		level:level.level,
	};
}

function generateNumbers(state){
	levelId.innerHTML = 'Level: ' + state.level;
	score.innerHTML = 'Score: ' + state.score;
	target.innerHTML = 'Target: ' + state.target;
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

class rectangle {
	constructor(context, a, b, size, levelFunc) {
		this.context = context;
		this.a = a;
		this.b = b;
		this.levelFunc = levelFunc;
		this.create = function () {
			var input = {x:a, y:b, length: size};
			this.levelFunc(input);
		};
	}
}

function create_grid(context, boxNumbers, a, b, size, levelFunc){
	context.clearRect(0,0,canvas.width, canvas.height);
	for(var i=0;i<boxNumbers;i++){
		for(var j=0;j<boxNumbers;j++){
			var object = new rectangle(context, a, b, size, levelFunc);
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
		//TODO: better logic to find the clicked rectangle
		for(var i=0; i<state.rects.length;i++){
			state.rects[i].create();
			if(state.rects[i].context.isPointInPath(loc.x, loc.y)){
				if(i==state.random){
					state.playing = true;
					state.score++;
					if(state.score==state.target){
						game.level++
						window.clearInterval(state.timer);
						winner = true;
						starter(game);
						break;
					}
					window.clearInterval(state.timer);
					generateNumbers(state);
					level.initTime = level.initTime + level.timedelta;
					state.timer = window.setInterval(gameon, level.initTime);
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
			gameOver('wrong tile!');
		}
	}
};

function gameOver(reason){
	winner = false;
	window.clearInterval(state.timer);
	displayMessage(reason);
	starter(game);
}

function displayMessage(msg){
	message.innerHTML = msg;
	window.setTimeout(function() {message.innerHTML='';},4000);
}

play.onclick = function(e){
	if(play.value == "play"){
		gameStart();
	}
	else{
		play.value = "play";
		window.clearInterval(state.timer);
		starter(game);
	}
}

function gameStart(){
	score.innerHTML = "Score: 0";
	play.value = "New Game";
	state.playing = true;
	state.timer = window.setInterval(gameon, level.initTime);
}

function gameon(){
	if(state.playing){
		state.gameOn = true;
		state.random = Math.floor(level.boxNumbers*level.boxNumbers*Math.random());
		state.rects[state.random].levelFunc = level.levelFuncRandom
		state.rects[state.random].create();
		state.rects[state.random].levelFunc = level.levelFunc
		state.playing = false;
	}
	else{
		gameOver("too slow!");
	}
}
main();