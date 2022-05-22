function Button(x, y, txtSize, buffer, rounding, font, buttonRGB, textRGB, stroke, txt, active, func) {
	this.x = x;
	this.y = y;
	this.txtSize = txtSize;
	this.letterLength = txtSize*0.512;
	this.letterHeight = txtSize*0.74;
	this.buffer = 20;
	this.rounding = 10;
	this.stroke = stroke;
	this.font = font;
	this.txt = txt;
	this.active = active;
	
	this.boxX = (this.x-(this.txt.length*this.letterLength > this.letterHeight ? this.txt.length*this.letterLength : this.letterHeight)/2-this.buffer);
	this.boxY = (y-(this.letterHeight/2)-buffer);
	this.boxW = (((this.txt.length*this.letterLength+this.buffer*2) > this.letterHeight + this.buffer*2 ? this.txt.length*this.letterLength+this.buffer*2 : this.letterHeight + this.buffer*2));
	this.boxH = (this.letterHeight + buffer*2);
	
	this.buttonR = buttonRGB[0];
	this.buttonG = buttonRGB[1];
	this.buttonB = buttonRGB[2];
	if (buttonRGB.length > 3) {
		this.buttonA = buttonRGB[3];
	} else {
		this.buttonA = 255;
	}
	
	this.textR = textRGB[0];
	this.textG = textRGB[1];
	this.textB = textRGB[2];
	
	this.func = func;
}

function drawButton(button) {
	strokeWeight(button.stroke);
	fill(button.buttonR,button.buttonB,button.buttonG,button.buttonA);
	rect(button.x-(button.txt.length*button.letterLength > button.letterHeight ? button.txt.length*button.letterLength : button.letterHeight)/2-button.buffer,button.y-(button.letterHeight/2)-button.buffer, ((button.txt.length*button.letterLength+button.buffer*2) > button.letterHeight + button.buffer*2 ? button.txt.length*button.letterLength+button.buffer*2 : button.letterHeight + button.buffer*2), button.letterHeight + button.buffer*2, button.rounding);
	strokeWeight(1);
	
	
	fill(button.textR,button.textG,button.textB);
	textSize(button.txtSize);
	textFont(button.font);
	text(button.txt,button.x-(button.txt.length*button.letterLength)/2,button.y+(button.letterHeight/2));
}