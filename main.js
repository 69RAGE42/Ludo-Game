//(() => {
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

// <======== Logic variables ============>
// Ludo board
let LB;

// Has the game started?
let gameStarted = false;

// Has the user rolled the dice?
let hasRolled = false;
let rolledNumber = -1

let movablePawns = [false, false, false, false]

let allTurns = [0, 0, 0, 0];
let allRolls = [0, 0, 0, 0];
// <======== Logic variables ============>

let starPoints = ["#pxl011", "#pxl050", "#pxl024", "#pxl037"];
let housePoints = ["#pxl003", "#pxl016", "#pxl029", "#pxl042"];
let tokenShapes = ["fa-solid fa-heart", "fa-regular fa-sun", "fa-regular fa-moon", "fa-regular fa-paper-plane", "fa-solid fa-puzzle-piece", "fa-solid fa-crown"];

let RGBPlayerColors = ["rgba(255, 50, 50, 0.15)", "rgba(255, 255, 50, 0.15)", "rgba(50, 50, 255, 0.15)", "rgba(50, 255, 50, 0.15)"]
let RGBDiceColors = ["rgba(223, 0, 0, 0.69)", "rgba(207, 207, 0, 0.69)", "rgba(0, 0, 207, 0.69)", "rgba(0, 207, 0, 0.69)"]
let RGBPopUpColors = ["rgba(150, 50, 50, 0.3)", "rgba(150, 150, 50, 0.3)", "rgba(50, 50, 150, 0.3)", "rgba(50, 150, 50, 0.3)"]

let pawnProperties = {
  "red": {
    position: ["#pxl000", "#pxl000", "#pxl000", "#pxl000"],
    classList: "fa-solid fa-heart",
    style: {
      color: "#df0000b0",
      filter: "drop-shadow(0px 0px 15px #ff0000ff)"
    }
  },
  "yellow": {
    position: ["#pxl000", "#pxl000", "#pxl000", "#pxl000"],
    classList: "fa-solid fa-crown",
    style: {
      color: "#cfcf00b0",
      filter: "drop-shadow(0px 0px 15px #ffff00ff)"
    }
  },
  "blue": {
    position: ["#pxl000", "#pxl000", "#pxl000", "#pxl000"],
    classList: "fa-regular fa-paper-plane",
    style: {
      color: "#0000cfb0",
      filter: "drop-shadow(0px 0px 15px #0000ffff)"
    }
  },
  "green": {
    position: ["#pxl000", "#pxl000", "#pxl000", "#pxl000"],
    classList: "fa-solid fa-puzzle-piece",
    style: {
      color: "#00cf00b0",
      filter: "drop-shadow(0px 0px 15px #00ff00ff)"
    }
  }
}

function checkForStars(element) {
  var pxl = document.querySelector(element + " a");
  if (pxl.className == "fa-regular fa-star") {
  } else if (pxl.className == "") {
    pxl.classList = "fa-regular fa-star";
    document.querySelector(element).style.border = "1px solid #000000c0";
    pxl.style.color = "#000000b0";
    pxl.style.textShadow = "0px 0px 0px #000000ff";
    pxl.style.filter = "drop-shadow(rgb(0, 0, 0) 0px 0px 0px)"
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
    pxl.style.textShadow = "0px 0px 0px #000000a0";
    pxl.style.filter = "drop-shadow(rgb(0, 0, 0) 0px 0px 0px)"
  } else {
    document.querySelector(element).style.border = "4px solid #000000c0";
  }
}

// Ludo Game Functionality
let colors = ["red", "yellow", "blue", "green"];
colors.forEach(element => {
  for (let i = 1; i <= 6; i++) {
    let pawn = document.querySelector("#piece" + i + "-" + element);
    pawn.addEventListener("click", () => {
      switch (element) {
        case "red": for (let j = 1; j != 5; j++) document.querySelector(`#player1 .pawns .pawn${j} a`).classList = tokenShapes[i - 1]; break;
        case "yellow": for (let j = 1; j != 5; j++) document.querySelector(`#player2 .pawns .pawn${j} a`).classList = tokenShapes[i - 1]; break;
        case "blue": for (let j = 1; j != 5; j++) document.querySelector(`#player3 .pawns .pawn${j} a`).classList = tokenShapes[i - 1]; break;
        case "green": for (let j = 1; j != 5; j++) document.querySelector(`#player4 .pawns .pawn${j} a`).classList = tokenShapes[i - 1]; break;
      }
    });
  }
});

document.querySelector(".controller button").addEventListener("click", () => {
  if (gameStarted)
    return;

  document.querySelector(".controller button").style.backdropFilter = "blur(0px)";
  document.querySelector(".controller button").style.opacity = 0;
  setTimeout(() => { document.querySelector(".controller button").style.display = "none"; }, 1000);

  for (let i = 0; i != 4; i++)
    for (let j = 0; j != 4; j++)
      pawnProperties[colors[i]].classList = document.querySelector(`#player${i + 1} .pawns .pawn${j + 1} a`).classList.value;

  document.querySelectorAll(".pieces .piece").forEach(element => element.style.display = "none");
  document.querySelectorAll(".player").forEach(element => element.style.height = "360px");
  document.querySelector(".players").style.gap = "180px";

  starPoints.forEach(element => checkForStars(element));
  housePoints.forEach(element => checkForHouses(element));

  LB = new LudoBoard()
  LB.init([
    { playerId: 1, color: "red" },
    { playerId: 2, color: "yellow" },
    { playerId: 3, color: "blue" },
    { playerId: 4, color: "green" }
  ])

  // Highlight whose turn it is
  document.querySelector("#player" + LB.currentTurn.playerId).style.backgroundColor = RGBPlayerColors[LB.currentTurn.playerId - 1];

  // Dice animation start (ends in dice click event)
  document.querySelector("#dice-" + LB.currentTurn.color).className = "dice blink";
  document.querySelector("#dice-" + LB.currentTurn.color + " a").style.color = RGBDiceColors[LB.currentTurn.playerId - 1];
  document.querySelectorAll(".player-info").forEach(element => element.style.display = "none")

  gameStarted = true;
  updatePawnPositions()
  activatePawnButtons();
});

// dice buttons
let diceWords = ["one", "two", "three", "four", "five", "six"] // :>
document.querySelectorAll(".dice").forEach(clr => {
  clr.addEventListener("click", () => {
    if (!gameStarted || LB.currentTurn.color != clr.id.substring(5, 69) || hasRolled) return;
    rolledNumber = LB.roll()
    hasRolled = true
    let i = 0;

    if (rolledNumber === 18) document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-one";
    else document.querySelector("#" + clr.id + " a").className = "fa-solid fa-dice-" + diceWords[rolledNumber - 1];

    // Get information about what pawns are movable
    for (let pawn of Object.values(LB.pieces[LB.currentTurn.playerId])) {
      if (rolledNumber === 18) break;
      movablePawns[i] = pawn.isMovable(rolledNumber);
      i++;
    }

    i = 0;
    let oldPlayerId = LB.currentTurn.playerId;

    // blud really rolled three sixes in a row :skull:
    if (rolledNumber === 18 || !movablePawns.includes(true)) {
      // Dice animation end (restarts again in dblPawnButtonCallback)
      document.querySelector("#dice-" + LB.currentTurn.color).className = "dice";
      let oldPlayerColor = LB.currentTurn.color;

      LB.nextTurn();
      hasRolled = false;
      rolledNumber = -1;
      movablePawns = [false, false, false, false]

      // remove glow from the old current player, and add it to the next player
      document.querySelector("#player" + oldPlayerId).style.backgroundColor = "transparent";
      document.querySelector("#player" + LB.currentTurn.playerId).style.backgroundColor = RGBPlayerColors[LB.currentTurn.playerId - 1];

      document.querySelector("#dice-" + oldPlayerColor + " a").style.color = "rgba(255, 255, 255, 0.75)";
      document.querySelector("#dice-" + LB.currentTurn.color + " a").style.color = RGBDiceColors[LB.currentTurn.playerId - 1];

      // Dice animation start (ends in dice click event)
      document.querySelector("#dice-" + LB.currentTurn.color).className = "dice blink";
      document.querySelector("#dice-" + LB.currentTurn.color + " a").style.color = RGBDiceColors[LB.currentTurn.playerId - 1];

      return
    }

    allRolls[oldPlayerId - 1] += rolledNumber;
    updateTurnsAndRolls(oldPlayerId)

    // Dice animation end (restarts again in dblPawnButtonCallback)
    document.querySelector("#dice-" + LB.currentTurn.color).className = "dice";
    document.querySelector("#dice-" + LB.currentTurn.color + " a").style.color = "rgba(255, 255, 255, 0.75)";

    // Pawn buttons animation start (ends in dblPawnButtonCallback)
    document.querySelectorAll("#pawn-" + LB.currentTurn.color).forEach((pawn, i) => {
      if (movablePawns[i]) {
        // only blink the movable pawns
        document.querySelector("#player" + LB.currentTurn.playerId + " .pawns .pawn" + (i + 1) + " a").style.color = RGBDiceColors[LB.currentTurn.playerId - 1];
        pawn.className = pawn.className.substring(0, 5) + " blink";
      }
    })
  })
})

// token buttons
function activatePawnButtons() {
  for (let color of colors) {
    document.querySelectorAll("#pawn-" + color).forEach(pawns => {
      let color = pawns.id.substring(5, 69)
      pawns.addEventListener("click", () => { singlePawnButtonCallback(color, color[0] + pawns.className[4]) })
      pawns.addEventListener("dblclick", () => { dblPawnButtonCallback(color, color[0] + pawns.className[4]) })
    })
  }
}

let lastPawnBlink = "";
function singlePawnButtonCallback(color, finalPawnName) {
  if (LB.currentTurn.color != color || !hasRolled) return;

  if (lastPawnBlink && lastPawnBlink.length)
    document.querySelector(lastPawnBlink).id = "";

  let pawn = LB.pieces[LB.currentTurn.playerId][finalPawnName]
  lastPawnBlink = "#pxl" + String(pawn.position).padStart(3, "0") + " a";
  document.querySelector(lastPawnBlink).id = "blink";
}

function dblPawnButtonCallback(color, finalPawnName) {
  if (!hasRolled || LB.currentTurn.color != color || !movablePawns[Number(finalPawnName[1]) - 1]) return

  let pawn = LB.pieces[LB.currentTurn.playerId][finalPawnName]
  let oldPos = pawn.position

  pawn.move(rolledNumber)
  if (oldPos != pawn.position) {
    // remove old pos
    document.querySelector(pawnProperties[color].position[finalPawnName[1] - 1] + " a").className = "";

    pawnProperties[color].position[finalPawnName[1] - 1] = "#pxl" + String(pawn.position).padStart(3, "0");
    updatePawnPositions()

    if (housePoints.includes("#pxl" + String(oldPos).padStart(3, "0")) &&
      !housePoints.includes("#pxl" + String(pawn.position).padStart(3, "0")) &&
      !LB.getPiecesOnPosition(oldPos)
    ) checkForHouses("#pxl" + String(oldPos).padStart(3, "0"))

    if (starPoints.includes("#pxl" + String(oldPos).padStart(3, "0")) &&
      !starPoints.includes("#pxl" + String(pawn.position).padStart(3, "0")) &&
      !LB.getPiecesOnPosition(oldPos)
    ) checkForStars("#pxl" + String(oldPos).padStart(3, "0"))
  }

  // Pawn buttons animation end
  document.querySelectorAll("#pawn-" + LB.currentTurn.color).forEach((pawn, i) => {
    document.querySelector("#player" + LB.currentTurn.playerId + " .pawns .pawn" + (i + 1) + " a").style.color = "rgba(255, 255, 255, 0.75)";
    pawn.className = "pawn" + String(i + 1) // what if
  })

  let oldPlayerId = LB.currentTurn.playerId

  if (LB.currentTurn.availableTurns === 0) allTurns[LB.currentTurn.playerId - 1] += 1
  updateTurnsAndRolls(LB.currentTurn.playerId)

  LB.nextTurn();
  hasRolled = false;
  rolledNumber = -1;
  movablePawns = [false, false, false, false]

  // remove glow from the old current player, and add it to the next player
  document.querySelector("#player" + oldPlayerId).style.backgroundColor = "transparent";
  document.querySelector("#player" + LB.currentTurn.playerId).style.backgroundColor = RGBPlayerColors[LB.currentTurn.playerId - 1];


  // remove blinking here
  if (lastPawnBlink && lastPawnBlink.length) {
    document.querySelector(lastPawnBlink).id = "";
    // document.querySelector("#dice-" + oldPlayerColor + " a").style.color = "rgba(255, 255, 255, 0.75)";
  }

  // Dice animation start again
  document.querySelector("#dice-" + LB.currentTurn.color).className = "dice blink";
  document.querySelector("#dice-" + LB.currentTurn.color + " a").style.color = RGBDiceColors[LB.currentTurn.playerId - 1];
}

function updatePawnPositions() {
  if (!gameStarted) return;

  let i = 0;

  for (let player of Object.values(LB.pieces)) {
    for (let pawn of Object.values(player)) {
      // update every pawn's visual position to match their logical position
      pawnProperties[pawn.color].position[i] = "#pxl" + String(pawn.position).padStart(3, "0"); // position
      i++;
    }
    i = 0;
  }

  // reflect changes as per the new positions 
  for (let color of colors) {
    for (let pos of pawnProperties[color].position) {
      if (!LB.colorOwners[color]) continue
      document.querySelector("#player-info" + LB.colorOwners[color]).style.display = "flex";
      let pxl = document.querySelector(pos + " a");
      pxl.classList = pawnProperties[color].classList;
      pxl.style.color = pawnProperties[color].style.color
      pxl.style.filter = pawnProperties[color].style.filter
    }
  }
}

function updateTurnsAndRolls(playerId) {
  document.querySelector("#player" + playerId + " #texts h6").innerHTML =
    "Turns : " + allTurns[playerId - 1] + " Rolls : " + allRolls[playerId - 1];
}

// called when n - 1 amount of people win the game
function gameOver() {

}

// Work In Progress
let activePopUps = [false, false, false, false];

document.querySelectorAll(".player-info").forEach(popUps => {
  popUps.addEventListener("click", () => {
    let index = popUps.id.substring(11, 12);
    let color = LB.playerColors[index];
    if (activePopUps[index - 1] == false) {

      for (let i = 1; i <= 4; i++) {
        document.querySelector("#pop-up" + i).style.display = "none";
        document.querySelector("#cross-" + i).style.display = "none";
      }

      document.querySelector("#pop-up" + index).style.borderColor = RGBDiceColors[index - 1];
      document.querySelectorAll("#pop-up" + index + " .stats-holder .stats-matrix").forEach(display => {
        display.style.borderColor = RGBDiceColors[index - 1];
      })
      document.querySelectorAll("#pop-up" + index + " .counter-holder .counter-matrix").forEach(display => {
        display.style.borderColor = RGBDiceColors[index - 1];
      })
      document.querySelector("#pop-up" + index + " hr").style.borderColor = RGBDiceColors[index - 1];
      document.querySelector("#pop-up" + index).style.backgroundColor = RGBPopUpColors[index - 1];
      document.querySelector("#pop-up" + index + " h1").innerHTML = "Player " + index + " (" + (color[0].toUpperCase() + color.substring(1, 69)) + ") <a class='" + pawnProperties[color].classList + "'></a>";
      document.querySelector("#pop-up" + index).style.display = "flex";
      document.querySelector("#cross-" + index).style.display = "flex";
      activePopUps[index - 1] = true;
    } else {
      document.querySelector("#pop-up" + index).style.display = "none";
      document.querySelector("#cross-" + index).style.display = "none";
      activePopUps[index - 1] = false;
    }
  })
})

document.querySelectorAll(".cross-x").forEach(cross => {
  cross.addEventListener("click", () => {
    let index = cross.id.substring(6, 7);
    document.querySelector("#pop-up" + index).style.display = "none";
    document.querySelector("#cross-" + index).style.display = "none";
    activePopUps[index - 1] = false;
  })
})
//})();