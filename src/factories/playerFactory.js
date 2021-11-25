const Gameboard = require('./gameboardFactory');

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.moves = [];
  }

  attack(enemy, row, col) {
    console.log('attak pplayer');
    enemy.gameboard.recieveAttack(row , col);
  }

  getRandomCoord() {
    let randomNum = Math.floor(Math.random() * 100);
    this.moves.push(randomNum);
    let randomNumString = `0${randomNum}`;
    randomNumString = randomNumString.slice(-2);
    if (this.moves.includes(randomNum)) {
      return this.getRandomCoord();
    }
    const coord = randomNumString.split('').map(Number);
    return coord;
  }
}

module.exports = Player;
