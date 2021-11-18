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
    const shipId = this.getShipId();
    const battleship = new Ship(length, shipId);
    this.allShips.push(battleship);
    let row = coord[0];
    let col = coord[1];
    if (!this.checkShipPlacementValidity(length, coord, direction)) return;

    for (let i = 0; i < length; i++) {
      this.board[row][col].hasShip = battleship.shipId;
      if (direction === 'vertical') {
        row++;
      } else {
        col++;
      }
    }
  }

  recieveAttack(location) {
    // record missed shot as isShot
    this.board[location].isShot = true;

    if (this.checkHasShip(location)) {
      const attackedShip = this.getAttackedShip(location);
      attackedShip.hit(location);
      attackedShip.checkSunkState();
    }
  }

  checkShipPlacementValidity(length, coord, direction) {
    const row = coord[0];
    const col = coord[1];
    if (direction === 'vertical') {
      if (col > 10 - length) {
        return false;
      }
      return true;
    }
    // horizontal
    if (row > 10 - length) {
      return false;
    }
    return true;
  }

  getShipId() {
    // set shipId to the index inside of allShips
    return this.allShips.length;
  }

  checkHasShip(location) {
    return this.board[location].hasShip !== '';
  }

  getAttackedShip(location) {
    const attackedShipId = Number(this.board[location].hasShip);
    return this.Ship[attackedShipId];
  }

  checkAllShipsAreSunk() {
    const allSunkShips = this.allShips.filter((ship) => ship.isSunk);
    if (allSunkShips.length === this.allShips.length) return true;
    return false;
  }
}

module.exports = Gameboard;
