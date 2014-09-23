
var ballCanvas = document.getElementById("ballUI");
var ballCtx = ballCanvas.getContext("2d");
//圆的半径
var radius = 100;
var seed = (radius * 2) / (25 * 60);
initBall();
var usedLength = 0;
var totalSecends = 0;
//传入参数要修改，计算方法为开始时间-当前时间 *速度
var drarTread = setInterval('drawCenterLine(usedLength += seed)',10);

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
