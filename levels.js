

function initLevel(level){
	return dynamic_levels(level);
}

var static_levels =  {
	"1" : {
		level:1,
		boxNumbers : 9,
		initTime : 1000,
		timedelta:-10,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target:3
	},
	"2" : {
		level:2,
		boxNumbers : 6,
		initTime : 1000,
		timedelta:-100,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target: 3
	},
	"3" : {
		level:3,
		boxNumbers : 3,
		initTime : 1000,
		timedelta:-1,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target: 3
	}
}

function dynamic_levels(level){
	var b = {start:1, random:20};
	var i = {start:1000, random:200};
	var td = {start:1, random:70};
	var t = {start:6}
	var box = b.start+Math.floor(b.random*Math.random());
	var initTime = i.start - Math.floor(i.random*Math.random());
	var timedelta = td.start + Math.floor(td.random*Math.random());
	var target = Math.floor(t.start*(1 + box/(b.start+b.random) + initTime/(i.start+i.random) - timedelta/(td.start+td.random)));
	//box+       target+
	//initTime+  target+
	//timedelta+ target-

	//ranges
	//box       | 1   |   21
	//initTime  | 800 |   1200
	//timedelta | -100  |   -1

	//min case	  	:  1  | 800   |  -100 -->  
	//max case		:  21 | 1200  |  -1   -->
	//best case 	:  1 | 1200  |  -1   -->
	//worst case  	:  21 | 800  |  -100   -->
	//median    	:  11 | 1000  |  -49  -->
	return {
		level:level+1,
		boxNumbers : box,
		initTime : initTime,
		timedelta: -1*timedelta,
		levelFunc: levelFunc,
		levelFuncRandom: levelFuncRandom,
		target:target
	};
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