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

//Save Player Position for Refresh

function setupLocal() {
  console.log("Starting Setup");
  if(localStorage.getItem(myKey) !== null) {
    let myItemsString = localStorage.getItem(myKey);
    PlayerTileLocations = JSON.parse(myItemsString);
    $(PlayerTileLocations).each(function() {
      Play1Position = PlayerTileLocations[0];
      Play2Position = PlayerTileLocations[1];
      Play3Position = PlayerTileLocations[2];
      Play4Position = PlayerTileLocations[3];
    });
  }

  $("#Player1Button").on("click", function() {
    rollPlayer1();
    PlayerTileLocations[0] = Play1Position;
    saveItems();
  })

  $("#Player2Button").on("click", function() {
    rollPlayer2();
    PlayerTileLocations[1] = Play2Position;
    saveItems();
  })

  $("#Player3Button").on("click", function() {
    rollPlayer3();
    PlayerTileLocations[2] = Play3Position;
    saveItems();
  })

  $("#Player4Button").on("click", function() {
    rollPlayer4();
    PlayerTileLocations[3] = Play4Position;
    saveItems();
  })
  $("#NukeButton").on("click", function() {
    Nuke();
    PlayerTileLocations = [1,1,1,1];
    saveItems();
  })
  ;
  console.log("Finished Setup");


} // setupLocal

function saveItems() {
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

}

function rollPlayer1() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play1Position += rollNum;
  if (Play1Position >= 72) {
    Play1Position = 72;
  }
  PlayerLeaderboard();
  drawGameBoard();

  console.log("Player 1 rolled a " + rollNum);
  $('#status').text("Player 1 rolled a " + rollNum + "!");


}

function rollPlayer2() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play2Position += rollNum;
  if (Play2Position >= 72) {
    Play2Position = 72;
  }
  PlayerLeaderboard();
  drawGameBoard();

  console.log("Player 2 rolled a " + rollNum);
    $('#status').text("Player 2 rolled a " + rollNum + "!");


}

function rollPlayer3() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play3Position += rollNum;
  if (Play3Position >= 72) {
    Play3Position = 72;
  }
  PlayerLeaderboard();
  drawGameBoard();

  console.log("Player 3 rolled a " + rollNum);
    $('#status').text("Player 3 rolled a " + rollNum + "!");



}

function rollPlayer4() {
  $("ol").empty();
  let rollNum = Math.floor(Math.random() * 6) + 1;
  Play4Position += rollNum;
  if (Play4Position >= 72) {
    Play4Position = 72;
  }
  PlayerLeaderboard();
  drawGameBoard();

  console.log("Player 4 rolled a " + rollNum);
    $('#status').text("Player 4 rolled a " + rollNum + "!");


}

function Nuke() {
   Play1Position = 1;
   Play2Position = 1;
   Play3Position = 1;
   Play4Position = 1;
   drawGameBoard();
   $('#status').text("");
   $("ol").empty();
}


//*****************THICCBOI*****************//
function PlayerLeaderboard() {
  if (Play1Position > Play2Position && Play1Position > Play3Position && Play1Position > Play4Position) {
     $("#Leaderboard").append($("<li> id='Score'").text("Player 1 at: " + Play1Position));

     if (Play2Position > Play3Position && Play2Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));

        if (Play3Position > Play4Position) {
            $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
            $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        } //End 3 > 4
        if (Play4Position > Play3Position) {
            $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
            $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        } //End 4 > 3

    } // End 2 > 3 + 4

    if (Play3Position > Play2Position && Play2Position > Play4Position) {
       $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));

       if (Play2Position > Play4Position) {
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
           $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
       } //End 2 > 4
       if (Play4Position > Play2Position) {
           $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
      } //End 4 > 2

    } // End 3 > 2 + 4

    if (Play4Position > Play2Position && Play2Position > Play3Position) {
       $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));

       if (Play2Position > Play3Position) {
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
           $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
       } //End 2 > 3
       if (Play3Position > Play2Position) {
           $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
      } //End 3 > 2

    } // End 3 > 2 + 4

  } // End 1 > 2 + 3 + 4

//*********************************THICCBOIv2****************************//
//Begin 2 > 3 + 4 + 1
  if (Play2Position > Play1Position && Play2Position > Play3Position && Play2Position > Play4Position) {
     $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));

     if (Play1Position > Play3Position && Play1Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));

        if (Play3Position > Play4Position) {
            $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
            $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        } //End 3 > 4
        if (Play4Position > Play3Position) {
            $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
            $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        } //End 4 > 3

    } // End 1 > 3 + 4

    if (Play3Position > Play1Position && Play3Position > Play4Position) {
       $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));

       if (Play1Position > Play4Position) {
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
           $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
       } //End 1 > 4
       if (Play4Position > Play1Position) {
           $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
      } //End 4 > 1

    } // End 3 > 1 + 4

    if (Play4Position > Play1Position && Play4Position > Play3Position) {
       $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));

       if (Play1Position > Play3Position) {
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
           $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
       } //End 1 > 3
       if (Play3Position > Play1Position) {
           $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
      } //End 3 > 1

    } // End 4 > 1 + 3

  } // End 2 > 1 + 3 + 4

//*********************************THICCBOIv3****************************//
//Begin 3 > 1 + 2 + 4
  if (Play3Position > Play1Position && Play3Position > Play2Position && Play3Position > Play4Position) {
     $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));

     if (Play1Position > Play2Position && Play1Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));

        if (Play4Position > Play2Position) {
            $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
            $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
        } //End 4 > 2
        if (Play2Position > Play4Position) {
            $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
            $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        } //End 2 > 4

    } // End 1 > 2 + 4

    if (Play2Position > Play1Position && Play2Position > Play4Position) {
       $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));

       if (Play1Position > Play4Position) {
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
           $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
       } //End 1 > 4
       if (Play4Position > Play1Position) {
           $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
      } //End 4 > 1

    } // End 2 > 1 + 4

    if (Play4Position > Play1Position && Play4Position > Play2Position) {
       $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));

       if (Play1Position > Play2Position) {
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
       } //End 1 > 2
       if (Play2Position > Play1Position) {
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
      } //End 3 > 1

    } // End 4 > 1 + 2

  } // End 3 > 1 + 2 + 4

//*********************************THICCBOIv4****************************//
//Begin 4 > 1 + 2 + 3
  if (Play4Position > Play1Position && Play4Position > Play2Position && Play4Position > Play3Position) {
     $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));

     if (Play1Position > Play2Position && Play1Position > Play3Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));

        if (Play3Position > Play2Position) {
            $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
            $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
        } //End 3 > 2
        if (Play2Position > Play2Position) {
            $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
            $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        } //End 2 > 3

    } // End 1 > 2 + 3

    if (Play2Position > Play1Position && Play2Position > Play3Position) {
       $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));

       if (Play1Position > Play3Position) {
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
           $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
       } //End 1 > 3
       if (Play3Position > Play1Position) {
           $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
      } //End 3 > 1

    } // End 2 > 1 + 3

    if (Play3Position > Play1Position && Play3Position > Play2Position) {
       $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));

       if (Play1Position > Play2Position) {
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
       } //End 1 > 2
       if (Play2Position > Play1Position) {
           $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
           $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
      } //End 3 > 1

    } // End 3 > 1 + 2

  } // End 4 > 1 + 2 + 3

//*********************************BEGIN TIES****************************//
  if (Play1Position == Play2Position) {
      $("#Leaderboard").append($("<li>").text("Player 1 and Player 2 are tied at: " + Play1Position));

      if (Play3Position > Play4Position) {
          $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
          $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
      } //End 3 > 4
      if (Play4Position > Play3Position) {
          $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
          $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
      } //End 4 > 3
      if (Play4Position == Play3Position) {
          $("#Leaderboard").append($("<li>").text("Player 3 and Player 4 are tied at: " + Play3Position));
      } //End 4 = 3

  }//End 1 = 2
  if (Play1Position == Play3Position) {
      $("#Leaderboard").append($("<li>").text("Player 1 and Player 3 are tied at: " + Play1Position));

      if (Play2Position > Play4Position) {
          $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
          $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
      } //End 2 > 4
      if (Play4Position > Play2Position) {
          $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
          $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
      } //End 4 > 2
      if (Play4Position == Play2Position) {
          $("#Leaderboard").append($("<li>").text("Player 2 and Player 4 are tied at: " + Play4Position));
      } //End 4 = 2

  }//End 1 = 3
  if (Play1Position == Play4Position) {
      $("#Leaderboard").append($("<li>").text("Player 1 and Player 4 are tied at: " + Play1Position));

      if (Play2Position > Play3Position) {
          $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
          $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
      } //End 2 > 3
      if (Play3Position > Play2Position) {
          $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
          $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
      } //End 3 > 2
      if (Play3Position == Play2Position) {
          $("#Leaderboard").append($("<li>").text("Player 2 and Player 3 are tied at: " + Play4Position));
      } //End 3 = 2

  }//End 1 = 4

//End 1 ==
//*********************************Play2 TIES****************************//
if (Play2Position == Play1Position) {
    $("#Leaderboard").append($("<li>").text("Player 2 and Player 1 are tied at: " + Play2Position));

    if (Play3Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
    } //End 3 > 4
    if (Play4Position > Play3Position) {
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
    } //End 4 > 3
    if (Play4Position == Play3Position) {
        $("#Leaderboard").append($("<li>").text("Player 3 and Player 4 are tied at: " + Play3Position));
    } //End 4 = 3

}//End 2 = 1
if (Play2Position == Play3Position) {
    $("#Leaderboard").append($("<li>").text("Player 2 and Player 3 are tied at: " + Play2Position));

    if (Play1Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
    } //End 1 > 4
    if (Play4Position > Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
    } //End 4 > 1
    if (Play4Position == Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 and Player 4 are tied at: " + Play1Position));
    } //End 4 = 1

}//End 2 = 3
if (Play2Position == Play4Position) {
    $("#Leaderboard").append($("<li>").text("Player 2 and Player 4 are tied at: " + Play2Position));

    if (Play1Position > Play3Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
    } //End 1 > 3
    if (Play3Position > Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
    } //End 3 > 1
    if (Play3Position == Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 and Player 3 are tied at: " + Play1Position));
    } //End 3 = 1

}//End 2 = 4

//End 2 ==
//*********************************Play3 TIES****************************//
if (Play3Position == Play1Position) {
    $("#Leaderboard").append($("<li>").text("Player 3 and Player 1 are tied at: " + Play3Position));

    if (Play2Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
    } //End 3 > 4
    if (Play4Position > Play2Position) {
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
    } //End 4 > 3
    if (Play4Position == Play2Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 and Player 4 are tied at: " + Play2Position));
    } //End 4 = 2

}//End 3 = 1
if (Play3Position == Play2Position) {
    $("#Leaderboard").append($("<li>").text("Player 3 and Player 2 are tied at: " + Play3Position));

    if (Play1Position > Play4Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
    } //End 1 > 4
    if (Play4Position > Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 4 at: " + Play4Position));
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
    } //End 4 > 1
    if (Play4Position == Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 and Player 4 are tied at: " + Play1Position));
    } //End 4 = 1

}//End 3 = 2
if (Play3Position == Play4Position) {
    $("#Leaderboard").append($("<li>").text("Player 3 and Player 4 are tied at: " + Play2Position));

    if (Play1Position > Play2Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
    } //End 1 > 2
    if (Play2Position > Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
    } //End 2 > 1
    if (Play2Position == Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 and Player 2 are tied at: " + Play1Position));
    } //End 2 = 1

}//End 3 = 4
//*********************************Play4 TIES****************************//
if (Play4Position == Play1Position) {
    $("#Leaderboard").append($("<li>").text("Player 4 and Player 1 are tied at: " + Play4Position));

    if (Play2Position > Play3Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
    } //End 2 > 3
    if (Play3Position > Play2Position) {
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
    } //End 3 > 2
    if (Play3Position == Play2Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 and Player 3 are tied at: " + Play4Position));
    } //End 3 = 2

}//End 4 = 1
if (Play4Position == Play2Position) {
    $("#Leaderboard").append($("<li>").text("Player 3 and Player 2 are tied at: " + Play3Position));

    if (Play1Position > Play3Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
    } //End 1 > 3
    if (Play3Position > Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 3 at: " + Play3Position));
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
    } //End 3 > 1
    if (Play3Position == Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 and Player 3 are tied at: " + Play1Position));
    } //End 3 = 1

}//End 4 = 2
if (Play4Position == Play3Position) {
    $("#Leaderboard").append($("<li>").text("Player 3 and Player 4 are tied at: " + Play2Position));

    if (Play1Position > Play2Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
    } //End 1 > 2
    if (Play2Position > Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 2 at: " + Play2Position));
        $("#Leaderboard").append($("<li>").text("Player 1 at: " + Play1Position));
    } //End 2 > 1
    if (Play2Position == Play1Position) {
        $("#Leaderboard").append($("<li>").text("Player 1 and Player 2 are tied at: " + Play1Position));
    } //End 2 = 1

}//End 4 = 3

//End 4 ==
} //End Function PlayerLeaderboard


setupLocal();
drawGameBoard();
