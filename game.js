function Form()
{
	var body = 
	'<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<script>'+
'window.onload = function(){'+
'	(function(){'+
'		PrepareCanvases();'+
'		DrawShapes();'+
'		})();'+
'	};' +

'function Shape(type, color)'+
'{'+
'	this.type = type;'+
'	this.color = color;'+
'	this.getRandomShape = function()'+
'	{'+
'		return new Shape(getRandomArbitary(1,3), getRandomArbitary(1,3))'+
'	}'+
'	this.colorString = function()'+
'	{'+
'		if (color === 1)'+
'			return "#FF0000";'+
'		if (color === 2)'+
'			return "#00FF00";'+
'		if (color === 3)'+
'			return "#0000FF";'+
'	}'+
'}'+

'function getRandomArbitary(min, max)'+
'{'+
' 	return Math.random() * (max - min) + min;'+
'}'+

'function W()'+
'{'+
'	return 50;'+
'}'+

'function H()'+
'{'+
'	return 50;'+
'}'+

'function PrepareCanvases()'+
'{'+
'	PrepareCanvas(1, 1);'+
'	PrepareCanvas(1, 2);'+
'	PrepareCanvas(1, 3);'+
'	PrepareCanvas(2, 1);'+
'	PrepareCanvas(2, 2);'+
'	PrepareCanvas(2, 3);'+
'	PrepareCanvas(3, 1);'+
'	PrepareCanvas(3, 2);'+
'	PrepareCanvas(3, 3);'+
'}'+

'function PrepareCanvas(i, j)'+
'{'+
'	var canvas = document.getElementById("c"+i+j);'+
'//	canvas.style.position = "absolute";'+
'//	canvas.style.top = H()*j + "px";'+
'//	canvas.style.left = W()*i + "px";'+
'}'+

'function DrawShapes()'+
'{'+
'	DrawShape(1, 1);'+
'	DrawShape(1, 2);'+
'	DrawShape(1, 3);'+
'	DrawShape(2, 1);'+
'	DrawShape(2, 2);'+
'	DrawShape(2, 3);'+
'	DrawShape(3, 1);'+
'	DrawShape(3, 2);'+
'	DrawShape(3, 3);'+
'}'+

'function DrawShape(i, j)'+
'{'+
'	var shape = new Shape(i,j);'+
'	var main = document.getElementById("mainCanvas");'+
'	var context = main.getContext("2d");'+
'	var centerX = main.width / 2;'+
'	var centerY = main.height / 2;'+
	
'	//внешний круг'+
'	var radius = 10;'+
'	context.beginPath();'+

'	if (color === 1)'+
'		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);'+
'	if (color === 2)'+
'		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);'+
'	if (color === 3)'+
'		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);'+

'	context.fillStyle = shape.colorString();'+
'	context.fill();'+
'	context.lineWidth = 1;'+
'	context.stroke();'+
'}'+
	'</script>' +
	'<table>' +
	'  <tr>' +
	'    <td onclick="sendChoise(1,1)" width = "W()" height="H()"><canvas id = "c11" width="W()" height="H()"></canvas></td>' +
	'    <td onclick="sendChoise(1,2)" width = "W()" height="H()"><canvas id = "c12" width="W()" height="H()"></canvas></td>' +
	'    <td onclick="sendChoise(1,3)" width = "W()" height="H()"><canvas id = "c13" width="W()" height="H()"></canvas></td>' +
	'  </tr>' +
	'  <tr>' +
	'    <td onclick="sendChoise(2,1)" width = "W()" height="H()"><canvas id = "c21" width="W()" height="H()"></canvas></td>' +
	'    <td onclick="sendChoise(2,2)" width = "W()" height="H()"><canvas id = "c22" width="W()" height="H()"></canvas></td>' +
	'    <td onclick="sendChoise(2,3)" width = "W()" height="H()"><canvas id = "c23" width="W()" height="H()"></canvas></td>' +
	'  </tr>' +
	'  <tr>' +
	'    <td onclick="sendChoise(3,1)" width = "W()" height="H()"><canvas id = "c31" width="W()" height="H()"></canvas></td>' +
	'    <td onclick="sendChoise(3,2)" width = "W()" height="H()"><canvas id = "c32" width="W()" height="H()"></canvas></td>' +
	'    <td onclick="sendChoise(3,3)" width = "W()" height="H()"><canvas id = "c33" width="W()" height="H()"></canvas></td>' +
	'  </tr>' +
	'</table>' +
	'</body>'+
	'</html>';

	return body;
}


exports.form = Form;