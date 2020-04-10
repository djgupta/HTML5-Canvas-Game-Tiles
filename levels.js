

function initLevel(level){
	return getLevel(level);
}


function getLevel(level){
	return levels[level];
}

var levels =  {
	"1" : {
		boxNumbers : 9,
		frequency : 1000,
		timedelta:-10,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target: 100
	},
	"2" : {
		boxNumbers : 6,
		frequency : 1000,
		timedelta:-100,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target: 100
	},
	"3" : {
		boxNumbers : 3,
		frequency : 1000,
		timedelta:-1,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target: 100
	}
}

function leveller(i){
	var func = levelFunc;
	console.log(func);
	return func;
}

function levelFuncRandom(input, additional = null){
	context.globalAlpha = 1;
	context.beginPath();		
	context.fillStyle = "black";//'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
	context.rect(input.x, input.y, input.length, input.length);
	context.stroke();
	context.fill();
	context.closePath();
}

function levelFunc(input, additional = null){
	context.globalAlpha = 0.3;
	context.beginPath();		
	context.fillStyle = "blue";//'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
	context.rect(input.x, input.y, input.length, input.length);
	context.stroke();
	context.fill();
	context.closePath();
}