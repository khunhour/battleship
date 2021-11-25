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
}

module.exports = Player;
