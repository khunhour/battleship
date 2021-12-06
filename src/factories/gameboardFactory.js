const Ship = require('./shipFactory');

class Gameboard {
  constructor() {
    this.board = [];
    this.allShips = [];
    this.createGrid();
  }

  createGrid() {
    for (let row = 0; row < 10; row++) {
      this.board[row] = [];
      for (let col = 0; col < 10; col++) {
        this.board[row].push({
          hasShip: '',
          isShot: false,
        });
      }
    }
  }

  placeShip(length, coord, direction) {
    let row = coord[0];
    let col = coord[1];
    const shipId = this.allShips.length;
    const battleship = new Ship(length, shipId);
    this.allShips.push(battleship);
    for (let i = 0; i < length; i++) {
      this.board[row][col].hasShip = shipId;
      if (direction === 'vertical') {
        row++;
      } else {
        col++;
      }
    }
  }

  recieveAttack(row, col) {
    if (this.board[row][col].isShot) return;

    // record missed shot as isShot
    this.board[row][col].isShot = true;

    if (this.checkHasShip(row, col)) {
      const attackedShip = this.getAttackedShip(row, col);
      attackedShip.hit([row, col]);
      attackedShip.updateSunkState();
    }
  }

  checkAllShipsAreSunk() {
    const allSunkShips = this.allShips.filter((ship) => ship.isSunk);
    if (allSunkShips.length === this.allShips.length) return true;
    return false;
  }

  checkHasShip(row, col) {
    return this.board[row][col].hasShip !== '';
  }

  getAttackedShip(row, col) {
    const attackedShipId = Number(this.board[row][col].hasShip);
    return this.allShips[attackedShipId];
  }
}

module.exports = Gameboard;
