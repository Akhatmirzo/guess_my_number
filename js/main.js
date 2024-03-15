'use strict';
const createGamerWrap = document.querySelector('.create__gamer');
const gamersData = JSON.parse(localStorage.getItem('gamers')) || [];
let Gamer = JSON.parse(localStorage.getItem('Gamer'));

// Register and login
if (!Gamer) {
    createGamerWrap.style.display = 'flex';
}

class gamerData {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.highscore = 0;
        this.wins = 0;
        this.losses = 0;
    }

    save() {
        const newGamer = {
            id: gamersData.length,
            ...this,
        }

        gamersData.push(newGamer);
        localStorage.setItem('gamers', JSON.stringify(gamersData));
        localStorage.setItem('Gamer', JSON.stringify(newGamer));
        alert('Gamer Created Successfully');
        window.location.reload();
    }

    static findById(id) {
        for (const gamer of gamersData) {
            if (gamer.id == id) {
                return gamer;
            }
        }
    }

    static changeScore(id, score) {
        for (const gamer of gamersData) {
            if (gamer.id == id) {
                gamer.highscore += score;
            }
        }
        localStorage.setItem('gamers', JSON.stringify(gamersData));
    }

    static addWins(id) {
        for (const gamer of gamersData) {
            if (gamer.id == id) {
                gamer.wins++;
            }
        }
        localStorage.setItem('gamers', JSON.stringify(gamersData));
    }
}