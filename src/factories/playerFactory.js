const Gameboard = require('./gameboardFactory');

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.moves = [];
  }

  getRandomCoord() {
    let randomNum = `0${Math.floor(Math.random() * 100)}`;
    randomNum = randomNum.slice(-2);
    const coord = randomNum.split('').map(Number);
    return coord;
  }
}

module.exports = Player;
