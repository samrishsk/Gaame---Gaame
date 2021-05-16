var chara,charaR;
var bg,bgIMG,ground;
var score=0;
var gameState = "play";
var obstaclesIMG,obstaclesG;

function preload(){
  
  

  charaR=loadAnimation("CJ1.png","CJ2.png","CJ4.png","CJ5.png","CJ6.png","CJ7.png","CJ8.png","CJ9.png","CJ10.png","CJ11.png","CJ12.png")
  
  bgIMG=loadImage("bg.png");
  
  obstaclesIMG=loadImage("S1.png")
 
  
 
  
}

function setup() {
 createCanvas(windowWidth,windowHeight)
  

  bg=createSprite(100,windowHeight/2,windowWidth*4,windowHeight*2);
  bg.addImage("bgg",bgIMG);
  bg.velocityX=-2;
  bg.x = bg.width/2;
  bg.scale = 5;
  
  
  
  chara = createSprite(50,windowHeight-50,40,40);
  chara.addAnimation("running",charaR);
  chara.scale = 0.2;
  
  
  ground= createSprite(200,windowHeight-25,windowWidth*2,5);
  ground.visible = false;
  
  obstaclesG = createGroup();
  
  
}

function draw() {
 
  background("black");
  
  if(gameState === "play")
  {
  
  if(bg.x < 0){
    bg.x = bg.width/2;
  } 
    //scoring
    score = score + Math.round(getFrameRate()/30);
     
  }
    
  if(touches.length>0||keyDown("space")&& chara.y>275){
    chara.velocityY = -18;
    touches =[];
  }
   chara.velocityY = chara.velocityY + 0.9;
  
  if(chara.isTouching(obstaclesG)){
 
    obstaclesG.destroyEach();
    gameState = "end";
 }
  
  obstacles();
  
  
  chara.collide(ground);
  
 if(gameState === "end"){
   chara.visible = false
   bg.visible = false
   obstaclesG.setLifetimeEach(0);
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",100,225);
   textSize(25);
   fill("orange");
   stroke("orange");
   text("Press R To Restart The Game",57,325);
    if(keyDown("R")){
      reset();
    }
 } 
  
  drawSprites();
  
 fill("red");
  stroke("red");
  textSize(22); 
  text("SCORE - "+ score,200,65);
}

function obstacles(){
  if(frameCount % 60 === 0){
   var obstacles = createSprite(windowWidth+20,windowHeight);
    obstacles.y = Math.round(random(windowHeight-400,windowHeight-60));
    obstacles.addImage("ob",obstaclesIMG);
    obstacles.scale = 0.2;
    obstacles.velocityX = -4;
    
    obstacles.lifetime = windowWidth/4;
  
    obstaclesG.add(obstacles);
    
    
  }
}

function reset(){
  gameState = "play";
  chara.visible = true
  bg.visible = true
  score = 0;

}