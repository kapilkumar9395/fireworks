var fireworks = [];
var gravity;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  strokeWeight(4);
  stroke(255);
  gravity = createVector(0, 0.2);
}

function draw(){
  colorMode(RGB);
  background(0, 50);
  if(random(1) <= 0.03){
    this.fireworks.push(new Firework());
  }
  this.fireworks.forEach(function(firework){
    firework.update();
    firework.show();
  });
}

/*
  Firework
*/

function Firework(){
  this.hu = random(255);
  this.firework = new Particle(random(width), height, this.hu,false);
  this.exploded = false;
  this.particles = [];

  this.update = function(){
    if(!this.exploded){
      this.firework.applyForce(gravity);
      this.firework.update();

      if(this.firework.vel.y >= 0){
        this.exploded = true;
        this.explode();
      }
    }

    for(var i=this.particles.length-1;i>=0;i--){
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if(this.particles[i].done()){
        this.particles.splice(i, 1);
      }
    }

  }

  this.explode = function(){
    for(var i=0;i<40;i++){
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu,true);
      this.particles.push(p);
    }
  }

  this.show = function(){
    if(!this.exploded){
      this.firework.show();
    }

    for(var i=0;i<this.particles.length;i++){
      this.particles[i].show();
    }
  }
}

/*
  Particle
*/

function Particle(x,y,hu,firework){
  this.hu = hu;
  this.firework = firework;
  this.lifespan = 255;
  this.pos = createVector(x, y);
  if(!this.firework){
    this.vel = createVector(0,random(-15, -8));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2,3));
  }
  this.acc = createVector(0,0);

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.update = function(){
    if(this.firework){
      this.vel.mult(1);
      this.lifespan -= 5;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function(){
    if(this.lifespan  <= 0){
      return true;
    } else{
      return false;
    }
  }

  this.show = function(){
    colorMode(HSB);
    if(this.firework){
      strokeWeight(2);
      stroke(this.hu, random(200),100,this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.hu,random(200),100);
    }
    point(this.pos.x, this.pos.y);
  }
}