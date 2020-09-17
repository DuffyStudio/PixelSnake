<%-- 
    Document   : index
    Created on : Sep 17, 2020, 9:48:45 AM
    Author     : Duffy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Pixel Snake</title>
    <link href="./resources/styles/style.css" rel="stylesheet" type="text/css" />
    <!-- jQuery include -->
    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>
    <script src="./resources/scripts/pixelBoard.js"></script>
    <script src="./resources/scripts/snake.js"></script>
  </head>
  <body>
    <div id="board">
    </div>
    <div id="hud">
      <button class="arrowButton" id="arrowUp" onclick="controlUp()"></button>
      <button class="arrowButton" id="arrowDown" onclick="controlDown()"></button>
      <button class="arrowButton" id="arrowLeft" onclick="controlLeft()"></button>
      <button class="arrowButton" id="arrowRight" onclick="controlRight()"></button>
      <div id="score"></div>
    </div>
      <div id="hudblock">
          <div id="nameentry">
            <h1>Welcome to PIXEL Snake</h1>
            <span>Enter your name:</span><input id="pName" type="text"/>
            <input type ="button" onclick="startgame()" value="Play"/>
          </div>
          <div id="scoreboard">
            <h1>Game Over!</h1>
            <h3 id="scoreReport"></h3>
            <form action="posthighscore" method="post">
                <input id="nameInput" class="hidden" type="text" name="player_name"/>
                <input id="scoreInput" class="hidden" type="number" name="score"/>
                <input type="submit"/>
            </form>
          </div>
          <div id="snakeLogo">
              <img src="./resources/images/pixelsnakeLogo.png"/>
          </div>
      </div>
    <script>
        var playerName ="";
        $("#scoreboard").hide();
        function startgame(){
            playerName=$("#pName").val();
            $("#nameentry").hide();
            $("#hudblock").hide();
            init();
            console.log(playerName);
        }
        function endGame(){
            $("#hudblock").show();
            $("#scoreboard").show();
            $("#nameInput").hide();
            $("#scoreInput").hide();
            $("#nameInput").val(playerName);
            $("#scoreInput").val(score);
            $("#scoreReport").text("Congratulations "+playerName+" you scored "+score+"!");
        }
    </script>
  </body>
</html>