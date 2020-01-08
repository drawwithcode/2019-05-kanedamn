var logo;

var rupaul;
var x;
var y;

var mic;
var volume;

var sissySong;
var songButton;

var allShade = [];
var amountShade = 20;
var shadeCoin;

var finalScore = 0;

function preload() {
  logo = loadImage("./assets/LOGO.png");

  rupaulImg = loadImage("./assets/rupaul.png");

  shadeCoin = loadImage("./assets/coin.png");

  sissySong = loadSound("./assets/sissy.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

//initial player position
  x = width / 2;
  y = height / 2 + 200;

//start recording mic when the page opens
  mic = new p5.AudioIn();
  mic.start();

//place random Shade all over the page
  for (var i = 0; i < amountShade; i++) {
    var tempx = random() * windowWidth;
    var tempy = random() * windowHeight;
    var tempr = 50;

    var tempShade = new Shade(tempx, tempy, tempr);
    allShade.push(tempShade);
  }

//create a button that plays the song when is pressed
  songButton = createButton("need some music?");
  songButton.position(20, 70);
  songButton.mouseClicked(playMusic);
}

function playMusic(){
  sissySong.play();
}

function draw() {
  background(255, 44, 190);

  for (var i = 0; i < allShade.length; i++) {
    var tempShade = allShade[i];
    tempShade.dead();
    tempShade.display();
  }

  //when one element of the array is "dead", it disappears and the score grows
  for (var i = 0; i < allShade.length; i++) {
    if (allShade[i].dead()) {
      allShade.splice(i, 1);
      finalScore++;
    }
  }

  //when the player gets all the shade, the text appears
  if(finalScore == amountShade){
    push();
    textSize(40);
    textAlign(CENTER);
    text("CONDRAGULATIONS BABY!", width / 2, height / 2 + 200);
    pop();
  }

  imageMode(CENTER);
  image(logo, width / 2, height / 2, logo.width / 4, logo.height / 4);

//place volue mic into a variable
  var volume = mic.getLevel();

//set key movements of the player
  if (keyIsDown(LEFT_ARROW)) {
    x -= 6;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 6;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 6;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 6;
  }

//insert the image as icon and give it x and y variables as position so it can move following the user commands
  image(rupaulImg, x, y, rupaulImg.width / 4 + volume * 600, rupaulImg.height / 4 + volume * 600);

//place the font for the text
  textFont("VT323");
  drawingContext.font = "25px VT323";

//write the text and put it into variables
  var instruction = "Use ARROW KEYS to make Ru move";
  var sing = "Sing loud to make Ru dance";
  var challange = "Can you catch all the shade?";
  var score = finalScore + "/20";

//so that you can easily position them on the page
  fill(255, 229, 41);
  text(instruction, 20, 40);
  text(sing, 20, 60);
  text(challange, windowWidth - 300, 40);
  textSize(30);
  text(score, windowWidth - 300, 80);

}

//create the Shade element
function Shade(_x, _y, _diameter) {
  this.size = _diameter;
  this.x = _x;
  this.y = _y;
  this.color = color(255, 229, 41);

  var alive = true;

  this.dead = function() {
    var d = dist(x, y, this.x, this.y);
    if (d <= this.size) {
      return true;
    }else {
      return false;
    }
  }

  this.display = function() {
      image(shadeCoin, this.x, this.y, shadeCoin.width/8, shadeCoin.height/8);
  }
}
