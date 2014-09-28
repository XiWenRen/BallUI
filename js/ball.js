var ballCanvas = document.getElementById("ballUI");
var ballCtx = ballCanvas.getContext("2d");
//圆的半径
var seed = (radius * 2) / (25 * 60);
initBall();
var usedLength = 0;
var totalSecends = 1;
//传入参数要修改，计算方法为开始时间-当前时间 *速度
//var drarTread = setInterval('drawCenterLine(usedLength += seed)',10);
drawRainBowGradient();
var drawThread = setInterval('drawRoundLine(totalSecends++)', 50);
//画一条相对于圆垂直或者水平的直线，把圆分隔成两个部分
function drawCenterLine(usedLength) {
	ballCtx.clearRect(0, 0, radius * 2, radius * 2);

	//分割线的长度，以x轴为界分为两半
	var drawHalfLength = getVerLineOfRightTriangle(usedLength);
	//画出分割线
	ballCtx.beginPath();
	ballCtx.moveTo(usedLength, radius - drawHalfLength);
	ballCtx.lineTo(usedLength, radius + drawHalfLength);
	ballCtx.closePath();
	ballCtx.stroke();
	//左侧填色
	//	ballCtx.fillStyle = 'rgba(255, 0, 0, 1)';
	//	ballCtx.fillRect(0,0,usedLength,radius * 2);
	//右侧填色
	ballCtx.fillStyle = "rgba(0, 255, 0, 1)";
	ballCtx.fillRect(usedLength, 0, radius * 2 - usedLength, radius * 2);

	//绘制渐变
	var startRadioX = Math.abs(usedLength - (radius * 2)) > 1 ? usedLength : radius;
	//	console.log(startRadioX)
	var radial = ballCtx.createRadialGradient(startRadioX, radius, 0, radius, radius, radius);
	radial.addColorStop(0, 'rgba(255,255,255,0.6)');
	radial.addColorStop(1, 'rgba(80,80,80,0.4)');
	ballCtx.fillStyle = radial;
	ballCtx.fillRect(0, 0, radius * 2, radius * 2);
	ballCtx.stroke();

	radial = ballCtx.createRadialGradient(radius, radius, 75, radius, radius, radius);
	radial.addColorStop(0, 'rgba(120,120,120,0.2)');
	radial.addColorStop(1, 'rgba(80,80,80,0.4)');
	ballCtx.fillStyle = radial;
	ballCtx.fillRect(0, 0, radius * 2, radius * 2);
	ballCtx.stroke();

	//显示时间
	ballCtx.fillText(exchangeSecToMin(totalSecends++), radius, radius);

	//如果到达圆的最右侧，则停止
	if (usedLength >= radius * 2) {
		window.clearInterval(drarTread);
		usedLength = 0;
		totalSecends = 0;
	}
}

function drawRainBowGradient() {
	var radial = ballCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
	for (var i = 0; i < roundCount; i++) {
		var rgb = getColorByHoop(i);
		radial.addColorStop(i / roundCount, 'rgba(' + rgb + ',0.5)')
	}
	ballCtx.fillStyle = radial;
	ballCtx.fillRect(0, 0, radius * 2, radius * 2);
	ballCtx.stroke();
}

//开始画进度线
var point1 = new Point(0, 0);

function drawRoundLine(i) {
	//获取当前要画的点
	var point2 = point1.getCoor(i);
	//获得当前的圈数
	var hoop = parseInt(i / 200);
	//通过圈数获得当前应该画的颜色
	var rgb = getColorByHoop(hoop);
	ballCtx.fillStyle = 'rgba(' + rgb + ',0.1)';
	ballCtx.beginPath();
	//画点
	ballCtx.arc(point2.x, point2.y, unitWidth / 2, 0, Math.PI * 2, true);
	ballCtx.closePath();
	ballCtx.fill();
	if (i % 200 == 0) {
		//第一圈的时候，圈的直径是0
		drawRound(hoop);
	}
	//停止动画
	if (hoop == roundCount) {
		window.clearInterval(drawThread);
	}
}

//每次画完一圈之后，固定闪出一个圈的特效
function drawRound(hoop) {
	console.log(hoop);
	var theRound = document.createElement("div");
	theRound.setAttribute("id", "id" + hoop);
	theRound.setAttribute("class", "round");
	//圈的直径 计算方式为 当前圆的半径 * 2，就是整个div的宽度
	var roundDaimeter = unitWidth * hoop * 2;
	theRound.style.width = roundDaimeter + "px";
	theRound.style.height = roundDaimeter + "px";
	//圈的定位 计算方式为 当前圆的半径 - 线宽
	theRound.style.top = radius - roundDaimeter / 2 - 1 + "px";
	theRound.style.left = radius - roundDaimeter / 2 - 1 + "px";
	var unit1 = document.getElementById("unit1");
	unit1.appendChild(theRound);
	var a = document.getElementById("id" + hoop);
}

//定义圆的直径，也就是canvas的宽高
function initBall() {
	ballCanvas.width = radius * 2;
	ballCanvas.height = radius * 2;
}

//获得直角三角形的一条直角边
function getVerLineOfRightTriangle(usedLength) {
	var line = Math.abs(usedLength - radius);
	return Math.sqrt((radius * radius) - (line * line));
}

//根据把秒转换成分钟
function exchangeSecToMin(seconds) {
	var min = parseInt(seconds / 60);
	var sec = parseInt(seconds % 60);
	return fillBit(min) + ":" + fillBit(sec);
}

//把1位数字补成2位
function fillBit(num) {
	if (num / 10 < 1) {
		num = "0" + num;
	}
	return num;
}

/**
 * 获取当前圈的颜色
 * 在这个圆中共有7圈，彩虹色
 */
function getColorByHoop(hoop) {
	//	赤色 【RGB】255, 0, 0 【CMYK】 0, 100, 100, 0 
	//	橙色 【RGB】 255, 165, 0 【CMYK】0, 35, 100, 0 
	//	黄色 【RGB】255, 255, 0 【CMYK】0, 0, 100, 0
	//	绿色 【RGB】0, 255, 0 【CMYK】100, 0, 100, 0 
	//	青色 【RGB】0, 127, 255 【CMYK】100, 50, 0, 0 
	//	蓝色 【RGB】0, 0, 255 【CMYK】100, 100, 0, 0 
	//	紫色 【RGB】139, 0, 255 【CMYK】45, 100, 0, 0
	var rgb;
	switch (hoop) {
		case 0:
			rgb = "255,0,0";
			break;
		case 1:
			rgb = "255,165,0";
			break;
		case 2:
			rgb = "255,255,0";
			break;
		case 3:
			rgb = "0,255,0";
			break;
		case 4:
			rgb = "0,127,255";
			break;
		case 5:
			rgb = "0,0,255";
			break;
		case 6:
			rgb = "139,0,255";
			break;
		default:
			rgb = "255,255,255";
			break;
	}
	return rgb;
}