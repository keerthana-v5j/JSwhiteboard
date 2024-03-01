//declare all state variables here
const console = document.getElementById("console");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let typeMode = false;
let drawMode = true;
let eraseMode = false;
let shapeMode = false;

let color = 'black';
let lineThickness = 2;
//var shape = 'circle';

let lastX = 0;
let lastY = 0;

let typeX = 0;
let typeY = 0;

let mouseIsDown = false;

//set number of milliseconds between calls to step
start(10);

function setup()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, window.outerWidth - 20, window.outerHeight - 150);
}

function step()
{
	clear();

	if (typeMode === true)
	{
		print ("Type mode ("+color+") is active");
		clearModes();
		typeMode = true;
	}

	else if (drawMode === true)
	{
		print ("Draw mode ("+color+") is active");
		clearModes();
		drawMode = true;
	}

	else if (shapeMode === true)
	{
		print ("Shape mode ("+color+") is active");
		clearModes();
		shapeMode = true;
	}

	else if (eraseMode === true)
	{
		print ("Erase mode is active");
		clearModes();
		eraseMode = true;
	}
}


function mouseDown(x, y)
{
	mouseIsDown = true;

	if (drawMode === true)
	{
		lastX = x;
		lastY = y;
		ctx.beginPath();
		ctx.strokeStyle = color;
	}

	if (typeMode === true)
	{
		typeX = x;
		typeY = y+7;

		var userText = prompt ("Type Here");
		if (userText === ""){userText = " ";}

		ctx.fillStyle = color;
		ctx.font = "18px Arial";
		ctx.fillText(userText,typeX,typeY);

		clearModes();
		mouseIsDown = false;
		drawMode = true;
	}

	if (eraseMode === true)
	{
		ctx.beginPath();
		ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();

		ctx.closePath();
}
}

function mouseUp(x, y)
{
	mouseIsDown = false;

	//Draw
	lastX = 0;
	lastY = 0;

	ctx.closePath();
}

function mouseMove(x, y)
{
	if (x === 0 || y === 0)
	{
		lastX = 0;
		lastY = 0;
		mouseIsDown = false;
	}
	if (lastX === 0 && lastY === 0)
	{
		lastX = x;
		lastY = y;
	}

	if (drawMode === true && mouseIsDown === false)
	{
		lastX = 0;
		lastY = 0;
	}

	else if (drawMode === true && mouseIsDown === true)
	{
		ctx.strokeStyle = color;
		ctx.lineWidth = lineThickness;

		ctx.moveTo(lastX,lastY);
		ctx.lineTo(x,y);
		ctx.stroke();
		lastX = x;
		lastY = y;
	}


	if (eraseMode === true && mouseIsDown ===true)
	{
		ctx.beginPath();
		ctx.arc(x, y, 40, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.closePath();
	}
}

function keyDown(key)
{
	clear();

	if (key === 84)
	{
		clearModes();
		typeMode = true;
	}
}

function keyUp(key)
{
}

function clearModes()
{
	typeMode = false;
	drawMode = false;
	eraseMode = false;
	shapeMode = false;
}

function setLineThickness(meow)
{
	lineThickness = meow;
}


document.getElementById("clearButton").onclick = () => {
	var clearDescision = prompt("Are you sure you want to clear all work? (Answer 'yes' to clear)");
	if (clearDescision === "yes" || "Yes"){
    ctx.fillStyle = "white";
	  ctx.fillRect(0, 0, window.outerWidth - 20, window.outerHeight - 150);
  }
};

document.getElementById("drawButton").onclick = () => {
	clearModes();
	drawMode = true;
};
document.getElementById("makeBlack").onclick = () => {
	color = 'black';
	clearModes();
	drawMode = true;
};
document.getElementById("makeRed").onclick = () => {
	color = 'red';
	clearModes();
	drawMode = true;
};
document.getElementById("makeOrange").onclick = () => {
	color = 'orange';
	clearModes();
	drawMode = true;
};
document.getElementById("makeYellow").onclick = () => {
	color = 'yellow';
	clearModes();
	drawMode = true;
};
document.getElementById("makeGreen").onclick = () => {
	color = 'green';
	clearModes();
	drawMode = true;
};
document.getElementById("makeBlue").onclick = () => {
	color = 'blue';
	clearModes();
	drawMode = true;
};
document.getElementById("makePurple").onclick = () => {
	color = 'purple';
	clearModes();
	drawMode = true;
};

//Utils--------
function loadImage(fileName)
{
	imagesToLoad = imagesToLoad + 1;
	var image = new Image();
	image.src = fileName;
	image.onload = imageLoaded;
	return image;
}

function start(milliseconds)
{
	frameRate = milliseconds;
	maybeStart();
}

function imageLoaded()
{
	imagesToLoad = imagesToLoad - 1;
	maybeStart();
}

function maybeStart()
{
	if (imagesToLoad > 0)
	{
		return;
	}
	setup();
	step();
	setInterval(step, frameRate);
}

function print(text)
{
	console.innerHTML = console.innerHTML + text + "<br/>\n";
}

function clear()
{
	console.innerHTML = "";
}

function eventPosition(event)
{
	var x;
    var y;
    if (event.x !== undefined && event.y !== undefined)
    {
    	x = event.x;
    	y = event.y;
    }
	else // Firefox method to get the position
    {
    	x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
        	document.documentElement.scrollTop;
    }
    x = x - canvas.offsetLeft;
    y = y - canvas.offsetTop;
    return {x:x, y:y};
}

function touchMoveEvent(event)
{
	var pos = eventPosition(event);
    fingerMove(pos.x, pos.y);
}

function mouseDownEvent(event)
{
	var pos = eventPosition(event);
    mouseDown(pos.x, pos.y);
}

function mouseMoveEvent(event)
{
	var pos = eventPosition(event);
    mouseMove(pos.x, pos.y);
}

function mouseUpEvent(event)
{
	var pos = eventPosition(event);
    mouseUp(pos.x, pos.y);
}

function keyDownEvent(event)
{
	keyDown(event.keyCode);
}

function keyUpEvent(event)
{
	keyUp(event.keyCode);
}

function getRed(x, y)
{
	return ctx.getImageData(x, y, 1, 1).data[0];
}

function getGreen(x, y)
{
	return ctx.getImageData(x, y, 1, 1).data[1];
}

function getBlue(x, y)
{
	return ctx.getImageData(x, y, 1, 1).data[2];
}

function getRectDistance(x1, y1, x2, y2)
{
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.abs(dx) + Math.abs(dy);
}

function getLineDistance(x1, y1, x2, y2)
{
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy); 
}

function handleFocus()
{
	canvas.focus();
}

canvas.tabIndex = "1";
canvas.onmousedown = mouseDownEvent;
canvas.onmousemove = mouseMoveEvent;
canvas.onmouseup = mouseUpEvent;
canvas.addEventListener("keydown", keyDownEvent, false);
canvas.addEventListener("keyup", keyUpEvent, false);
canvas.addEventListener("mouseover", handleFocus, false);
canvas.addEventListener("touchmove", touchMoveEvent, false);

canvas.width = window.outerWidth - 150;
canvas.height = window.outerHeight - 300;

var imagesToLoad = 0;
var frameRate;
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
