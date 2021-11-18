const Gameboard = require('./gameboardFactory');

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  getRandomMove() {
    return Math.floor(Math.random() * 100);
  }
}

module.exports = Player;
