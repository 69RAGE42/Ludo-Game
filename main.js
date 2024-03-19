// Ludo Game Mechanicsm
function include(file) {
  let script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}

include("./backend-logic/LudoBoard.js")
include("./backend-logic/LudoPiece.js")
include("./backend-logic/LudoVariables.js")
include("./backend-logic/LudoEventManager.js")

// Ludo board
let LB;

// Has the game started?
let gameStarted = false;

// Has the user rolled the dice?
let hasRolled = false;
let rolledNumber = -1

let starPoints = ["#pxl011", "#pxl050", "#pxl024", "#pxl037"];
let housePoints = ["#pxl003", "#pxl016", "#pxl029", "#pxl042"];
let tokenShapes = [
  "fa-solid fa-heart",
  "fa-regular fa-sun",
  "fa-regular fa-moon",
  "fa-regular fa-paper-plane",
  "fa-solid fa-puzzle-piece",
  "fa-solid fa-crown",
];
let colorTokens = [
  "fa-solid fa-heart",
  "fa-solid fa-puzzle-piece",
  "fa-regular fa-paper-plane",
  "fa-solid fa-crown",
];

let redPosition = [150, 151, 152, 153];
let yellowPosition = [154, 155, 156, 157];
let bluePosition = [158, 159, 160, 161];
let greenPosition = [162, 163, 164, 165];

let allTurns = [0, 0, 0, 0];
let allRolls = [0, 0, 0, 0];

function redPlays(t1, t2, t3, t4) {
  console.log(t1, t2, t3, t4)
  let pxl1 = document.querySelector(t1 + " a");
  let pxl2 = document.querySelector(t2 + " a");
  let pxl3 = document.querySelector(t3 + " a");
  let pxl4 = document.querySelector(t4 + " a");

  pxl1.classList = colorTokens[0];
  pxl2.classList = colorTokens[0];
  pxl3.classList = colorTokens[0];
  pxl4.classList = colorTokens[0];

  pxl1.style.color = "#df0000b0";
  pxl2.style.color = "#df0000b0";
  pxl3.style.color = "#df0000b0";
  pxl4.style.color = "#df0000b0";

  pxl1.style.filter = "drop-shadow(0px 0px 15px #ff0000ff)";
  pxl2.style.filter = "drop-shadow(0px 0px 15px #ff0000ff)";
  pxl3.style.filter = "drop-shadow(0px 0px 15px #ff0000ff)";
  pxl4.style.filter = "drop-shadow(0px 0px 15px #ff0000ff)";

  document.querySelector("#player1 #texts h6").innerHTML =
    "Turns : " + allTurns[0] + " Rolls : " + allRolls[0];
}

function greenPlays(t1, t2, t3, t4) {
  console.log(t1, t2, t3, t4)
  let pxl1 = document.querySelector(t1 + " a");
  let pxl2 = document.querySelector(t2 + " a");
  let pxl3 = document.querySelector(t3 + " a");
  let pxl4 = document.querySelector(t4 + " a");

  pxl1.classList = colorTokens[3];
  pxl2.classList = colorTokens[3];
  pxl3.classList = colorTokens[3];
  pxl4.classList = colorTokens[3];

  pxl1.style.color = "#00cf00b0";
  pxl2.style.color = "#00cf00b0";
  pxl3.style.color = "#00cf00b0";
  pxl4.style.color = "#00cf00b0";

  pxl1.style.filter = "drop-shadow(0px 0px 15px #00ff00ff)";
  pxl2.style.filter = "drop-shadow(0px 0px 15px #00ff00ff)";
  pxl3.style.filter = "drop-shadow(0px 0px 15px #00ff00ff)";
  pxl4.style.filter = "drop-shadow(0px 0px 15px #00ff00ff)";
}

function bluePlays(t1, t2, t3, t4) {
  console.log(t1, t2, t3, t4)
  let pxl1 = document.querySelector(t1 + " a");
  let pxl2 = document.querySelector(t2 + " a");
  let pxl3 = document.querySelector(t3 + " a");
  let pxl4 = document.querySelector(t4 + " a");

  pxl1.classList = colorTokens[2];
  pxl2.classList = colorTokens[2];
  pxl3.classList = colorTokens[2];
  pxl4.classList = colorTokens[2];

  pxl1.style.color = "#0000cfb0";
  pxl2.style.color = "#0000cfb0";
  pxl3.style.color = "#0000cfb0";
  pxl4.style.color = "#0000cfb0";

  pxl1.style.filter = "drop-shadow(0px 0px 15px #0000ffff)";
  pxl2.style.filter = "drop-shadow(0px 0px 15px #0000ffff)";
  pxl3.style.filter = "drop-shadow(0px 0px 15px #0000ffff)";
  pxl4.style.filter = "drop-shadow(0px 0px 15px #0000ffff)";
}

function yellowPlays(t1, t2, t3, t4) {
  console.log(t1, t2, t3, t4)
  let pxl1 = document.querySelector(t1 + " a");
  let pxl2 = document.querySelector(t2 + " a");
  let pxl3 = document.querySelector(t3 + " a");
  let pxl4 = document.querySelector(t4 + " a");

  pxl1.classList = colorTokens[1];
  pxl2.classList = colorTokens[1];
  pxl3.classList = colorTokens[1];
  pxl4.classList = colorTokens[1];

  pxl1.style.color = "#cfcf00b0";
  pxl2.style.color = "#cfcf00b0";
  pxl3.style.color = "#cfcf00b0";
  pxl4.style.color = "#cfcf00b0";

  pxl1.style.filter = "drop-shadow(0px 0px 15px #ffff00ff)";
  pxl2.style.filter = "drop-shadow(0px 0px 15px #ffff00ff)";
  pxl3.style.filter = "drop-shadow(0px 0px 15px #ffff00ff)";
  pxl4.style.filter = "drop-shadow(0px 0px 15px #ffff00ff)";
}

function checkForStars(element) {
  var pxl = document.querySelector(element + " a");
  if (pxl.className == "fa-regular fa-star") {
  } else if (pxl.className == "") {
    pxl.classList = "fa-regular fa-star";
    document.querySelector(element).style.border = "1px solid #000000c0";
    pxl.style.color = "#000000b0";
    pxl.style.textShadow = "0px 0px 10px #000000ff";
  } else {
    document.querySelector(element).style.border = "4px solid #000000c0";
  }
}

function checkForHouses(element) {
  var pxl = document.querySelector(element + " a");
  if (pxl.className == "fa-solid fa-house-chimney") {
  } else if (pxl.className == "") {
    pxl.classList = "fa-solid fa-house-chimney";
    document.querySelector(element).style.border = "1px solid #000000c0";
    pxl.style.color = "#000000b0";
    pxl.style.textShadow = "0px 0px 5px #000000a0";
  } else {
    document.querySelector(element).style.border = "4px solid #000000c0";
  }
}

// Ludo Game Functionality

let colors = ["red", "green", "blue", "yellow"];
colors.forEach((element) => {
  for (let i = 1; i <= 6; i++) {
    let piece = document.querySelector("#piece" + i + "-" + element);
    piece.addEventListener("click", function () {
      switch (element) {
        case "red":
          {
            document.querySelector("#player1 .pawns .pawn1 a").classList = tokenShapes[i - 1];
            document.querySelector("#player1 .pawns .pawn2 a").classList = tokenShapes[i - 1];
            document.querySelector("#player1 .pawns .pawn3 a").classList = tokenShapes[i - 1];
            document.querySelector("#player1 .pawns .pawn4 a").classList = tokenShapes[i - 1];
          }
          break;
        case "yellow":
          {
            document.querySelector("#player2 .pawns .pawn1 a").classList = tokenShapes[i - 1];
            document.querySelector("#player2 .pawns .pawn2 a").classList = tokenShapes[i - 1];
            document.querySelector("#player2 .pawns .pawn3 a").classList = tokenShapes[i - 1];
            document.querySelector("#player2 .pawns .pawn4 a").classList = tokenShapes[i - 1];
          }
          break;
        case "blue":
          {
            document.querySelector("#player3 .pawns .pawn1 a").classList = tokenShapes[i - 1];
            document.querySelector("#player3 .pawns .pawn2 a").classList = tokenShapes[i - 1];
            document.querySelector("#player3 .pawns .pawn3 a").classList = tokenShapes[i - 1];
            document.querySelector("#player3 .pawns .pawn4 a").classList = tokenShapes[i - 1];
          }
          break;
        case "green":
          {
            document.querySelector("#player4 .pawns .pawn1 a").classList = tokenShapes[i - 1];
            document.querySelector("#player4 .pawns .pawn2 a").classList = tokenShapes[i - 1];
            document.querySelector("#player4 .pawns .pawn3 a").classList = tokenShapes[i - 1];
            document.querySelector("#player4 .pawns .pawn4 a").classList = tokenShapes[i - 1];
          }
          break;
      }
    });
  }
});

document.querySelector(".controller button").addEventListener("click", () => {
  if (gameStarted)
    return;

  document.querySelector(".controller button").style.backdropFilter = "blur(0px)";
  document.querySelector(".controller button").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".controller button").style.display = "none";
  }, 1000);

  colorTokens[0] = document.querySelector("#player1 .pawns .pawn1 a").classList;
  colorTokens[0] = document.querySelector("#player1 .pawns .pawn2 a").classList;
  colorTokens[0] = document.querySelector("#player1 .pawns .pawn3 a").classList;
  colorTokens[0] = document.querySelector("#player1 .pawns .pawn4 a").classList;

  colorTokens[1] = document.querySelector("#player2 .pawns .pawn1 a").classList;
  colorTokens[1] = document.querySelector("#player2 .pawns .pawn2 a").classList;
  colorTokens[1] = document.querySelector("#player2 .pawns .pawn3 a").classList;
  colorTokens[1] = document.querySelector("#player2 .pawns .pawn4 a").classList;

  colorTokens[2] = document.querySelector("#player3 .pawns .pawn1 a").classList;
  colorTokens[2] = document.querySelector("#player3 .pawns .pawn2 a").classList;
  colorTokens[2] = document.querySelector("#player3 .pawns .pawn3 a").classList;
  colorTokens[2] = document.querySelector("#player3 .pawns .pawn4 a").classList;

  colorTokens[3] = document.querySelector("#player4 .pawns .pawn1 a").classList;
  colorTokens[3] = document.querySelector("#player4 .pawns .pawn2 a").classList;
  colorTokens[3] = document.querySelector("#player4 .pawns .pawn3 a").classList;
  colorTokens[3] = document.querySelector("#player4 .pawns .pawn4 a").classList;

  document.querySelectorAll(".pieces .piece").forEach((element) => {
    element.style.display = "none";
    document.querySelector(".players").style.gap = "180px";
    document.querySelectorAll(".player").forEach((elmnt) => {
      elmnt.style.height = "360px";
    });
  });

  redPlays("#pxl150", "#pxl151", "#pxl152", "#pxl153");
  greenPlays("#pxl162", "#pxl163", "#pxl164", "#pxl165");
  bluePlays("#pxl158", "#pxl159", "#pxl160", "#pxl161");
  yellowPlays("#pxl154", "#pxl155", "#pxl156", "#pxl157");

  starPoints.forEach((element) => checkForStars(element));
  housePoints.forEach((element) => checkForHouses(element));

  LB = new LudoBoard()
  LB.init([
    { playerId: 1, color: "red" },
    { playerId: 2, color: "yellow" },
    { playerId: 3, color: "blue" },
    { playerId: 4, color: "green" }
  ])

  console.log(LB.currentTurn.playerId, LB.currentTurn.color) // helpful for testing
  document.querySelector("#dice-" + LB.currentTurn.color).className = "dice blink";
  gameStarted = true;
  activatePawnButtons();
});

// dice buttons
document.querySelectorAll(".dice").forEach(clr => {
  clr.addEventListener("click", () => {
    if (!gameStarted || LB.currentTurn.color != clr.id.substring(5, 69) || hasRolled) return;
    rolledNumber = LB.roll()
    hasRolled = true

    console.log("Rolled number:", rolledNumber)

    // Dice animation start (ends in LudoBoard.nextTurn)
    document.querySelector("#dice-" + LB.currentTurn.color).className = "dice";

    // Pawn buttons animation start (ends in pawnButtonCallback)
    document.querySelectorAll("#pawn-" + LB.currentTurn.color).forEach(pawn => {
      pawn.className = pawn.className.substring(0, 5) + " blink";
    })

    switch (rolledNumber) {
      case 1: {
        document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-one";
        break;
      }
      case 2: {
        document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-two";
        break;
      }
      case 3: {
        document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-three";
        break;
      }
      case 4: {
        document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-four";
        break;
      }
      case 5: {
        document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-five";
        break;
      }
      case 6: {
        document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-six";
        break;
      }
    }

  })
})

// token buttons
function activatePawnButtons() {
  for (let color of colors) {
    document.querySelectorAll("#pawn-" + color).forEach(pawns => {
      let color = pawns.id.substring(5, 69)
      pawns.addEventListener("click", () => { pawnButtonCallback(color, color[0] + pawns.className[4]) })
    })
  }
}

function pawnButtonCallback(color, finalPieceName) {
  if (!hasRolled || LB.currentTurn.color != color) return
  let piece = LB.pieces[LB.currentTurn.playerId][finalPieceName]
  let oldPos = piece.position
  console.log(color, finalPieceName)
  console.log(piece)

  piece.move(rolledNumber)
  if (oldPos != piece.position) {
    console.log("new piece pos", piece.position)

    switch (color) { // lmfao
      case "red": {
        redPosition[finalPieceName[1] - 1] = String(piece.position).padStart(3, "0");
        redPlays("#pxl" + redPosition[0], "#pxl" + redPosition[1], "#pxl" + redPosition[2], "#pxl" + redPosition[3]);
        break;
      }

      case "yellow": {
        yellowPosition[finalPieceName[1] - 1] = String(piece.position).padStart(3, "0");
        yellowPlays("#pxl" + yellowPosition[0], "#pxl" + yellowPosition[1], "#pxl" + yellowPosition[2], "#pxl" + yellowPosition[3]);
        break;
      }

      case "blue": {
        bluePosition[finalPieceName[1] - 1] = String(piece.position).padStart(3, "0");
        bluePlays("#pxl" + bluePosition[0], "#pxl" + bluePosition[1], "#pxl" + bluePosition[2], "#pxl" + bluePosition[3]);
        break;
      }

      case "green": {
        greenPosition[finalPieceName[1] - 1] = String(piece.position).padStart(3, "0");
        greenPlays("#pxl" + greenPosition[0], "#pxl" + greenPosition[1], "#pxl" + greenPosition[2], "#pxl" + greenPosition[3]);
        break;
      }

    }
  }

  // Pawn buttons animation end
  document.querySelectorAll("#pawn-" + LB.currentTurn.color).forEach(pawn => {
    pawn.className = pawn.className.substring(0, pawn.className.lastIndexOf(" "));
  })

  LB.nextTurn();
  hasRolled = false;
  rolledNumber = -1;
}