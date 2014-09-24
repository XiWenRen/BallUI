
var ballCanvas = document.getElementById("ballUI");
var ballCtx = ballCanvas.getContext("2d");
//圆的半径
var radius = 100;
var seed = (radius * 2) / (25 * 60);
initBall();
var usedLength = 0;
var totalSecends = 1;
//传入参数要修改，计算方法为开始时间-当前时间 *速度
//var drarTread = setInterval('drawCenterLine(usedLength += seed)',10);
drawRainBowGradient();
setInterval('calCoordinate(totalSecends++)',50);
//画一条相对于圆垂直或者水平的直线，把圆分隔成两个部分
function drawCenterLine(usedLength) {
	ballCtx.clearRect(0,0,radius * 2,radius * 2);
	
	//分割线的长度，以x轴为界分为两半
	var drawHalfLength = getVerLineOfRightTriangle(usedLength);
	//画出分割线
	ballCtx.beginPath();
	ballCtx.moveTo(usedLength,radius - drawHalfLength);
	ballCtx.lineTo(usedLength,radius + drawHalfLength);
	ballCtx.closePath();
	ballCtx.stroke();
	//左侧填色
//	ballCtx.fillStyle = 'rgba(255, 0, 0, 1)';
//	ballCtx.fillRect(0,0,usedLength,radius * 2);
	//右侧填色
	ballCtx.fillStyle = "rgba(0, 255, 0, 1)";
	ballCtx.fillRect(usedLength,0,radius * 2 - usedLength,radius * 2);
	
	//绘制渐变
	var startRadioX = Math.abs(usedLength - (radius * 2)) > 1 ? usedLength : radius;
//	console.log(startRadioX)
	var radial = ballCtx.createRadialGradient(startRadioX,radius,0,radius,radius,radius);
	radial.addColorStop(0,'rgba(255,255,255,0.6)');
	radial.addColorStop(1,'rgba(80,80,80,0.4)');
	ballCtx.fillStyle = radial;
	ballCtx.fillRect(0,0,radius * 2,radius * 2);
	ballCtx.stroke();
	
	radial = ballCtx.createRadialGradient(radius,radius,75,radius,radius,radius);
	radial.addColorStop(0,'rgba(120,120,120,0.2)');
	radial.addColorStop(1,'rgba(80,80,80,0.4)');
	ballCtx.fillStyle = radial;
	ballCtx.fillRect(0,0,radius * 2,radius * 2);
	ballCtx.stroke();
	
	//显示时间
	ballCtx.fillText(exchangeSecToMin(totalSecends++),radius,radius);
	
	//如果到达圆的最右侧，则停止
	if(usedLength >= radius * 2){
		window.clearInterval(drarTread);
		usedLength = 0;
		totalSecends = 0;
	}
}

function drawRainBowGradient(){
	var radial = ballCtx.createRadialGradient(radius,radius,0,radius,radius,radius);
	/*
	 * 赤色 【RGB】255, 0, 0 【CMYK】 0, 100, 100, 0 
		橙色 【RGB】 255, 165, 0 【CMYK】0, 35, 100, 0 
		黄色 【RGB】255, 255, 0 【CMYK】0, 0, 100, 0
		绿色  【RGB】0, 255, 0 【CMYK】100, 0, 100, 0 
		青色  【RGB】0, 127, 255 【CMYK】100, 50, 0, 0 
		蓝色  【RGB】0, 0, 255 【CMYK】100, 100, 0, 0 
		紫色  【RGB】139, 0, 255 【CMYK】45, 100, 0, 0
	 */
	radial.addColorStop(0,'rgba(255, 0, 0,0.3)');
	radial.addColorStop(0.1667,'rgba(255, 165, 0,0.3)');
	radial.addColorStop(0.3334,'rgba(255, 255, 0,0.53');
	radial.addColorStop(0.5001,'rgba(0,255,0,0.3)');
	radial.addColorStop(0.6668,'rgba(0, 127, 255,0.3)');
	radial.addColorStop(0.8335,'rgba(0, 0, 255,0.3)');
	radial.addColorStop(1,'rgba(139, 0, 255,0.3	)');
	ballCtx.fillStyle = radial;
	ballCtx.fillRect(0,0,radius * 2,radius * 2);
	ballCtx.stroke();
}

function drawRoundLine(){
	ballCtx.lineWidth = 0.1667 * radius;
}

//需要计算员周的坐标
//1.获得转完一圈的总时间
//2.就可以计算出单位时间内转的角度
//3.每次计算出当前的角度
var oldX = radius;
var oldY = radius;
function calCoordinate(i){
	ballCtx.lineWidth = 0.1667 * radius;
	var perimeter = 2 * Math.PI * radius;
	var unitTime = 50;
	//50毫秒计算一次，10s画一圈，那么总时间应该是10 * 1000 / 50; 
	var totalTime = 10 * 1000 / unitTime;
	//单位时间内转过的角度
	var unitAngle = 360 / totalTime;
	
	var x = Math.cos(2 * Math.PI / 360 * unitAngle * i) * 50 + radius;
	var y = Math.sin(2 * Math.PI / 360 * unitAngle * i) * 50 + radius;
	ballCtx.moveTo(oldX,oldY);
	ballCtx.lineTo(x,y);
	console.log(x)
	oldX = x;
	oldY = y;
}

//定义圆的直径，也就是canvas的宽高
function initBall(){
	ballCanvas.width = radius * 2;
	ballCanvas.height = radius * 2;
}

//获得直角三角形的一条直角边
function getVerLineOfRightTriangle(usedLength){
	var line = Math.abs(usedLength - radius);
	return Math.sqrt((radius * radius) - (line * line));
}

//根据把秒转换成分钟
function exchangeSecToMin(seconds){
	var min = parseInt(seconds / 60);
	var sec = parseInt(seconds % 60);
	return fillBit(min) + ":" + fillBit(sec);
}

//把1位数字补成2位
function fillBit(num){
	if(num / 10 < 1){
		num = "0" + num;
	}
	return num;
}
