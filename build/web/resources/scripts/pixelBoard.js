function PixelBoard(){
  
  //the constants for the pixel board
  //define default pixel color and pixel density for the game board
  this.BORDER_COLOR = '#555555';
  this.PIXEL_COLOR = '#000000';
  this.BOARD_WIDTH = 5;
  this.BOARD_HEIGHT = 5;

  this.init = function(){
    this.makePixels();
    this.sizeBoard();
  };

  this.makePixels = function(){
    for (var i=0; i<this.BOARD_WIDTH; i++){
      $('<style>.row'+i+'{ top:'+(i*(100/this.BOARD_HEIGHT))+'%; }</style>').appendTo('head');
      $('<style>.column'+i+'{ left:'+(i*(100/this.BOARD_WIDTH))+'%; }</style>').appendTo('head');
      for (var j=0; j<this.BOARD_HEIGHT; j++){
        
        $('<div/>', {
        "class": 'pixel row'+i+' column'+j
        }).appendTo('#board');
      }
    }
  };
  this.getPixel = function(x,y){
    return $('.row'+y+'.column'+x);
  };
  this.colorPixel = function(x,y,bg = this.PIXEL_COLOR, border = this.BORDER_COLOR){
  var pixel = this.getPixel(x,y);
  pixel.css("background-color",bg);
  pixel.css("border-color",border);
  };

  this.clearBoard =function(){
    for (var i=0; i<this.BOARD_WIDTH; i++){
      for (var j=0; j<this.BOARD_HEIGHT; j++){
        this.colorPixel(i,j);  
      }
    }
  };

  this.sizeBoard = function(){
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    if(winHeight>winWidth){
      //configure portrait mode;
      $('#board').height(winWidth);
      $('#board').width(winWidth);
      $('#hud').height(winHeight-winWidth);
      $('#hud').width(winWidth);
      $('#hud').offset({ top: winWidth, left: 0 });
    }else{
      $('#board').height(winHeight);
      $('#board').width(winHeight);
      $('#hud').width(winWidth-winHeight);
      $('#hud').height(winHeight);
      $('#hud').offset({ top: 0, left: winHeight });
    }
  };

  this.writeScore=function(score){
    $('#score').html('Score: '+score);
  };

}