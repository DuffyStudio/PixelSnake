var STARTING_SPEED = 12;
var gameWidth;
var gameHeight;
var score =0;
//make snake constructor
function Snake(){
  this.color='#090';
  this.borderColor='#0F0';
  this.x = 5;
  this.y = 4;
  this.length = 1;
  this.tail = [];
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.frameTimer = 0;

  this.eat = function(food){
    if((this.x === food.x) && (this.y === food.y)){
      this.tail.push(new TailSection(this.x,this.y));
      return true;
    }
    else{return false;}
  };

  this.crash = function(){
    for(var i=0; i<this.tail.length;i++){
      if((this.x === this.tail[i].x) && (this.y === this.tail[i].y)){
        return true;
      }
    }
    return false;
  };

  this.move = function(){
    this.tail.push(new TailSection(this.x,this.y));
    this.tail.shift();
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    if(this.x>=gameWidth){
      this.x = 0;
    }else if(this.x<0){
      this.x=gameWidth-1;
    }
    if(this.y>=gameHeight){
      this.y = 0;
    }else if(this.y<0){
      this.y=gameHeight-1;
    }
    
  };

  this.turn = function(dir){
    switch(dir){
      case("up"):
        if(this.ySpeed!==1){
          this.xSpeed = 0;
          this.ySpeed = -1;
        }
        break;
      case("down"):
        if(this.ySpeed!==-1){
          this.xSpeed = 0;
          this.ySpeed = 1;
        }
        break;
      case("left"):
        if(this.xSpeed!==1){
          this.xSpeed = -1;
          this.ySpeed = 0;
        }
        break;
      case("right"):
        if(this.xSpeed!==-1){
          this.xSpeed = 1;
          this.ySpeed = 0;
        }
        break;
    }
  };

  this.draw = function(pixelBoard){
    pixelBoard.colorPixel(this.x,this.y,this.color,this.borderColor);
    for(var i=0; i<this.tail.length;i++){
      this.tail[i].draw(pixelBoard);
    }
  };
}
//end snake constructor
//make tailSection constructor
function TailSection(x,y){
  this.color='#090';
  this.borderColor='#0F0';
  this.x=x;
  this.y=y;

  this.draw = function(pixelBoard){
    pixelBoard.colorPixel(this.x,this.y,this.color,this.borderColor);
  };
}
//end tailSection constructor
//make apple constructor
function Apple(){
  this.color='#900';
  this.borderColor='#F00';
  this.x = Math.floor(Math.random()*gameWidth);
  this.y = Math.floor(Math.random()*gameHeight);

  this.draw = function(pixelBoard){
    pixelBoard.colorPixel(this.x,this.y,this.color,this.borderColor);
  };

}
//end apple constructor
//make game constuctor 
function SnakeGame(pixelBoard){
  this.currentSpeed = STARTING_SPEED;
  this.snake = new Snake();
  this.apple = new Apple();
  this.display = pixelBoard;

  this.update = function(){
    score+=Math.floor(50/this.currentSpeed);
    this.display.writeScore(score);
    this.snake.move();
    if(this.snake.crash()){
      //game over here!
      console.log("Game over score is: "+score+"!");
      endGame();
      score = 0;
      this.snake.tail = [];
      this.currentSpeed = STARTING_SPEED;
    }
    if(this.snake.eat(this.apple)){
      score+=1000;
      this.apple = new Apple();
      if(this.currentSpeed>2){
        this.currentSpeed-=.25;
      }
    }
  };
  
  this.controlIn = function(control){
    this.snake.turn(control);
  };

  this.draw = function(){
    this.display.clearBoard();
    this.snake.draw(this.display);
    this.apple.draw(this.display);
  };

  this.loop = function(self,frame){
    frame++;
    if(frame>=this.currentSpeed){
      frame = 0;
      self.update();
      self.draw();
    }
    window.requestAnimationFrame(function(){self.loop(self,frame);});
  };

}
//end game constructor

//init snake game !Needs pixelBoard.js
var game;

//these names are from index.html
var controlUp = function(){};
var controlDown = function(){};
var controlLeft = function(){};
var controlRight = function(){};

//attach keypress events
 $(window).keydown(function(e) {
  switch(e.code){
    case('ArrowUp'):
      controlUp();
      break;
    case('ArrowDown'):
      controlDown();
      break;
    case('ArrowLeft'):
      controlLeft();
      break;
    case('ArrowRight'):
      controlRight();
      break;
    default:
      console.log(e);
  }
});

function init(){
  pixelBoard = new PixelBoard();
  pixelBoard.init();
  gameWidth = pixelBoard.BOARD_WIDTH;
  gameHeight = pixelBoard.BOARD_HEIGHT;
  game = new SnakeGame(pixelBoard);

  //init values !Needs pixelBoard.js
  
  controlUp = function(){game.controlIn('up');};
  controlDown = function(){game.controlIn('down');};
  controlLeft = function(){game.controlIn('left');};
  controlRight = function(){game.controlIn('right');};

  //attach resize handler
  $( window ).resize(function() {
    game.display.sizeBoard();
  });
  
  window.requestAnimationFrame(function(){game.loop(game,STARTING_SPEED);});
}
//init();