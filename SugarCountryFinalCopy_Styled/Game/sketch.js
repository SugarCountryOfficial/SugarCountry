//Defining Variables
let mapH = 7;
let mapW = 20;
let tileSize = 80;
let playerTileSize = 20;
let PlayerTurn = [1,2,3,4];

let gameCanv = document.getElementById("gameBoard");
let ctx = gameCanv.getContext("2d");

//Players Info
var Play1Position = 1;
var Play2Position = 1;
var Play3Position = 1;
var Play4Position = 1;
var myKey = "playerPositions";
var PlayerTileLocations = [1,1,1,1];
var Turn = 1;
var LeaderboardInfo = [1,1,1,1];

//Save Player Position for Refresh

//Setup Game Info
function setupLocal() {
  if(localStorage.getItem(myKey) !== null) {
    let myItemsString = localStorage.getItem(myKey);
    PlayerTileLocations = JSON.parse(myItemsString);
    $(PlayerTileLocations).each(function() {
      Play1Position = PlayerTileLocations[0];
      Play2Position = PlayerTileLocations[1];
      Play3Position = PlayerTileLocations[2];
      Play4Position = PlayerTileLocations[3];
      //PlayerLeaderboard();
    });
  }

  EndGameMenu();

  //Player Button Click Functions
  $("#Player1Button").on("click", function() {
    if (Turn == 1) {
      rollPlayer1();
      PlayerTileLocations[0] = Play1Position;
      PlayerLeaderboard();
      Turn = (Turn % 4) +1;
      $('.myTurn').removeClass('myTurn');
      $("#Player2Hud").addClass('myTurn');
      console.log(Turn);
      saveTileLocations();
      saveTurns()
    }

  });

  $("#Player2Button").on("click", function() {
    if (Turn == 2) {
      rollPlayer2();
      PlayerTileLocations[1] = Play2Position;
      PlayerLeaderboard()
      Turn = (Turn % 4) +1;
      $('.myTurn').removeClass('myTurn');
      $("#Player3Hud").addClass('myTurn');
      console.log(Turn);
      saveTileLocations();
      saveTurns()
    }

  });

  $("#Player3Button").on("click", function() {
    if (Turn == 3) {
      rollPlayer3();
      PlayerTileLocations[2] = Play3Position;
      PlayerLeaderboard()
      Turn = (Turn % 4) +1;
      $('.myTurn').removeClass('myTurn');
      $("#Player4Hud").addClass('myTurn');
      console.log(Turn);
      saveTileLocations();
      saveTurns()
    }

  });

  $("#Player4Button").on("click", function() {
    if (Turn == 4) {
      rollPlayer4();
      PlayerTileLocations[3] = Play4Position;
      PlayerLeaderboard()
      Turn = (Turn % 4) +1;
      $('.myTurn').removeClass('myTurn');
      $("#Player1Hud").addClass('myTurn');
      console.log(Turn);
      saveTileLocations();
      saveTurns()
    }

  });

  //nuke button
  $("#NukeButton").on("click", function() {
    Nuke();
    PlayerTileLocations = [1,1,1,1];
    Turn = 1;
    $('.myTurn').removeClass('myTurn');
    $("#Player1Hud").addClass('myTurn');
    saveTileLocations();
    saveTurns();
  })


} // setupLocal

var myKeyTurns = "Player Turn";

function setupLocalTurns() {
  console.log("Retrieving Turns");
  if(localStorage.getItem(myKeyTurns) !== null) {
    Turn = localStorage.getItem(myKeyTurns);
    if (Turn == 1) {
      $("#Player1Hud").addClass("myTurn");
    };
    if (Turn == 2) {
      $("#Player2Hud").addClass("myTurn");
    };
    if (Turn == 3) {
      $("#Player3Hud").addClass("myTurn");
    };
    if (Turn == 4) {
      $("#Player4Hud").addClass("myTurn");
    };
  }
  console.log("Retrieved Turns");
} //End setupLocalTurns

function saveTurns() {
  console.log("Turn " + Turn);
  localStorage.setItem(myKeyTurns, Turn);
} //End SaveItemsTurn

function saveTileLocations() {
  console.log("Starting save");
  console.log(PlayerTileLocations);
  let myItemsString = JSON.stringify(PlayerTileLocations);
  localStorage.setItem(myKey, myItemsString);
  console.log("Finished save");
}

//game board array
let gameMap = [
   7,  8,  9,  0, 23, 24, 25,  0, 49, 50, 51, 52, 53, 54, 55, 56,  0, 70, 71, 72,
   6,  0, 10,  0, 22,  0, 26,  0, 48,  0,  0,  0,  0,  0,  0, 57,  0, 69,  0,  0,
   5,  0, 11,  0, 21,  0, 27,  0, 47,  0,  0,  0,  0,  0,  0, 58,  0, 68,  0,  0,
   4,  0, 12,  0, 20,  0, 28,  0, 46,  0,  0,  0,  0,  0,  0, 59,  0, 67,  0,  0,
   3,  0, 13,  0, 19,  0, 29,  0, 45, 44, 43, 42, 41, 40,  0, 60,  0, 66,  0,  0,
   2,  0, 14,  0, 18,  0, 30,  0,  0,  0,  0,  0,  0, 39,  0, 61,  0, 65,  0,  0,
   1,  0, 15, 16, 17,  0, 31, 32, 33, 34, 35, 36, 37, 38,  0, 62, 63, 64,  0,  0
];

//draw game function
function drawGameBoard() {
  let xPosition = 0;
  let yPosition = 0;
  for (let i = 0; i < gameMap.length; i++) {
    //reset for new row
    if (i % (mapW) == 0) {
      yPosition += tileSize;
      xPosition = 0;
    }
    if (gameMap[i].valueOf() == 0) {
      //out of bounds tiles
      ctx.fillStyle = "#664444";
      ctx.fillRect(xPosition, yPosition - 80, tileSize-1, tileSize-1);
    }
    else if (gameMap[i].valueOf() % 5 == 0 && gameMap[i].valueOf() != 40 && gameMap[i].valueOf() != 60) {
      //special tiles
      ctx.fillStyle = "#ff9933";
      ctx.fillRect(xPosition, yPosition - 80, tileSize-1, tileSize-1);
    }
    else if (gameMap[i].valueOf() == 40 || gameMap[i].valueOf() == 60) {
      //SUPER special tile
      ctx.fillStyle = "#ccff33";
      ctx.fillRect(xPosition, yPosition - 80, tileSize-1, tileSize-1);
    }
    else {
      //in-bounds tiles
      ctx.fillStyle = "#C3B3D7";
      ctx.fillRect(xPosition, yPosition - 80, tileSize-1, tileSize-1);
    }

    //start and end tiles
    if (gameMap[i].valueOf() == 1) {
      ctx.font = "20px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText("Start", xPosition + 20, yPosition - tileSize/2);
    }
    if (gameMap[i].valueOf() == 72) {
      ctx.font = "20px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText("End", xPosition + 20, yPosition - tileSize/2);
    }

    //draw Players
    if (gameMap[i].valueOf() == Play1Position) {
      ctx.fillStyle = "red";
      ctx.fillRect(xPosition, yPosition - 80, playerTileSize, playerTileSize);
      ctx.fillStyle = "black";
      ctx.fillText("1", xPosition + 5, yPosition - 65);
    }

    if (gameMap[i].valueOf() == Play2Position) {
      ctx.fillStyle = "blue";
      ctx.fillRect(xPosition + 59, yPosition - 80, playerTileSize, playerTileSize);
      ctx.fillStyle = "black";
      ctx.fillText("2", xPosition + 64, yPosition - 65);
    }

    if (gameMap[i].valueOf() == Play3Position) {
      ctx.fillStyle = "green";
      ctx.fillRect(xPosition, yPosition - 21, playerTileSize, playerTileSize);
      ctx.fillStyle = "black";
      ctx.fillText("3", xPosition + 5, yPosition - 5);
    }

    if (gameMap[i].valueOf() == Play4Position) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(xPosition + 59, yPosition - 21, playerTileSize, playerTileSize);
      ctx.fillStyle = "black";
      ctx.fillText("4", xPosition + 64, yPosition - 5);
    }

    xPosition += tileSize;

  }
}//End Draw Gameboard

function rollPlayer1() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play1Position += rollNum;
  if (Play1Position >= 72) {
    Play1Position = 72;
  }
  drawGameBoard();
  console.log("Player 1 rolled a " + rollNum);
  $('#status').text("Player 1 rolled a " + rollNum + "!");
  Play1Position = specialTileCheck(Play1Position, 1);
  drawGameBoard();
} //End Roll Player 1

function rollPlayer2() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play2Position += rollNum;
  if (Play2Position >= 72) {
    Play2Position = 72;
  }
  drawGameBoard();
  console.log("Player 2 rolled a " + rollNum);
  $('#status').text("Player 2 rolled a " + rollNum + "!");
  Play2Position = specialTileCheck(Play2Position, 2);
  drawGameBoard();
} //End Roll Player 2

function rollPlayer3() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play3Position += rollNum;
  if (Play3Position >= 72) {
    Play3Position = 72;
  }
  drawGameBoard();
  console.log("Player 3 rolled a " + rollNum);
  $('#status').text("Player 3 rolled a " + rollNum + "!");
  Play3Position = specialTileCheck(Play3Position, 3);
  drawGameBoard();
} //End Roll Player 3

function rollPlayer4() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play4Position += rollNum;
  if (Play4Position >= 72) {
    Play4Position = 72;
  }
  drawGameBoard();
  console.log("Player 4 rolled a " + rollNum);
  $('#status').text("Player 4 rolled a " + rollNum + "!");
  Play4Position = specialTileCheck(Play4Position, 4);
  drawGameBoard();
} //End Roll Player 4

function Nuke() {
   Play1Position = 1;
   Play2Position = 1;
   Play3Position = 1;
   Play4Position = 1;
   drawGameBoard();
   $('#status').text("");
   $("ol").empty();
   LeaderboardInfo = [1,1,1,1];
   PlayerLeaderboard();
}
function nukeEndGame() {
  Play1Position = 1;
  Play2Position = 1;
  Play3Position = 1;
  Play4Position = 1;
  drawGameBoard();
  $('#status').text("");
  $("ol").empty();
  LeaderboardInfo = [1,1,1,1];
  PlayerLeaderboard();
  $('#overlay-content li:last-child').remove();
  closeNav();
} //End Nuke Function


//*****************Leaderboard*****************//
function PlayerLeaderboard() {
  //LeaderboardInfo = PlayerTileLocations.slice();
  //LeaderboardInfo.sort(function(a,b){return b-a});

  let leaderboardWithNames = [];

  for (var i = 0; i < PlayerTileLocations.length; i++) {
    leaderboardWithNames[i] = [PlayerTileLocations[i], "Player " + (i+1)];
  }

  //alert(leaderboardWithNames[0][1]);

  leaderboardWithNames.sort(function(a,b){
    let x = a[0];
    let y = b[0];

    return y-x;

  });
  //alert(leaderboardWithNames);

  let myPlayerLB;
  for (let i = 0; i < PlayerTileLocations.length; i++) {
    let $newItemLB = $("<li></li>").text(leaderboardWithNames[i][1] + " at " + leaderboardWithNames[i][0]);
    $("#Leaderboard").append($newItemLB);
    switch (leaderboardWithNames[i][1]) {
      case "Player 1":
        $newItemLB.addClass('player1color');
        break;
      case "Player 2":
        $newItemLB.addClass('player2color');
        break;
      case "Player 3":
        $newItemLB.addClass('player3color');
        break;
      case "Player 4":
        $newItemLB.addClass('player4color');
        break;
      default:
        break;
    }//End switch
  }//End For
} //End Function PlayerLeaderboard

//special tiles checker
function specialTileCheck(myPosition, player) {
  if (myPosition % 5 == 0 && myPosition != 40 && myPosition != 60) {
    alert("Player " + player + " landed on a special tile!");
    let mySpecial = Math.floor(Math.random() * 3) + 1;  //which special player gets
    let tileAmount = Math.floor(Math.random() * 3) + 1; //how many tiles goes forward/backward
    switch (mySpecial) {
      case 1:
        alert("Player " + player + " go forward " + tileAmount + " tiles!");
        myPosition += tileAmount;
        break;
      case 2:
        alert("Player " + player + " go back " + tileAmount + " tiles!");
        myPosition -= tileAmount;
        break;
      case 3:
        alert("Player " + player + " loses a turn");
        break;
      default:
        break;
    }
  }
  if (myPosition == 40) {
    alert("Player " + player + " landed on a SUPER special tile!");
    myPosition += 20;
  }
  return myPosition;

}

//-------------------------End Game Menu ------------------------//

function EndGameMenu() {
  if (Play1Position == 72) {
    $("#overlay-content").append($("<li> </li>").text("Player 1 Wins!"));
    openNav();
  }
  if (Play2Position == 72) {
    $("#overlay-content").append($("<li> </li>").text("Player 2 Wins!"));
    openNav();
  }
  if (Play3Position == 72) {
    $("#overlay-content").append($("<li> </li>").text("Player 3 Wins!"));
    openNav();
  }
  if (Play4Position == 72) {
    $("#overlay-content").append($("<li> </li>").text("Player 4 Wins!"));
    openNav();
  }
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}




//Forced Functions
setupLocal();
setupLocalTurns();
drawGameBoard();
PlayerLeaderboard();
EndGameMenu();
