const Ship = require('./shipFactory');

class Gameboard {
  constructor() {
    this.board = this.createGrid();
    this.allShips = [];
    this.createGrid();
  }

  createGrid() {
    this.board = [];
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
    if (!this.checkShipPlacementValidity(length, row, col, direction)) return;
    const shipId = this.getShipId();
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
    // console.log(this.board[row][col].isShot);
    if (this.board[row][col].isShot) return;

    // record missed shot as isShot
    this.board[row][col].isShot = true;

    if (this.checkHasShip(row, col)) {
      const attackedShip = this.getAttackedShip(row, col);
      attackedShip.hit([row, col]);
      attackedShip.checkSunkState();
    }
  }

  checkShipPlacementValidity(length, rowValue, colValue, direction) {
    let row = rowValue;
    let col = colValue;
    for (let i = 0; i < length; i++) {
      if (this.board[row][col].hasShip !== '') {
        return false;
      }
      if (direction === 'vertical') {
        row++;
      } else if (direction === 'horizontal') {
        col++;
      }
    }
    return true;
  }

  getShipId() {
    // set shipId to the index inside of allShips
    return this.allShips.length;
  }

  checkHasShip(row, col) {
    return this.board[row][col].hasShip !== '';
  }

  getAttackedShip(row, col) {
    const attackedShipId = Number(this.board[row][col].hasShip);
    return this.allShips[attackedShipId];
  }

  checkAllShipsAreSunk() {
    const allSunkShips = this.allShips.filter((ship) => ship.isSunk);
    if (allSunkShips.length === this.allShips.length) return true;
    return false;
  }
}

module.exports = Gameboard;
