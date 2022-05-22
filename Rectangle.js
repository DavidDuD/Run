function Rectangle(x, y, w, h, rgb, id, scored) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.velX = 0;
	this.velY = 0;
	this.rotation = 0;
	this.rotationSpeed = 3.8;
	this.onPlatform = false;
	this.onGround = false;
	this.relevant = true;
	this.r = rgb[0];
	this.g = rgb[1];
	this.b = rgb[2];
	
	this.ID = id;
	this.scored = scored;
}