class Ship {
  constructor(length, shipId) {
    // might be a prolem with ship id make it private
    this.shipId = shipId;
    this.length = length;
    this.hits = [];
    this.isSunk = false;
  }

  hit(coord) {
    this.hits.push(coord);
  }

  checkSunkState() {
    if (this.length === this.hits.length) {
      this.isSunk = true;
    }
  }
}
module.exports = Ship;
