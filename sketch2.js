var ship;
var blocks = [];
var balls = [];

function setup() {
	createCanvas(700, 500);
  ship = new Ship();
	//balls = new Ball();
	
	for (var i = 0; i <9; i++){
	   blocks[i] = new Blocks(i*70+60, 60);
	}
	
}

function draw() {
  background(51);
	fill("white");
	text("Shooting with Space key", 50, 50);
	ship.show();
	
		for (var i = 0; i < balls.length; i++){
	   balls[i].show();
		 balls[i].move();
			for (var u = 0; u < blocks.length; u++){
	      if(balls[i].hits(blocks[u])){
				  blocks[u].remove();
				}
	}
	}
	for (var i = 0; i < blocks.length; i++){
	   blocks[i].show();
		 blocks[i].move();
		 if(blocks[i].toDelete){
		  blocks.splice(i,1);
		 }
	}
}

function Ship(){
  this.x = width/2;	
	this.show = function(){
		noStroke();
		fill('lightgreen');
		rectMode(CENTER);
	  rect(this.x, height-50, 60, 30);
		rect(this.x, height-60, 20, 30);
	}
	
	this.move = function(dir){
	   this.x += dir*20;
	}
}

function Blocks(x,y){
   this.x = x;
	 this.y = y;	
	 this.r = 20;
	 this.toDelete = false;
	 this.xdir = random(-0.1, 0.1); 	 
   this.ydir = random(0.2, 0.8); 
	
	this.remove = function(){
	  this.toDelete = true;
	}
	
	this.move = function(){
	  this.x = this.x + this.xdir;
		this.y = this.y + this.ydir;
	}
	
	this.show = function(){
	   fill('purple');
		 rect(this.x, this.y,this.r*2, this.r*2);
		 noStroke();
		 fill('white');
		 rect(this.x-6, this.y-6, 5, 5);
	 	 rect(this.x+6, this.y-6, 5, 5);
		 rect(this.x, this.y+7, 15, 1);
	}
}

function Ball(x, y){
    this.x = x;
	  this.y = y;	
	  this.r = 8;
	this.show = function(){
		 noStroke();
	   fill('yellow');
		 ellipse(this.x, this.y, this.r*2, this.r*2);
	}
	 this.hits = function(blocks){
	   var d = dist(this.x, this.y, blocks.x, blocks.y);
		 if (d < this.r + blocks.r){
		  return true;
		 } else {
		   return false;
		 }
	 }
	 
   this.move = function(){
	    this.y = this.y - 1;	    
	 }
}

function keyPressed(){
	 if (key === ' '){
	   var ball = new Ball(ship.x, height-70);
		 balls.push(ball);
	 }
   if (keyCode === RIGHT_ARROW){
	   ship.move(1);
	 } else if (keyCode === LEFT_ARROW){
	   ship.move(-1);
	 }
}

// Need to add Game over system with collideLineRect();
