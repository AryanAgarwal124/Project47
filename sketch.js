var gameState = "START"
var title, titleImage, background, backgroundImage
var play, playImage
var background2, background2Image
var levelsImage, levels, level1Image, level1
var level2Image, level2,level3Image, level3
var astronaut, astronautImage, astronaut_running, astronaut_jumping
var currentLevel = "START"
var robot, robotImage, robotGroup
var invisibleGround
var alienSpaceshipImg, alienSpaceshipGrp;
var battery, batteryImage, batteryGroup, batteries
var gameOver, restart, gameOverImage, restartImage


function preload()
{
  titleImage = loadImage("img/title.png")
  backgroundImage = loadImage("img/background3.jpg")
  playImage = loadImage("img/play.png")
  background2Image = loadImage("img/background51.png")
  levelsImage = loadImage("img/levelsLogo.png")
  level1Image = loadImage("img/level1.png")
  level2Image = loadImage("img/level2.png")
  level3Image = loadImage("img/level3.png")
  astronautImage = loadImage("img/standing.gif")
  astronaut_running = loadImage("img/running.gif")
  astronaut_jumping = loadImage("img/jumping.gif")
  robotImage = loadAnimation("img/robot1.png","img/robot2.png","img/robot3.png","img/robot4.png","img/robot5.png","img/robot6.png","img/robot7.png","img/robot8.png")
  alienSpaceshipImg = loadImage("img/alienShip.png");
  batteryImage = loadAnimation("img/batteries.gif")
  gameOverImage=loadImage("img/gameOver.png");
  restartImage=loadImage("img/restart.png");
}


function setup()
{
  createCanvas(windowWidth,windowHeight)

  title = createSprite(windowWidth/2,windowHeight/4)
  title.visible = false

  play = createSprite(windowWidth/2,windowHeight/2+150)
  play.visible= false

  background2 = createSprite(0,windowHeight/2,windowWidth,windowHeight)
  background2.addImage("background2", background2Image)
  background2.x = windowWidth/2;
  background2.velocityX = -6
  background2.scale = 2.5;
  background2.visible = false

  levels = createSprite(windowWidth/2,windowHeight/4-90)
  levels.addImage("levels",levelsImage)
  levels.visible = false

  level1 = createSprite(windowWidth/2,windowHeight/3+100)
  level1.addImage("level1", level1Image)
  level1.visible = false

  level2 = createSprite(windowWidth/2,windowHeight/3+200)
  level2.addImage("level2", level2Image)
  level2.visible = false

  level3 = createSprite(windowWidth/2,windowHeight/3+300)
  level3.addImage("level3", level3Image)
  level3.visible = false 
  
  astronaut = createSprite(windowWidth/10,windowHeight-120)
  astronaut.addAnimation("astronaut", astronautImage)
  astronaut.visible = false
  astronaut.addImage("jumping", astronaut_jumping)
  astronaut.addImage("running", astronaut_running)

  invisibleGround = createSprite(windowWidth/2,windowHeight-50, windowWidth,2)
  invisibleGround.visible = false;

  gameOver=createSprite(windowWidth/2,windowHeight/4)
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.2;
  gameOver.visible=false;
  
  restart=createSprite(windowWidth/2,windowHeight/2+150)
  restart.addImage("restart",restartImage);
  restart.scale=0.2
  restart.visible=false;
   

  alienSpaceshipGrp = new Group();
  batteryGroup = new Group();
  robotGroup = new Group ()

  batteries = 0

}

function draw()
{

   if(gameState === "START")
   {
        background(backgroundImage)
        title.addImage("title",titleImage)
        title.scale = 0.6
        title.visible = true
        play.addImage("playbutton",playImage)
        play.scale = 0.45
        play.visible = true

        if(mousePressedOver(play))
        {
          gameState = "LEVELSELECTOR"
          title.visible = false
          play.visible = false
          currentLevel = "LEVELSELECTOR"

        }
      }

        if(gameState==="LEVELSELECTOR")
        {
          levels.visible = true
          levels.scale = 0.75
          level1.visible = true
          level1.scale = 0.6
          level2.visible = true
          level2.scale = 0.6
          level3.visible = true
          level3.scale = 0.6
          
          if(mousePressedOver(level1) && currentLevel==="LEVELSELECTOR")
          {
             levels.visible = false
             level1.visible = false
             level2.visible = false
             level3.visible = false
             gameState = "LEVEL1"
             currentLevel = "LEVEL1"
          }
        }

        if (gameState === "LEVEL1")
        {
           background(0)  
           background2.visible = true
           astronaut.visible = true
           astronaut.scale = 0.3

           if (background2.x < 50){
            background2.x = windowWidth/2
            background2.velocityX = -6;
          }

          if(keyDown("RIGHT_ARROW")) {
            astronaut.changeImage("running", astronaut_running)
            astronaut.x = astronaut.x+10
          }
           
          if(keyDown("LEFT_ARROW")) {
            astronaut.changeImage("running", astronaut_running)
            astronaut.x = astronaut.x-20
          }

          if(keyDown("SPACE")&& astronaut.y >= 420) {
            astronaut.changeImage("jumping", astronaut_jumping)
            astronaut.velocityY = -12
            
          }

          if(batteryGroup.isTouching(astronaut))
          {
            batteries=batteries+1
            batteryGroup.destroyEach();
          }

          if(robotGroup.isTouching(astronaut))
          {
             gameState="END";
      
          }
           

          spawnBatteries()
          spawnRobots()
          astronaut.velocityY = astronaut.velocityY + 0.8
          astronaut.collide( invisibleGround)
          spawnAlienSpaceships();
        }  

        if(gameState === "END")
        {
          gameOver.visible = true
          restart.visible = true
          
          background2.velocityX = 0; 
          astronaut.velocityY = 0;
          robotGroup.setVelocityXEach(0);
          batteryGroup.setVelocityXEach(0);
          alienSpaceshipGrp.setVelocityYEach(0);
        
          
          robotGroup.setLifetimeEach(-1);
          batteryGroup.setLifetimeEach(-1);
          alienSpaceshipGrp.setLifetimeEach(-1);

          if(mousePressedOver(restart))
          {
              reset();
           }   
          
        }


   drawSprites()
   
        if(gameState === "LEVEL1")
        {
          textSize(20)
          fill("black")
          text("Battery: "+ batteries, 90,50);
        }

}

function spawnAlienSpaceships()
{

  if(frameCount % 60 === 0) {
    var alienSpaceship = createSprite(600,30,10,40);
    alienSpaceship.addImage("alienSpaceship", alienSpaceshipImg);
 
    alienSpaceship.velocityY = 6
    alienSpaceship.x=  Math.round(random(200,windowWidth-100));
     
    //assign scale and lifetime        
    alienSpaceship.scale = 0.2;
    alienSpaceship.lifetime = 500;
    //add each alienship to the group
    alienSpaceshipGrp.add(alienSpaceship);
  }
}

function spawnBatteries()
{
  
  if(frameCount % 60 === 0) {
    battery = createSprite(800,350,10,40);
    battery.velocityX = -6
    battery.y = Math.round(random(275,340));
    battery.addAnimation("battery", batteryImage);
    battery.scale=0.27;
    
    battery.lifetime=100
    
    batteryGroup.add(battery);
  }
}

function spawnRobots()
{
  
  if(frameCount % 60 === 0) {
    robot = createSprite(900,490,10,40);
    robot.velocityX = -10;
    robot.addAnimation("robot",robotImage);
    robot.scale=0.65;
    
    robot.lifetime=70
    
    robotGroup.add(robot);
  }
}

function reset()
{
  gameOver.visible = false;
  restart.visible = false;
  
  robotGroup.destroyEach();
  batteryGroup.destroyEach();
  alienSpaceshipGrp.destroyEach();
  batteries = 0

  gameState = "LEVEL1";
}