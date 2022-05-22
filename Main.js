var gameState = "menu";

var rainbow = false;

function draw() {
	timerTick();
	switch (gameState) {
		case "menu":
			runMenu();
			break;
		case "game":
			run();
			break;
	}
	if (running && rainbow) {
		noCursor();
		var col = getTimer("col");
		strokeWeight(10);
		colorMode(HSB, 100);
		stroke(col,100,100);
		line(mouseX, mouseY, pmouseX, pmouseY);
		strokeWeight(1);
		colorMode(RGB, 255);
		stroke(0);
	} else {
		cursor();
	}
}

function setup() {
	noCursor();
	createCanvas(1366, 567);
	new Timer(100, "col");
	switch (gameState) {
		case "menu":
			startMenu();
			break;
		case "game":
			start();
			break;
	}
}


var img;
function preload() {
  img = loadImage('Mountains.jpg');
}

document.addEventListener('mousedown', mouseClick);
document.addEventListener('keydown', keyPress);

function mouseClick(event) {
	switch (gameState) {
		case "menu":
			menuClick(event);
			break;
		case "game":
			interact(event);
			break;
	}
}

function keyPress(event) {
	switch (gameState) {
		case "game":
			interact(event);
			break;
		case "menu":
			menuKey(event);
			break;
	}
}

function switchState(state) {
	gameState = state;
	switch (state) {
		case "game":
			start();
			break;
		case "menu":
			startMenu();
			break;
	}
}