var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, zoombiegirl;
var zoombie, zoombie2;
var floresta;
var score=0;

var invisibleGound;
var resetar, gameOver;

function preload(){
    girl = loadAnimation("garota_correndo.jpg");
    zoombiegirl = loadAnimation("garota_zumbi.png");
    zoombie = loadImage("zumbi.png");
    zoombie2 = loadImage("zumbi_2.jpg");
    floresta = loadImage("floresta_sombria.avif");
    resetar = loadImage("reset.png");
    gameOver = loadImage("game_Over.png");
}

function setup() {
    createCanvas(windowWidth, windowHeigth);

    girl = createSprite(200,heigth,200,10,10);
    girl.scale = 0.5;

    floresta = createSprite(width,200,200,10,10);
    floresta.addImage("floresta");

    invisibleGound = createSprite(width/2,heigth-10,width,125);
    invisibleGround.visible = false;

    resetar = createSprite(300,140);
    resetar.addImage(resetarImg);

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);

    gameOver.scale = 0.5;
    resetar.scale = 0.5;

    gameOver.visible = false;
    resetar.visible = false;

    score = 0;
}

function draw() {
    backGround(floresta);
    text("Pontuação: "+ score, 500,50);

    if(gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        floresta.velocityX = -(6 + 3*score/100);
    }
    if(touches.length > 0 ||keyDown("space")&& girl.y >= 159){
        girl.velocityY = -12;
        touches = [];
    }

    girl.velocityY = girl.velocityY + 0.8

    if(floresta.x < 0){
        floresta.x = floresta.width/2;
    }

    girl.collide(invisibleGround);
    spawnZoombie();

    if(zoombie.isTouching(girl)){
        gameState = END;
    }
    else if (gameState === END){
      resetar.visible = true;
      gameOver.visible = true;  

        floresta.velocityX = 0;
        girl.velocityY = 0;
        zoombie.velocityX = 0;

        girl.changeAnimation("zoombiegirl");

        zoombie.setLifeTime(-1);
         if(mousePresedOver(resetar)){
            reset();
         }
        
    }

    drawSprites();
}

function spawnZoombie(){
    if(frameCount % 60 === 0){
        zoombie = createSprite(400,400,10,10);
        zoombie.x = Math.round(random(20,20));
        zoombie.addImage(zoombie);
        zoombie.scale = 0.5;
        zoombie.velocityX = -3;
        zoombie.lifetime = 200

    }
}

function reset(){
    gameState = PLAY;
    resetar.visible = false;
    gameOver.visible = false;

    zoombie.destroy();

    girl.changeAnimation("girl")


    score = 0;

}