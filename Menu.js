buttons = [];

function runMenu() {
	renderMenu();
}

function renderMenu() {
	image(img, 0, 0, canvas.width, canvas.height);
	
	for (var button of buttons) {
		drawButton(button);
	}
	
	if (rainbow) {
		strokeWeight(10);
		stroke(50,150,50)
		line(canvas.width-19,canvas.height-70,canvas.width-52,canvas.height-20);
		line(canvas.width-52,canvas.height-20, canvas.width-69,canvas.height-40)
		strokeWeight(1);
		stroke(0)
	}
	
	let t = Math.abs(getTimer("bounce")-50)/2;
	fill(100,100,200);
	textSize(75+t);
	textFont('Helvetica');
	textAlign("center", "center");
	text("Square Jump",canvas.width/2,canvas.height/2-100);
	textAlign("left", "alphabetic");
}

function startMenu() {
	new Timer(100, "bounce");
	buttons.push(new Button(canvas.width/2,canvas.height/2,50,20,10,'Helvetica',[100,100,100],[255,255,255], 1, 'Start Game',true,function() {
		switchState("game");
	}));
	buttons.push(new Button(canvas.width-44,canvas.height-45,50,20,10,'Helvetica',[255,255,255],[255,255,255], 10,'',true,function() {
		rainbow = !rainbow;
	}));
}

function menuClick(event) {
	for (var button of buttons) {
		if (hovering(button)) {
			button.func();
		}
	}
}

function menuKey(event) {
	switchState("game");
}

function hovering(button) {
	if (collide1D(mouseX, mouseX, button.boxX,button.boxX+button.boxW)) {
		if (collide1D(mouseY,mouseY, button.boxY,button.boxY+button.boxH)) {
			return true;
		}
	}
	return false;
}