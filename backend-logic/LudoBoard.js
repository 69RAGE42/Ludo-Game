class LudoBoard {

    //public pieces: { [playerId: string]: { [pieceName: string]: LudoPiece } }
    //public players: any[];
    //public colorOwners: { [key in LudoColors]?: string } = {};
    //public playerColors: { [key: string]: LudoColors } = {};
    //public currentTurn: { playerId?: string, color?: LudoColors, availableTurns?: number } | undefined;

    // future shit
    // public metadata!: {
    //     gameType: "online" | "ai"
    // }

    //public customData: Map<any, any>
    // <"rollData", number>

    constructor() {
        this.pieces = {}
        this.players = []
        this.colorOwners = []
        this.playerColors = []
        this.lastRoll = {}
    }

    async init(playerData) {
        if (!playerData.length) return;

        for (let item of playerData) {
            let { playerId, color } = item
            if (!this.pieces || playerId in this.pieces) return

            this.pieces[playerId] = {}

            for (let i = 1; i != 5; i++) { // won't run the 5th iteration
                Object.assign(this.pieces[playerId], { [color[0] + i]: new LudoPiece(color, String(color[0]) + i, playerId, this) })
            }
            this.players.push({ playerId: playerId, color: color })
            this.colorOwners[color] = playerId
            this.playerColors[playerId] = color
        }
        let rndPlayer = Math.floor(Math.random() * this.players.length)
        this.currentTurn = { playerId: this.players[rndPlayer].playerId, color: this.players[rndPlayer].color, availableTurns: 1 }

        // event emitter shit
        // yudo.emit("ludoBegin", {
        //     gameBoard: this
        // })

    }

    getPiece(name, playerId) {
        return this.pieces[playerId][name] || null
    }

    getPiecesOnPosition(num, playerId) {
        let pieces = []
        if (playerId) for (let piece of Object.values(this.pieces[playerId])) piece.position === num ? pieces.push(piece) : null
        else {
            for (let item of Object.values(this.pieces)) {
                for (let piece of Object.values(item)) {
                    piece.position === num ? pieces.push(piece) : null
                }
            }
        }
        if (!pieces.length) return null
        return pieces
    }

    nextTurn() {
        document.querySelector("#dice-"+this.currentTurn.color).className = "dice";
        
        if (!this.currentTurn) return;

        if (this.currentTurn.color === "red") {
            let nextPlayer = this.colorOwners["yellow"] || this.colorOwners["blue"] || this.colorOwners["green"]
            if (!nextPlayer) return
            this.currentTurn = { playerId: nextPlayer, color: this.playerColors[nextPlayer], availableTurns: 1 }
        } else if (this.currentTurn.color === "yellow") {
            let nextPlayer = this.colorOwners["blue"] || this.colorOwners["green"] || this.colorOwners["red"]
            if (!nextPlayer) return
            this.currentTurn = { playerId: nextPlayer, color: this.playerColors[nextPlayer], availableTurns: 1 }
        } else if (this.currentTurn.color === "blue") {
            let nextPlayer = this.colorOwners["green"] || this.colorOwners["red"] || this.colorOwners["yellow"]
            if (!nextPlayer) return
            this.currentTurn = { playerId: nextPlayer, color: this.playerColors[nextPlayer], availableTurns: 1 }
        } else if (this.currentTurn.color === "green") {
            let nextPlayer = this.colorOwners["red"] || this.colorOwners["yellow"] || this.colorOwners["blue"]
            if (!nextPlayer) return
            this.currentTurn = { playerId: nextPlayer, color: this.playerColors[nextPlayer], availableTurns: 1 }
        }
        
        // Dice animation end
        document.querySelector("#dice-"+this.currentTurn.color).className = "dice blink";
    }

    roll() {

        if(this.lastRoll.color == this.currentTurn.color) return this.lastRoll.roll;

        let roll = Math.ceil(Math.random() * 6)
        this.lastRoll = {
            color: this.currentTurn.color,
            roll: roll
        }
        return roll;
    }
}