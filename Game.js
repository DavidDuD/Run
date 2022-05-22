var objects = [];

var enemies = [];

var trails = [];

var player;

var score = 0;

const gravity = 0.5;

const jumpForce = 12;

const enemySpeed = 10;

const ground = 500;

var running = true;

var backgroundScroll = 0;

var backgroundScrollSpeed = 2;

const trailDelay = 0;

var trailWait = 0;

const fadeSpeed = 5;

var highScore = 0;

var bottom = null;
function physics() {
	if (mouseX < player.width/2) {
		player.x = 0;
	} else if (mouseX > canvas.width-player.width/2) {
		player.x = canvas.width-player.width;
	} else {
		player.x = mouseX-player.width/2;
	}
	player.velY+=gravity;
	
	
		bottom = null;

		player.onPlatform = false;
	
	for (var rects of objects) {
		if (rects.relevant) {
			if (rects.ID == "platform") {
				if (bottom == null) {
					if (collide2DPredict(player,rects) && player.velY > 0) {
						if (player.y+player.height < rects.y+1) {
							player.rotation = fixRotation(player.rotation);
							player.y = rects.y-player.height;
							player.velY = 0;
							player.onPlatform = true;
							bottom = rects;
						} else {
							end();
						}
					}
				}
				
				rects.x-=enemySpeed;
				if (rects.x < 0-rects.width) {
					rects.relevant = false;
				}
			}
			if (rects.ID == "enemy") {
				rects.x-=enemySpeed;
				if (rects.x < 0-rects.width) {
					rects.relevant = false;
				}
				if (collide2D(player,rects) && player.y+player.height != rects.y) {
					end();
				}
				if (!rects.scored) {
					if (player.x > rects.x) {
						rects.scored = true;
						score++;
						if (score > highScore) {
							highScore = score;
						}
					}
				}
			}
		}
	}
	valid(player);
	if (!player.onGround && !player.onPlatform) {
		player.y+=player.velY;
	}
}




function interact(event) {
	if (running) {
		if (player.onGround || player.onPlatform) {
    	player.velY = -jumpForce;
			player.onGround = false;
			player.onPlatform = false;
		}
	} else {
		reset();
	}
}

function run() {
	if (running) {
		if (mouseIsPressed) {
			interact();
		}
		render();
		physics();
		spawn();
	}
}

const delay = 100;
var wait = delay;
function spawn() {
	wait--;
	if (wait < 0) {
		number = getRandomInt(2,11);
		let enemy;
		switch (number) {
			case 2:
				enemy = new Rectangle(1366,ground-50,50,50, [255,0,0], "enemy", true);
				objects.push(enemy);
				enemies.push(enemy);
				enemy = new Rectangle(1416,ground-50,50,50, [255,0,0], "enemy");
				objects.push(enemy);
				enemies.push(enemy);
				break;
			case 3:
				enemy = new Rectangle(1366,ground-50,50,50, [255,0,0], "enemy", true);
				objects.push(enemy);
				enemies.push(enemy);
				enemy = new Rectangle(1416,ground-50,50,50, [255,0,0], "enemy", true);
				objects.push(enemy);
				enemies.push(enemy);
				enemy = new Rectangle(1466,ground-50,50,50, [255,0,0], "enemy");
				objects.push(enemy);
				enemies.push(enemy);
				break;
			case 8:
				enemy = new Rectangle(1366,ground-100,50,50, [255,0,0], "enemy", true);
				objects.push(enemy);
				enemies.push(enemy);
				enemy = new Rectangle(1786,ground-100,50,50, [255,0,0], "enemy");
				objects.push(enemy);
				enemies.push(enemy);
				objects.unshift(new Rectangle(1366, ground-50, 470, 50, [100,100,100], "platform"));
				break;
			case 9:
				enemy = new Rectangle(1366,ground-100,50,50, [255,0,0], "enemy");
				objects.push(enemy);
				enemies.push(enemy);
				objects.unshift(new Rectangle(1366, ground-50, 470, 50, [100,100,100], "platform"));
				break;
			case 10:
				enemy = new Rectangle(1366,ground-50,50,50, [255,0,0], "enemy");
				objects.push(enemy);
				enemies.push(enemy);
				objects.unshift(new Rectangle(1416, ground-50, 420, 50, [100,100,100], "platform"));
				break;
			default:
				enemy = new Rectangle(1366,ground-50,50,50, [255,0,0], "enemy");
				objects.push(enemy);
				enemies.push(enemy);
				break;
		}
		wait = 46*getRandomInt(1,3);
	}
}

function end() {
	render();
	running = false;
	
	let letterLength = 22;
	let letterHeight = 37;
	let buffer = 20;
	let rounding = 10;
	let txt = ('Score: ' + score + " | High Score: " + highScore);
	noStroke();
	fill(255);
	text(txt,canvas.width/2-(txt.length*letterLength)/2,canvas.height/2+(letterHeight/2));
	stroke(0);
}

function valid(r) {
	if (r.y+r.height+r.velY < ground) {
		player.onGround = false;
		return true;
	} else {
		player.y = ground-player.height;
		player.onGround = true;
		player.velY = 0;
		player.rotation = fixRotation(player.rotation);
		return false;
	}
}

function collide2D(rect1,rect2) {
	if (collide1D(rect1.x,rect1.x+rect1.width, rect2.x,rect2.x+rect2.width)) {
		if (collide1D(rect1.y,rect1.y+rect1.height, rect2.y,rect2.y+rect2.height)) {
			return true;
		}
	}
	return false;
}

function collide2DPredict(rect1,rect2) {
	if (collide1D(rect1.x+rect1.velX,rect1.x+rect1.width+rect1.velX, rect2.x+rect2.velX,rect2.x+rect2.width+rect2.velX)) {
		if (collide1D(rect1.y+rect1.velY,rect1.y+rect1.height+rect1.velY, rect2.y+rect2.velY,rect2.y+rect2.height+rect2.velY)) {
			return true;
		}
	}
	return false;
}

function collide1D(x1,x2,x3,x4) {
	if ((x3 >= x1 && x3 <= x2) || (x1 >= x3 && x1 <= x4) || (x4 >= x1 && x4 <= x2) || (x2 >= x3 && x2 <= x4)) {
			return true;
	}
	return false;
}
	
function start() {
	
	player = new Rectangle(mouseX, 312, 50, 50, [255,0,255], "player");
	
	objects.push(player);
	
	
}

function render() {
	trailWait++;
	if (trailWait >= trailDelay+1) {
		trailWait = trailWait-(trailDelay+1);
	}
	
	backgroundScrollSpeed = (mouseX/500)+1;
	backgroundScroll-=backgroundScrollSpeed;
	if (backgroundScroll <= -canvas.width) {
			backgroundScroll = backgroundScroll+canvas.width;
	}
	background(36, 46, 66);
	image(img, backgroundScroll, 0, canvas.width, windowHeight-(windowHeight-ground));
	image(img, canvas.width+backgroundScroll, 0, canvas.width, windowHeight-(windowHeight-ground));
	fill(100,100,100);
	rect(0,ground,canvas.width,windowHeight-ground);
	for (var trail of trails) {
		if (trail.relevant) {
			trail.x-=enemySpeed;
			trail.alpha-=fadeSpeed;
			fill(trail.rec.r,trail.rec.g,trail.rec.b,trail.alpha);
			noStroke();
			r = ((Math.sqrt(Math.pow(trail.rec.width,2)+Math.pow(trail.rec.height,2)))/2);
			x1 = trail.x+(trail.rec.width/2)+(r*Math.sin((trail.rotation-45)/360*2*Math.PI));
			y1 = trail.y+(trail.rec.height/2)+(r*Math.cos((trail.rotation-45)/360*2*Math.PI));
			x2 = trail.x+(trail.rec.width/2)+(r*Math.sin((trail.rotation+45)/360*2*Math.PI));
			y2 = trail.y+(trail.rec.height/2)+(r*Math.cos((trail.rotation+45)/360*2*Math.PI));
			x3 = trail.x+(trail.rec.width/2)+(r*Math.sin((trail.rotation+135)/360*2*Math.PI));
			y3 = trail.y+(trail.rec.height/2)+(r*Math.cos((trail.rotation+135)/360*2*Math.PI));
			x4 = trail.x+(trail.rec.width/2)+(r*Math.sin((trail.rotation+225)/360*2*Math.PI));
			y4 = trail.y+(trail.rec.height/2)+(r*Math.cos((trail.rotation+225)/360*2*Math.PI));
		
			quad(x1,y1,x2,y2,x3,y3,x4,y4);
			stroke(0);
			if (trail.alpha <= 0) {
				trail.relevant = false;
				//trails.splice(trails.indexOf(trail),1);
			}
		}
	}
	for (var rects of objects) {
		if (rects.relevant) {
			if (rects.rotation <= -360) {
				rects.rotation = -360-rects.rotation;
			}
			if (rects.ID == "enemy") {
				fill(rects.r,rects.g,rects.b);
				triangle(rects.x,rects.y+rects.height,rects.x+rects.width,rects.y+rects.height,rects.x+(rects.width/2),rects.y);
			} else if (rects.ID == "player") {
					if (trailWait == 0) {
						trails.push(new Trail(rects.x,rects.y,rects.rotation, rects));
					}
			
					fill(rects.r,rects.g,rects.b);
			
					r = ((Math.sqrt(Math.pow(rects.width,2)+Math.pow(rects.height,2)))/2);
					x1 = rects.x+(rects.width/2)+(r*Math.sin((rects.rotation-45)/360*2*Math.PI));
					y1 = rects.y+(rects.height/2)+(r*Math.cos((rects.rotation-45)/360*2*Math.PI));
					x2 = rects.x+(rects.width/2)+(r*Math.sin((rects.rotation+45)/360*2*Math.PI));
					y2 = rects.y+(rects.height/2)+(r*Math.cos((rects.rotation+45)/360*2*Math.PI));
					x3 = rects.x+(rects.width/2)+(r*Math.sin((rects.rotation+135)/360*2*Math.PI));
					y3 = rects.y+(rects.height/2)+(r*Math.cos((rects.rotation+135)/360*2*Math.PI));
					x4 = rects.x+(rects.width/2)+(r*Math.sin((rects.rotation+225)/360*2*Math.PI));
					y4 = rects.y+(rects.height/2)+(r*Math.cos((rects.rotation+225)/360*2*Math.PI));
			
					quad(x1,y1,x2,y2,x3,y3,x4,y4);
				} else {
				fill(rects.r,rects.g,rects.b);
				rect(rects.x,rects.y,rects.width,rects.height);
			}
		}
	}
	
	
	fill(0);
	
	letterLength = 25;
	rect(-50,-50,275-(letterLength)+(String(score).length*letterLength),120,30);
	
	fill(255);
	textSize(50);
	textFont('Helvetica');
	text('Score: ' + score,10,50);
}

function reset() {
	running = true;
	objects = [];
	
	trails = [];

	enemies = [];

	player = null;
	
	score = 0;
	
	setup();
}

function fixRotation(rotation) {
	return Math.round(rotation/90)*90;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}








