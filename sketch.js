var tower, towerImg;
var ghost, ghostImg, ghostImg2;
var door,doorImg, doorG;
var climber, climberImg, climberG;
var inblock, inblockG;
var PLAY=1;
var END=0;
var gameState = 1;
var sound;

function preload(){
 towerImg = loadImage("tower.png"); 
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600, 600)
 tower = createSprite(300, 300, 20, 20);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  sound.loop();
  
  doorG = new Group();
  climberG = new Group();
  inblockG = new Group();
}
function draw(){
  background("white");
  if(gameState === PLAY){
  if(tower.y>600){
    tower.y = 300;
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-5;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+5;
  }
  if(climberG.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(inblockG.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = END;
  }
  spawndoors();
 drawSprites(); 
}
  if(gameState === END){
    textSize(15);
    fill("black");
    text("GAME OVER", 300, 300);
  }
}
function spawndoors(){
  if(frameCount%100 === 0){
    door = createSprite(Math.round(random(100,400)), 0);
    door.addImage(doorImg);
    door.velocityY = 3;
    door.lifetime = 180;
    doorG.add(door);
    climber = createSprite(door.x,50,20,20);
    climber.velocityY = 3;
    climber.addImage(climberImg);
    climber.lifetime = 180;
    climberG.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    inblock = createSprite(door.x,60,climber.width,2);
    inblock.debug = true;
    inblock.velocityY = 3;
    inblock.lifetime = 180;
  }
}