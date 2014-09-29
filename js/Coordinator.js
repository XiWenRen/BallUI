//基础参数都写在这里
var radius = 100;
//总的圈数
var roundCount = 7;
//由于填满颜色，每圈的宽度与线宽是相同的
var unitWidth = (radius / roundCount);

function Point(_x,_y,_hoop){
	this.x = _x | 0;
	this.y = _y | 0;
	this.hoop = _hoop | 1;
}

Point.prototype.isHoopAdded = false;

Point.prototype.getCoor = function(i){
	isHoopAdded = false;
	var unitTime = 50;
	//计算得出，7圈的总长度
	var totalCir = radius * Math.PI * 7;
	//50毫秒计算一次，走完7圈是25分钟，25*60s，25*60*200次
	var totalTime = 60 * 1000 / unitTime;
	//当前画的圆的半径，计算方式为：每圈宽度 * 当前圈数 - 线宽 / 2
	var drawRadius = (radius / roundCount * this.hoop - unitWidth / 2);
	//本圈时间
	var currTime =  (Math.PI * 2 * drawRadius / totalCir) * totalTime;
	//单位时间内转过的角度 = 360 / 本圈时间
	var unitAngle = 360 / currTime;
	//计算当前是第几圈，如果不转换成int，那么会画出漩涡

	var lastTime = (Math.PI * 2 * (radius / roundCount * (this.hoop - 1) - unitWidth / 2) / totalCir) * totalTime;
	var angleCount = i - lastTime;
	
	if(i == parseInt(currTime)){
		this.hoop ++;
		console.log(this.hoop);
		isHoopAdded = true;
	}

	//计算x,y的坐标
	this.x = (Math.cos(2 * Math.PI / 360 * unitAngle * angleCount) * drawRadius + radius);
	this.y = (Math.sin(2 * Math.PI / 360 * unitAngle * angleCount) * drawRadius + radius);
	return new Point(this.x,this.y,this.hoop);
}

