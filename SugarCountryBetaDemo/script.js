//variables carried over to game
var numberOfPlayers = 2;
var icons = [
  "candyCane",
  "cottonCandy",
  "lollipop",
  "wrappedCandy"
];

var playersIcon = [
  icons[0],       //Player 1
  icons[1],       //Player 2
  icons[2],       //Player 3
  icons[3]        //Player 4
];

//clipart source: openclipart.org


//main menu scripting
function runMenu() {
  createPlayerTables();

  $('.selectionTable').on('click', function() {
    $('.selectionHighlight').removeClass('selectionHighlight');
    $(this).addClass('selectionHighlight');
    numberOfPlayers = $(this).val();

    createPlayerTables();


  });


}

function createPlayerTables() {
  $("#tableRow").empty();
  for (let i = 0; i < numberOfPlayers; i++) {
    //let playerNum = i + 1;

    let $newPlayer = $("<th></th>").text("Player " + (i+1)).addClass('playerTable');
    $newPlayer.append('<br><br>');

    let myIcon = i;
    setPlayerPicture($newPlayer, playersIcon[i]);

    //change character icon
    $newPlayer.on('click', function(){
      myIcon = ++myIcon % 4;
      playersIcon[i] = icons[myIcon];
      changePlayerPicture($newPlayer, i, playersIcon[i]);


    });


    $("#tableRow").append($newPlayer);

  }


}

function setPlayerPicture($newPlayer, icon) {
  switch (icon) {
    case "candyCane":
      $newPlayer.append('<img class="playerImg" src="Pictures/candyCane.png" />');
      break;
    case "cottonCandy":
      $newPlayer.append('<img class="playerImg" src="Pictures/cottonCandy.png" />');
      break;
    case "lollipop":
      $newPlayer.append('<img class="playerImg" src="Pictures/lollipop.png" />');
      break;
    case "wrappedCandy":
      $newPlayer.append('<img class="playerImg" src="Pictures/wrappedCandy.png" />');
      break;
    default:
      $newPlayer.append('<img class="playerImg" src="Pictures/candyCane.png" />');
      break;


  }
}

function changePlayerPicture($newPlayer, i, newIcon){
  $newPlayer.empty();
  $newPlayer.append("<th></th>").text("Player " + (i+1)).addClass('playerTable');
  $newPlayer.append('<br><br>');
  setPlayerPicture($newPlayer, newIcon);

}
//-------------------------------------------------------------//

var MyPlayerIcons = "PlayerIcons";
function setupLocal() {
  console.log("Starting Setup");
  if(localStorage.getItem(MyPlayerIcons) !== null) {
    let myItemsString2 = localStorage.getItem(MyPlayerIcons);
    playersIcon = JSON.parse(myItemsString2);
  }

  $("#PlayButton").on("click", function() {

    playersIcon[0] = playersIcon[0];
    playersIcon[1] = playersIcon[1];
    playersIcon[2] = playersIcon[2];
    playersIcon[3] = playersIcon[3];

    saveItems1();
  })

  ;
  console.log("Finished Setup");

} // setupLocal

var HowManyPlayers = "Player Count"
function setupLocal2() {
  if(localStorage.getItem(HowManyPlayers) !== null) {
    let myItemsString2 = localStorage.getItem(numberOfPlayers);
    playersIcon = JSON.parse(myItemsString2);
  }

  $("#PlayButton").on("click", function() {

    numberOfPlayers = numberOfPlayers;

    saveItems2();
  });

} // setupLocal

function saveItems1() {
  console.log("Starting save");
  console.log(playersIcon);
  let myItemsString1 = JSON.stringify(playersIcon);
  localStorage.setItem(MyPlayerIcons, myItemsString1);
  console.log("Finished save");
}

function saveItems2() {
  console.log("Starting save");
  console.log(numberOfPlayers);
  let myItemsString2 = JSON.stringify(numberOfPlayers);
  localStorage.setItem(HowManyPlayers, myItemsString2);
  console.log("Finished save");
}
setupLocal();
setupLocal2();
runMenu();
