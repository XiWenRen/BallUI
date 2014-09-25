
var radius = 100;
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
	//当前画的圆的半径
	var drawRadius = (0.1667 * radius * hoop - 0.1667*radius / 2).toFixed(4);
	//计算x,y的坐标
	this.x = (Math.cos(2 * Math.PI / 360 * unitAngle * i) * drawRadius + radius).toFixed(4);
	this.y = (Math.sin(2 * Math.PI / 360 * unitAngle * i) * drawRadius + radius).toFixed(4);
	return new Point(this.x,this.y);
}

