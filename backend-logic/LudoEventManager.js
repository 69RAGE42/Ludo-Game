const LEMEvents = {
    LudoBegin: "ludoBegin",
    LudoChangeTurn: "ludoChangeTurn",
    LudoEnd: "ludoEnd",
    LudoGoal: "ludoGoal",
    LudoKill: "ludoKill",
    LudoMove: "ludoMove",
    LudoRoll: "ludoRoll",
    LudoUpdate: "ludoUpdate",
    LudoWin: "ludoWin",
}

class LudoEventManager {
    constructor(eventName) {
        this.eventName = eventName;
        this.events = []
    }

    on(eventName, fn) {
        this.events[eventName] = {
            run: fn,
            type: "on"
        }
    }

    once(eventName, fn) {
        this.events[eventName] = {
            run: fn,
            type: "once"
        }
    }

    emit(eventName, ...data) {
        if(!this.events[eventName]) return;

        if(this.events[eventName].type == "once") {
            this.events[eventName].run(...data)
            delete this.events[eventName]
            return;
        }

        this.events[eventName].run(...data)
    }
}

const LEM = new LudoEventManager()