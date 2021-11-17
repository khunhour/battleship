const Ship = require('./shipFactory');

class Gameboard {
  constructor() {
    this.board = [];
    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < 100; i++) {
      this.board.push({
        hasShip: false,
        isShot: false,
      });
    }
  }

  placeShip(length, location) {
    // this.board[location].hasShip = true;
    for (let i = location; i < length; i++) {
      this.board[i].hasShip = true;
    }
  }

  recieveAttack(location) {
    this.board[location].isShot = true;
    if (this.board[location].hasShip) {
      Ship.hit(location);
    }
  }

  checkHasShip(location) {
    return this.board[location].hasShip;
  }
}
