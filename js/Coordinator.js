//基础参数都写在这里
var radius = 100;
//总的圈数
var roundCount = 7;
//由于填满颜色，每圈的宽度与线宽是相同的
var unitWidth = (radius / roundCount);

function Point(_x,_y){
	this.x = _x | 0;
	this.y = _y | 0;
}

Point.prototype.getCoor = function(i){
	var unitTime = 50;
	//50毫秒计算一次，10s画一圈，那么总时间应该是10 * 1000 / 50; 
	var totalTime = 10 * 1000 / unitTime;
	//单位时间内转过的角度
	var unitAngle = 360 / totalTime;
	//计算当前是第几圈，如果不转换成int，那么会画出漩涡
	var hoop = parseInt(i / totalTime) + 1;
	//当前画的圆的半径，计算方式为：每圈宽度 * 当前圈数 - 线宽 / 2
	var drawRadius = (radius / roundCount * hoop - unitWidth / 2);
	//计算x,y的坐标
	this.x = (Math.cos(2 * Math.PI / 360 * unitAngle * i) * drawRadius + radius);
	this.y = (Math.sin(2 * Math.PI / 360 * unitAngle * i) * drawRadius + radius);
	return new Point(this.x,this.y);
}

