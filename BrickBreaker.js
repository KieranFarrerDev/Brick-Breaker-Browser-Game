var paddle, ball,test, wallTop, wallLeft, wallRight;
var bricks;
var powers;
var maxSpeed = 9;
var wallThickness = 30;
var brickWidth = 40;
var brickHeight = 20;
var brickMargin = 4;
var gravity = 1;
var nextLevel = false;

//Arrays used to store possible values for createBricks and next level functions
var rows = [1,2];
var columns = [8,10,12];
var easyColumnsTwo = [8,12,16];
var easyRowsTwo = [1,2];
var hardColumns = [8,9,14]
var hardRows = [3,4] ;
var hardColumnsTwo = [6,7,10,12];
var hardRowsTwo = [3,4,6] ;
var brickSets = [1,2];
var counter = 1;
var counterTwo = 0;
var counterThree = 0;

//Variables for score and counter
var lives;
var ballImg;
var level;
var totalBricks = 1;
var difficulty = 2;
var bricksHit = 0;
var score = 0;
var powerupNo = [3,6,9,12,15];

//Variables for sound
var hitBrickSound;
var paddleHitSound;
var loseLifeSound;
var levelUpSound;
var gameOverSound;
var powerUpSound;

function preload (){
     hitBrickSound = loadSound('assets/brickhit.mp3'); // assigns sound mp3 file to hitBrickSound
     paddleHitSound = loadSound('assets/paddlehit.mp3'); // assigns sound mp3 file to paddleHitSound
     loseLifeSound = loadSound ('assets/loselife.mp3'); // assigns sound mp3 file to loseLifeSound
     levelUpSound = loadSound ('assets/levelup.mp3'); // assigns sound mp3 file to levelUpSound
     powerUpSound = loadSound ('assets/powerup.mp3'); // assigns sound mp3 file to powerlUpSound
}

function setup() {
    createCanvas(800,600);
    backgroundColour();
    setdifficulty();
}

function draw() {
background(BgrndR, BgrndG, BgrndB);
untilPower = Pnum-bricksHit;
textSize(26);

text('level: ', 10,25);
text(level, 80, 25);
text(score, 430,590);
text('score: ',355,590);

switch(lives) //Depending on no. of lives run corresponding case, i.e if 2 lives run case 2
    {
      case 3: // When lives == 3 this case is run
        fill(255,255,255); //
        noStroke(); // gives ellipse no stroke
        ellipse(710,18,14); // Displays 3 ellipses to represnt lives top right of screen
        ellipse(740,18,14); //" "
        ellipse(770,18,14); //" "
      break;
      case 2: // when lives == 2 this case is run
        fill(255,255,255);
        noStroke();
        ellipse(710,18,14); // Displays 2 ellipses to represnt lives top right of screen
        ellipse(740,18,14); // " "
      break;
      case 1: // when lives == 1 this case is run
        fill(255,255,255);
        noStroke();
        ellipse(710,18,14); // Displays an ellipse to represnt lives top right of screen
            break;
      case 0: // when lives == 0 this case is run
           ball.remove(); // removes ball sprite
           textAlign(CENTER);
           textSize(32);
           text('GAME OVER!', width/2, 400);
           text('click to start again', width/2, 500);
      break;

    }




  paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2); //paddle postion centered through mouse postition

  ball.bounce(wallTop); //ball bounces when intersects with top of canvas, bounce is a p5.play refrence
  ball.bounce(wallLeft); // " "
  ball.bounce(wallRight); // " "

  powerUP();
  nextlevel();
  levelUp();


  if(ball.bounce(paddle)) //if ball bounces off paddle
    {
    paddleHitSound.play(); //plays paddlehit.mp3 as defined above
    var swing = (ball.position.x-paddle.position.x)/3; //swing dictates the trejectory of the ball after hit
    ball.setSpeed(maxSpeed, ball.getDirection()+swing); // shoots ball in position depending on angle of hit on paddle
    }



//if(test.bounce(paddle))
    //{
    //var swings = (test.position.x-paddle.position.x)/3;
    //test.setSpeed(maxSpeed, test.getDirection()+swings);
   // }

//if (test.overlap(paddle)){
    //test.remove();
//};
  //power.bounce(powers,powerHit);
  ball.bounce(bricks, brickHit);





if(ball.position.y>height +20) { // if ball falls past paddle
 while (lives>=0){
  ball.remove();//removes ball sprite // removes ball once past canvas to save on memory
  ball = createSprite (width/2, height-200, 12, 12); //respawns ball
  loseLifeSound.play(); // plays loselife.mp3 as defined above
  bricksHit =0;
 break;
 }
 while (lives == 0){
     removeSprites();
 }
    lives--; // removes one life
}

//if(test.ypos > paddle.position.y) {
//textSize(32);
//text('words', 10, 30);
 //}


  drawSprites();



}

function mousePressed() { //when mouse is pressed, start game, remove level text
  if (lives == 0 ){
    console.log(lives);
    lives = 3;
    score= 0; //resets score
    ball = createSprite (width/2, height-200, 12, 12); //respawns ball
  }
    if(difficulty !=1){
      console.log("no");
      console.log(lives);
  if(ball.velocity.x == 0 && ball.velocity.y == 0) // if mouse pressed ball starts to move
    ball.setSpeed(maxSpeed, random(90-10, 90+10)); // set speed of ball to match max speed variable at top
    //if(test.velocity.x == 0 && test.velocity.y == 0) // Trying to get power ups to work
    //test.setSpeed(maxSpeed, random(90-10, 90+10)); // " "
    if (nextLevel == true){
        nextLevel = false;
    }
    }

}

function brickHit(ball, brick) { //if ball bounce bounces off brick delete said brick
hitBrickSound.play();
brick.remove(); //deletes brick ball bounced off
totalBricks--; //reduces total brick count by 1, for use in next level function
bricksHit ++;//increases total brick hit count by 1, for use in power up function
score ++;
}

function powerHit(power,paddle){
    powers.remove();
}

function createBricks(){


if (difficulty == 2){ // if difficulty is 2 run this case of create bricks
 bricks = new Group (1);
  var offsetX = width/2-(column-1)*(brickMargin+brickWidth)/2; //centers bricks
  var offsetXtwo = width/2-(columnTwo-1)*(brickMargin+brickWidth)/2; // centres the second set of bricks
  var offsetY = 60; // y axis of bricks
  var offsetYtwo = 220; // y axis of the second set of bricks

     if (sets == 1){ // if sets is equal to 1 run this case
         counter = 0; // counter for total brick calculation
  for(var r = 0; r<row; r++) // while counter r value is less than randomised row count, run case
    for(var c = 0; c<column; c++) { // while counter c value is less than randomised column count, run case
      var brick = createSprite(offsetX+c*(brickWidth+brickMargin), offsetY+r*(brickHeight+brickMargin), brickWidth, brickHeight); // creates bricks
      brick.shapeColor = color(255,255,255); // colour of the bricks generated = white
      bricks.add(brick); //add brick to group bricks with each iteration through counter
      brick.immovable = true;
        counter = c+1; //counter used in Total bricks calculation
    }
 }



 if (sets > 1){
     counter = 0;
  for(var r = 0; r<row; r++) //if counter - r is value less than row +1
    for(var c = 0; c<column; c++) {
      var brick = createSprite(offsetX+c*(brickWidth+brickMargin), offsetY+r*(brickHeight+brickMargin), brickWidth, brickHeight);
      brick.shapeColor = color(255,255,255);
      bricks.add(brick);
      brick.immovable = true;
        counter = c+1;
    }
 }



if (sets == 2){
    counterTwo =0;
  for(var r = 0; r<rowTwo; r++) //if counter - r is value less than row +1
    for(var c = 0; c<columnTwo; c++) {
      var brick = createSprite(offsetXtwo+c*(brickWidth+brickMargin), offsetYtwo+r*(brickHeight+brickMargin), brickWidth, brickHeight);
      brick.shapeColor = color(255,255,255);
      bricks.add(brick);
      brick.immovable = true;
        counterTwo = c+1;
    }
 }
     totalBricks = (counter*row)+(counterTwo*rowTwo); // total bricks calculation is amount in a column * number of rows

}


 if (difficulty == 3){ // if difficulty is 3 run this case of create bricks
 bricks = new Group (1);


  var offsetX = width/2-(columnHard-1)*(brickMargin+brickWidth)/2; //centers bricks
  var offsetXtwo = width/2-(columnHardTwo-1)*(brickMargin+brickWidth)/2; //centers second set
  var offsetXthree =  width/2-(columnHardThree-1)*(brickMargin+brickWidth)/2;  // centers third set
  var offsetY = 60; //y axis of first set
  var offsetYtwo = 220; // y axis of second set
  var offsetYthree = 55; //y axis of third set

     if (hardSets > 1){ // in order to create 3 sets
         counterThree =0;
  for(var r = 0; r<rowHardThree; r++) //if counter - r is value less than row +1
    for(var c = 0; c<columnHardThree; c++) {
      var brick = createSprite(offsetXthree+c*(brickWidth+brickMargin), offsetYthree+r*(brickHeight+brickMargin), brickWidth, brickHeight);
      brick.shapeColor = color(255,255,255); // bricks colour set to white
      bricks.add(brick);
      brick.immovable = true;
        counterThree = c+1; //counter used in Total bricks calculation
    }
 }



 if (hardSets > 2){ // in order to create 3 sets
     counter = 0;
  for(var r = 0; r<rowHard; r++) //if counter - r is value less than row +1
    for(var c = 0; c<columnHard; c++) {
      var brick = createSprite(offsetX+c*(brickWidth+brickMargin), offsetY+r*(brickHeight+brickMargin), brickWidth, brickHeight);
      brick.shapeColor = color(227,65,66); //bricks colour set to red
      bricks.add(brick);
      brick.immovable = true;
        counter = c+1;
    }
 }



if (hardSets == 3){ //in order to create 3 sets
    counterTwo=0;
  for(var r = 0; r<rowHardTwo; r++) //if counter - r is value less than row +1
    for(var c = 0; c<columnHardTwo; c++) {
      var brick = createSprite(offsetXtwo+c*(brickWidth+brickMargin), offsetYtwo+r*(brickHeight+brickMargin), brickWidth, brickHeight);
      brick.shapeColor = color(227,65,66);
      bricks.add(brick);
      brick.immovable = true;
        counterTwo = c+1;
    }
 }

     totalBricks = (counter*rowHard)+(counterTwo*rowHardTwo)+(counterThree*rowHardThree);

}



}

function randomiseBricks(){
  column = random (columns); //random picks one value from array declared at the top eg. [8,12,16]
  row = random (rows);
  sets = random (brickSets);
  hardSets = 3; // 3 sets of bricks for hard difficulty, used for double bricks
  columnTwo = random (easyColumnsTwo);
  rowTwo = random (easyRowsTwo);
  columnHard = random (hardColumns);
  rowHard = random (hardRows);
  columnHardTwo =random (hardColumnsTwo);
  rowHardTwo = random (hardRowsTwo);
  columnHardThree = columnHard;
  rowHardThree = rowHard;
}

function powerUP(){
    // powerups does not work becasue i could not get powerup sprites to interact with paddle correctly
powers = new Group (1);
 if (bricksHit == Pnum){
       hitBrickSound.pause(); //stops sound playback when hitting brick, so can hear power up sound
       powerUpSound.play(); // plays levelup.mp3 as defined above
       power = createSprite (width/2, height-200, 12, 12);
       power.addSpeed(gravity, 90);
       bricksHit = 0; //stops infitine sprites being created when if condition is stuck on true
       Pnum = random (powerupNo);

    }
 }

function backgroundColour(){
var BackgroundRed = [247,227,207,247]; // colour variables for random selection
var BackgroundGrn = [134,114,154,204];
var BackgroundBlu = [131,111,151,201];
BgrndR = random (BackgroundRed); // BgrndR red value is randomly selected from BackgroundRed
BgrndG = random (BackgroundGrn);
BgrndB = random (BackgroundBlu);
}

function levelUp(){

    if (nextLevel == true){ //prints level number upon level completion
        textSize(42);
textAlign(CENTER);
text('level',380, 500);
text(level,480,500);
    }

}

function nextlevel(){
    if (level > 0){  // if level is above 1 difficulty increases
      difficulty = 3;
    }
    if (totalBricks == 0) { //if total bricks left are exactly 0 run the folllowing code
      ball.remove(); //removes ball sprite
      hitBrickSound.pause(); //stops sound playback when hitting brick, so can hear level up sound
      levelUpSound.play();
      totalBricks = 0; //sests total bricks to 0 for random function
      randomiseBricks(); // random vlaues are selected
      createBricks(); //create bricks function used with values created by randomiseBricks
      backgroundColour(); // calls background colour function for random BG colour
      ball = createSprite (width/2, height-200, 12, 12); //respawns ball
      while (lives< 3){ // while lives are less than 3 and user finishes level give +1 life
       lives++;
      }

      level ++; // Increases level count ++
      bricksHit =0; //Resets brick count at end of level incase of error going over bricks hit count during level
      nextLevel = true; //sets if statement to true in levelUp function

   }

} //when all bricks are cleared this is the function that will be called

function GameSetupEasy(){
  level = 1; // level is set to 1
  lives = 3; // lives is set to 3
  Pnum = random (powerupNo); // randomises powerup drop rate
  backgroundColour();
  randomiseBricks();

  paddle = createSprite(width/2, height-50, 100, 10);
  paddle.immovable = true;

  wallTop = createSprite(width/2, -wallThickness/2, width+wallThickness*2, wallThickness);
  wallTop.immovable = true;

  wallLeft = createSprite(-wallThickness/2, height/2, wallThickness, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width+wallThickness/2, height/2, wallThickness, height);
  wallRight.immovable = true;


createBricks(); // calls create bricks function



  ball = createSprite (width/2, height-200, 12, 12); // creates the ball sprite
    //test = createSprite (width/2, height-100, 12, 12); //trying to get power ups to work
    //test.maxSpeed = maxSpeed; //trying to get power ups to work
  ball.maxSpeed = maxSpeed; // Assigns ball sprite with max speed as declared above = 9
  paddle.shapeColor = ball.shapeColor = color(255,255,255);


    //ball.addImage(ballImg);
}

function GameSetupHard(){

Pnum = random (powerupNo); //randomises powerup drop rate
backgroundColour(); // calls backgroundColour function for random colour
randomiseBricks(); // calls randomiseBricks function for random column and row amount used for createBricks

  paddle = createSprite(width/2, height-50, 100, 10); // creates the sprite for the paddle
  paddle.immovable = true; // for .bounce p5.play reference

  wallTop = createSprite(width/2, -wallThickness/2, width+wallThickness*2, wallThickness); //creates the wall a top the canvas for ball to interact with
  wallTop.immovable = true; // for .bounce p5.play reference

  wallLeft = createSprite(-wallThickness/2, height/2, wallThickness, height); // same as wallTop
  wallLeft.immovable = true;

  wallRight = createSprite(width+wallThickness/2, height/2, wallThickness, height); // same as WallTop
  wallRight.immovable = true;


  createBricks(); //calls the createBricks function to place the sprites onto the canvas



  ball = createSprite (width/2, height-200, 12, 12); // creates the ball sprite
  ball.maxSpeed = maxSpeed; // Assigns ball sprite with max speed as declared above which = 9
  paddle.shapeColor = ball.shapeColor = color(255,255,255); // colour of paddle


}


function setdifficulty(){ //picks what game Setup depending on difficulty -> game starts on case 2, after completing 2 levels case changes to 3 and GameSetupHard is then run

    switch (difficulty)
    {
        case 3:
            GameSetupHard();
            break;
        case 2:
            GameSetupEasy();
            break;
        case 1:
            keyPressed(); // attempt at implementing a start menu outside of game setups
            break;
        case 0:

            break;
    }

}
