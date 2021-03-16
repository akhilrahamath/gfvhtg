var balloon,balloonimg,balloonposition;
var bg;

function preload(){
bg=loadImage("Images/Background.png");
balloonimg=loadAnimation("Images/HotAirBallon.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("balloonimg");
  balloonposition=database.ref('balloon/height');
  balloonposition.on("value",readHeight,showError);
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.scale = balloon.scale-0.01
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(10,0);
  balloon.scale = balloon.scale+0.01
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.scale = balloon.scale-0.01
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,10);
  balloon.scale = balloon.scale+0.01
}

  drawSprites();
}

function updateHeight(){
  database.ref('balloon/height').set({
  'x':height.x+x,
  'y':height.y+y
  })
}

function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("Error in writing to the database");
}