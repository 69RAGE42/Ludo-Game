
// Ludo Game Mechanicsm

let starPoints = ["#pxl16", "#pxl34", "#pxl51", "#pxl69"]; let housePoints = ["#pxl05", "#pxl23", "#pxl38", "#pxl56"];
let tokenShapes = ["fa-solid fa-heart", "fa-regular fa-sun", "fa-regular fa-moon", "fa-regular fa-paper-plane", "fa-solid fa-puzzle-piece", "fa-solid fa-crown"];
let colorTokens = ["fa-solid fa-heart", "fa-solid fa-puzzle-piece", "fa-regular fa-paper-plane", "fa-solid fa-crown"];

let redPathing = ["#pxl05", "#pxl04", "#pxl03", "#pxl02", "#pxl01", "#pxl72", "#pxl71", "#pxl70", "#pxl69", "#pxl68", "#pxl67", "#pxl61", "#pxl55", "#pxl56", "#pxl57", "#pxl58", "#pxl59", "#pxl60", "#pxl54", "#pxl53", "#pxl52", "#pxl51", "#pxl50", "#pxl49", "#pxl43", "#pxl37", "#pxl38", "#pxl39", "#pxl40", "#pxl41", "#pxl42", "#pxl31", "#pxl32", "#pxl33", "#pxl34", "#pxl35", "#pxl36", "#pxl30", "#pxl24", "#pxl23", "#pxl22", "#pxl21", "#pxl20", "#pxl19", "#pxl13", "#pxl14", "#pxl15", "#pxl16", "#pxl17", "#pxl18", "#pxl12", "#pxl11", "#pxl10", "#pxl09", "#pxl08", "#pxl07"]

let greenPathing = ["#pxl23", "#pxl22", "#pxl21", "#pxl20", "#pxl19", "#pxl13", "#pxl14", "#pxl15", "#pxl16", "#pxl17", "#pxl18", "#pxl12", "#pxl06", "#pxl05", "#pxl04", "#pxl03", "#pxl02", "#pxl01", "#pxl72", "#pxl71", "#pxl70", "#pxl69", "#pxl68", "#pxl67", "#pxl61", "#pxl55", "#pxl56", "#pxl57", "#pxl58", "#pxl59", "#pxl60", "#pxl54", "#pxl53", "#pxl52", "#pxl51", "#pxl50", "#pxl49", "#pxl43", "#pxl37", "#pxl38", "#pxl39", "#pxl40", "#pxl41", "#pxl42", "#pxl31", "#pxl32", "#pxl33", "#pxl34", "#pxl35", "#pxl36", "#pxl30", "#pxl29", "#pxl28", "#pxl27", "#pxl26", "#pxl25"];

let bluePathing = ["#pxl38", "#pxl39", "#pxl40", "#pxl41", "#pxl42", "#pxl31", "#pxl32", "#pxl33", "#pxl34", "#pxl35", "#pxl36", "#pxl30", "#pxl24", "#pxl23", "#pxl22", "#pxl21", "#pxl20", "#pxl19", "#pxl13", "#pxl14", "#pxl15", "#pxl16", "#pxl17", "#pxl18", "#pxl12", "#pxl06", "#pxl05", "#pxl04", "#pxl03", "#pxl02", "#pxl01", "#pxl72", "#pxl71", "#pxl70", "#pxl69", "#pxl68", "#pxl67", "#pxl61", "#pxl55", "#pxl56", "#pxl57", "#pxl58", "#pxl59", "#pxl60", "#pxl54", "#pxl53", "#pxl52", "#pxl51", "#pxl50", "#pxl49", "#pxl43", "#pxl44", "#pxl45", "#pxl46", "#pxl47", "#pxl48"];

let yellowPathing = ["#pxl56", "#pxl57", "#pxl58", "#pxl59", "#pxl60", "#pxl54", "#pxl53", "#pxl52", "#pxl51", "#pxl50", "#pxl49", "#pxl43", "#pxl37", "#pxl38", "#pxl39", "#pxl40", "#pxl41", "#pxl42", "#pxl31", "#pxl32", "#pxl33", "#pxl34", "#pxl35", "#pxl36", "#pxl30", "#pxl24", "#pxl23", "#pxl22", "#pxl21", "#pxl20", "#pxl19", "#pxl13", "#pxl14", "#pxl15", "#pxl16", "#pxl17", "#pxl18", "#pxl12", "#pxl06", "#pxl05", "#pxl04", "#pxl03", "#pxl02", "#pxl01", "#pxl72", "#pxl71", "#pxl70", "#pxl69", "#pxl68", "#pxl67", "#pxl61", "#pxl62", "#pxl63", "#pxl64", "#pxl65", "#pxl66"];

let redPosition = [0, 0, 0, 0];
let greenPosition = [0, 0, 0, 0];
let bluePosition = [0, 0, 0, 0];
let yellowPosition = [0, 0, 0, 0];

let allTurns = [0, 0, 0, 0];
let allRolls = [0, 0, 0, 0];

function redPlays(t1, t2, t3, t4) {

    let pxl1 = document.querySelector(t1+" a");
    let pxl2 = document.querySelector(t2+" a");
    let pxl3 = document.querySelector(t3+" a");
    let pxl4 = document.querySelector(t4+" a");

    pxl1.classList = colorTokens[0];
    pxl2.classList = colorTokens[0];
    pxl3.classList = colorTokens[0];
    pxl4.classList = colorTokens[0];

    pxl1.style.color = "#df0000b0";
    pxl2.style.color = "#df0000b0";
    pxl3.style.color = "#df0000b0";
    pxl4.style.color = "#df0000b0";

    pxl1.style.textShadow = "0px 0px 10px #ff0000ff";
    pxl2.style.textShadow = "0px 0px 10px #ff0000ff";
    pxl3.style.textShadow = "0px 0px 10px #ff0000ff";
    pxl4.style.textShadow = "0px 0px 10px #ff0000ff";

    document.querySelector("#player1 #texts h6").innerHTML = "Turns : "+allTurns[0]+" Rolls : "+allRolls[0];

}

function greenPlays(t1, t2, t3, t4) {

    let pxl1 = document.querySelector(t1+" a");
    let pxl2 = document.querySelector(t2+" a");
    let pxl3 = document.querySelector(t3+" a");
    let pxl4 = document.querySelector(t4+" a");

    pxl1.classList = colorTokens[1];
    pxl2.classList = colorTokens[1];
    pxl3.classList = colorTokens[1];
    pxl4.classList = colorTokens[1];

    pxl1.style.color = "#00cf00b0";
    pxl2.style.color = "#00cf00b0";
    pxl3.style.color = "#00cf00b0";
    pxl4.style.color = "#00cf00b0";

    pxl1.style.textShadow = "0px 0px 10px #00ff00ff";
    pxl2.style.textShadow = "0px 0px 10px #00ff00ff";
    pxl3.style.textShadow = "0px 0px 10px #00ff00ff";
    pxl4.style.textShadow = "0px 0px 10px #00ff00ff";
    
}

function bluePlays(t1, t2, t3, t4) {

    let pxl1 = document.querySelector(t1+" a");
    let pxl2 = document.querySelector(t2+" a");
    let pxl3 = document.querySelector(t3+" a");
    let pxl4 = document.querySelector(t4+" a");

    pxl1.classList = colorTokens[2];
    pxl2.classList = colorTokens[2];
    pxl3.classList = colorTokens[2];
    pxl4.classList = colorTokens[2];

    pxl1.style.color = "#0000cfb0";
    pxl2.style.color = "#0000cfb0";
    pxl3.style.color = "#0000cfb0";
    pxl4.style.color = "#0000cfb0";

    pxl1.style.textShadow = "0px 0px 10px #0000ffff";
    pxl2.style.textShadow = "0px 0px 10px #0000ffff";
    pxl3.style.textShadow = "0px 0px 10px #0000ffff";
    pxl4.style.textShadow = "0px 0px 10px #0000ffff";
    
}

function yellowPlays(t1, t2, t3, t4) {

    let pxl1 = document.querySelector(t1+" a");
    let pxl2 = document.querySelector(t2+" a");
    let pxl3 = document.querySelector(t3+" a");
    let pxl4 = document.querySelector(t4+" a");

    pxl1.classList = colorTokens[3];
    pxl2.classList = colorTokens[3];
    pxl3.classList = colorTokens[3];
    pxl4.classList = colorTokens[3];

    pxl1.style.color = "#cfcf00b0";
    pxl2.style.color = "#cfcf00b0";
    pxl3.style.color = "#cfcf00b0";
    pxl4.style.color = "#cfcf00b0";

    pxl1.style.textShadow = "0px 0px 10px #ffff00ff";
    pxl2.style.textShadow = "0px 0px 10px #ffff00ff";
    pxl3.style.textShadow = "0px 0px 10px #ffff00ff";
    pxl4.style.textShadow = "0px 0px 10px #ffff00ff";
    
}

function removeToken(t1, t2, t3, t4) {
    
    let pxl1 = document.querySelector(t1+" a");
    let pxl2 = document.querySelector(t2+" a");
    let pxl3 = document.querySelector(t3+" a");
    let pxl4 = document.querySelector(t4+" a");

    pxl1.classList = "";
    pxl2.classList = "";
    pxl3.classList = "";
    pxl4.classList = "";

}

function checkForStars(element) {
    var pxl = document.querySelector(element+" a");
    if(pxl.className == "fa-regular fa-star") { 
    } else if(pxl.className == "") {
        pxl.classList = "fa-regular fa-star";
        document.querySelector(element).style.border = "1px solid #000000c0"
        pxl.style.color = "#000000b0";
        pxl.style.textShadow = "0px 0px 10px #000000ff";
    } else {
        document.querySelector(element).style.border = "4px solid #000000c0";
    }
}

function checkForHouses(element) {
    var pxl = document.querySelector(element+" a");
    if(pxl.className == "fa-solid fa-house-chimney") {
    } else if(pxl.className == "") {
        pxl.classList = "fa-solid fa-house-chimney";
        document.querySelector(element).style.border = "1px solid #000000c0"
        pxl.style.color = "#000000b0";
        pxl.style.textShadow = "0px 0px 5px #000000a0";
    } else {
        document.querySelector(element).style.border = "4px solid #000000c0";
    }
}

function activeTokens(t1, t2, t3, t4) {

    
}


// Ludo Game Functionality

let colors = ["red", "green", "blue", "yellow"];
colors.forEach(element => {
    for(let i = 1; i <= 6; i++) {
        let piece = document.querySelector("#piece"+i+"-"+element);
        piece.addEventListener(
            "click",
            function() {
                switch(element) {
                    case "red": {
                        document.querySelector("#player1 .pawns #pawn1 a").classList = tokenShapes[i-1];
                        document.querySelector("#player1 .pawns #pawn2 a").classList = tokenShapes[i-1];
                        document.querySelector("#player1 .pawns #pawn3 a").classList = tokenShapes[i-1];
                        document.querySelector("#player1 .pawns #pawn4 a").classList = tokenShapes[i-1];
                    } break;
                    case "green": {
                        document.querySelector("#player2 .pawns #pawn1 a").classList = tokenShapes[i-1];
                        document.querySelector("#player2 .pawns #pawn2 a").classList = tokenShapes[i-1];
                        document.querySelector("#player2 .pawns #pawn3 a").classList = tokenShapes[i-1];
                        document.querySelector("#player2 .pawns #pawn4 a").classList = tokenShapes[i-1];
                    } break;
                    case "blue" : {
                        document.querySelector("#player3 .pawns #pawn1 a").classList = tokenShapes[i-1];
                        document.querySelector("#player3 .pawns #pawn2 a").classList = tokenShapes[i-1];
                        document.querySelector("#player3 .pawns #pawn3 a").classList = tokenShapes[i-1];
                        document.querySelector("#player3 .pawns #pawn4 a").classList = tokenShapes[i-1];
                    } break;
                    case "yellow" : {
                        document.querySelector("#player4 .pawns #pawn1 a").classList = tokenShapes[i-1];
                        document.querySelector("#player4 .pawns #pawn2 a").classList = tokenShapes[i-1];
                        document.querySelector("#player4 .pawns #pawn3 a").classList = tokenShapes[i-1];
                        document.querySelector("#player4 .pawns #pawn4 a").classList = tokenShapes[i-1];
                    } break;
                }
            }
        )
    }
});

document.querySelector(".controller button").addEventListener(
    "click",
    function() {
        document.querySelector(".controller button").style.backdropFilter = "blur(0px)";
        document.querySelector(".controller button").style.opacity = 0;
        setTimeout( () => {
            document.querySelector(".controller button").style.display = "none";
        }, 1000);
        
        colorTokens[0] = document.querySelector("#player1 .pawns #pawn1 a").classList;
        colorTokens[0] = document.querySelector("#player1 .pawns #pawn2 a").classList;
        colorTokens[0] = document.querySelector("#player1 .pawns #pawn3 a").classList;
        colorTokens[0] = document.querySelector("#player1 .pawns #pawn4 a").classList;
        
        colorTokens[1] = document.querySelector("#player2 .pawns #pawn1 a").classList;
        colorTokens[1] = document.querySelector("#player2 .pawns #pawn2 a").classList;
        colorTokens[1] = document.querySelector("#player2 .pawns #pawn3 a").classList;
        colorTokens[1] = document.querySelector("#player2 .pawns #pawn4 a").classList;
        
        colorTokens[2] = document.querySelector("#player3 .pawns #pawn1 a").classList;
        colorTokens[2] = document.querySelector("#player3 .pawns #pawn2 a").classList;
        colorTokens[2] = document.querySelector("#player3 .pawns #pawn3 a").classList;
        colorTokens[2] = document.querySelector("#player3 .pawns #pawn4 a").classList;
        
        colorTokens[3] = document.querySelector("#player4 .pawns #pawn1 a").classList;
        colorTokens[3] = document.querySelector("#player4 .pawns #pawn2 a").classList;
        colorTokens[3] = document.querySelector("#player4 .pawns #pawn3 a").classList;
        colorTokens[3] = document.querySelector("#player4 .pawns #pawn4 a").classList;

        document.querySelectorAll(".pieces .piece").forEach(element => {
            element.style.display = "none";
            document.querySelector(".players").style.gap = "180px";
            document.querySelectorAll(".player").forEach(elmnt => {
                elmnt.style.height = "360px";
            });
        });
        
        redPlays("#token01", "#token02", "#token03", "#token04");
        greenPlays("#token05", "#token06", "#token07", "#token08");
        bluePlays("#token09", "#token10", "#token11", "#token12");
        yellowPlays("#token13", "#token14", "#token15", "#token16");

        starPoints.forEach(element => checkForStars(element));
        housePoints.forEach(element => checkForHouses(element));

        activeTokens("#token01", "#token02", "#token03", "#token04");
    }
)

// let redDice = document.querySelector("#player1 #dice");
// redDice.addEventListener(
//     "click",
//     function() {
//         let roll = Math.ceil(Math.random() * 6);
//         removeToken(redPathing[redPosition[0]], "#token02", "#token03", "#token04");
//         let rollText = (roll == 1) ? ("one") : ((roll == 2) ? ("two") : ((roll == 3) ? ("three") : ((roll == 4) ? ("four") : ((roll == 5) ? ("five") : ("six")))));
//         redPosition[0] = redPosition[0] + roll;
//         allTurns[0]++;
//         allRolls[0] = allRolls[0] + roll; 
//         document.querySelector("#player1 #dice a").classList = "fa-solid fa-dice-"+rollText;
//         redPlays(redPathing[redPosition[0]], "#token02", "#token03", "#token04");

//         starPoints.forEach(element => checkForStars(element));
//         housePoints.forEach(element => checkForHouses(element));
//     }
// );