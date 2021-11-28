const Gameboard = require('./gameboardFactory');

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.moves = [];
    this.smartMoves = [];
  }

  attack(enemy, row, col) {
    enemy.gameboard.recieveAttack(row, col);
  }

  restartPlayer() {
    this.moves = [];
    this.smartMoves = [];
    this.gameboard = new Gameboard();
  }
}

module.exports = Player;
