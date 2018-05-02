let mapH = 7;
let mapW = 9;
let tileSize = 80;
let playerTileSize = 20;
let PlayerTurn = [1,2,3,4];

let gameCanv = document.getElementById("gameBoard");
let ctx = gameCanv.getContext("2d");

//Players Info
let Play1Position = 1;
let Play2Position = 1;
let Play3Position = 1;
let Play4Position = 1;


var myKey = "Player Positions";
var PlayerTileLocations = [];
function setupLocal() {

  if(localStorage.getItem(myKey) !== null) {
    let myItemsString = localStorage.getItem(myKey);
    myItems = JSON.parse(myItemsString);
    $(myItems).each(function() {
      createItem(this);
    });
  }
  else {
}

// $("#buttonElement").on("click", function() {
//   let curVal1 = Play1Position;
//   createItem(curVal1);
//   myItems.push(curVal1);
//   saveItems();
// });

}
function saveItems() {
  let myItemsString = JSON.stringify(myItems);
  localStorage.setItem(myKey, PlayerTileLocations);
}


  setupLocal();



//game board array
let gameMap = [
  23, 24, 25, 26, 27, 28, 29, 30, 31,
  22,  0,  0,  0,  0,  0,  0,  0,  0,
  21,  0,  0,  0,  0,  0,  0,  0,  0,
  20, 19, 18, 17, 16, 15, 14, 13, 12,
   0,  0,  0,  0,  0,  0,  0,  0, 11,
   0,  0,  0,  0,  0,  0,  0,  0, 10,
   1,  2,  3,  4,  5,  6,  7,  8,  9
];

//game loop
drawGameBoard();



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
    } else {
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
    if (gameMap[i].valueOf() == 31) {
      ctx.font = "20px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText("End", xPosition + 20, yPosition - tileSize/2);
    }

    //draw Players
    if (gameMap[i].valueOf() == Play1Position) {
      ctx.fillStyle = "red";
      ctx.fillRect(xPosition, yPosition - 80, playerTileSize, playerTileSize);
    }

    if (gameMap[i].valueOf() == Play2Position) {
      ctx.fillStyle = "blue";
      ctx.fillRect(xPosition + 59, yPosition - 80, playerTileSize, playerTileSize);
    }

    if (gameMap[i].valueOf() == Play3Position) {
      ctx.fillStyle = "green";
      ctx.fillRect(xPosition, yPosition - 21, playerTileSize, playerTileSize);
    }

    if (gameMap[i].valueOf() == Play4Position) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(xPosition + 59, yPosition - 21, playerTileSize, playerTileSize);
    }


    xPosition += tileSize;

  }

}




    function rollPlayer1() {
      let rollNum = Math.floor(Math.random() * 6) + 1;
      Play1Position += rollNum;
      if (Play1Position >= 31) {
        Play1Position = 31
      }
      drawGameBoard();

      console.log("Player 1 rolled a " + rollNum)

    }

    function rollPlayer2() {
      let rollNum = Math.floor(Math.random() * 6) + 1;
      Play2Position += rollNum;
      if (Play2Position >= 31) {
        Play2Position = 31
      }
      drawGameBoard();

      console.log("Player 2 rolled a " + rollNum)

    }

    function rollPlayer3() {
      let rollNum = Math.floor(Math.random() * 6) + 1;
      Play3Position += rollNum;
      if (Play3Position >= 31) {
        Play3Position = 31
      }
      drawGameBoard();

      console.log("Player 3 rolled a " + rollNum)

    }

    function rollPlayer4() {
      let rollNum = Math.floor(Math.random() * 6) + 1;
      Play4Position += rollNum;
      if (Play4Position >= 31) {
        Play4Position = 31
      }
      drawGameBoard();

      console.log("Player 4 rolled a " + rollNum)

    }

    function Nuke() {
       Play1Position = 1;
       Play2Position = 1;
       Play3Position = 1;
       Play4Position = 1;
       drawGameBoard();
    }
