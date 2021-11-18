class Ship {
  shipID = 0;

  constructor( length) {
    // might be a prolem with ship id make it private
    this.shipId = shipId;
    this.length = length;
    this.hits = [];
    this.isSunk = false;
    this.shipID++;
  }

  hit(number) {
    this.hits.push(number);
  }

  isSunk() {
    if (this.length === this.hits.length) {
      this.isSunk = true;
    }
  }
}
module.exports = Ship;
