const Gameboard = require('../factories/gameboardFactory');

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test('initial board', () => {
  expect(gameboard.allShips).toStrictEqual([]);
  expect(gameboard.board.length).toBe(10);
  expect(gameboard.board[0].length).toBe(10);
  expect(gameboard.board[0][0]).toStrictEqual({
    hasShip: '',
    isShot: false,
  });
});

test('placing ships vertically', () => {
  gameboard.placeShip(4, [1, 2], 'vertical');
  for (let i = 1; i < 5; i++) {
    expect(gameboard.board[i][2].hasShip).not.toBe('');
  }
  expect(gameboard.board[0][2].hasShip).toBe('');
  expect(gameboard.board[5][2].hasShip).toBe('');
  expect(gameboard.board[6][2].hasShip).toBe('');
  expect(gameboard.board[7][2].hasShip).toBe('');
});

test('placing ships horizontally', () => {
  gameboard.placeShip(5, [3, 2], 'horizontal');
  for (let i = 2; i < 7; i++) {
    expect(gameboard.board[3][i].hasShip).not.toBe('');
  }
  expect(gameboard.board[3][1].hasShip).toBe('');
  expect(gameboard.board[3][7].hasShip).toBe('');
  expect(gameboard.board[3][8].hasShip).toBe('');
});

// check valid attack not on the same coord
test('recieved attack and record shot', () => {
  gameboard.recieveAttack(1, 8);
  expect(gameboard.board[1][8].isShot).toBe(true);
});

test('recieved attack where the ship is', () => {
  gameboard.placeShip(2, [3, 3], 'horizontal');
  gameboard.recieveAttack(3, 3);
  expect(gameboard.allShips[0].hits.length).not.toBe(0);
});

test('recieved attack and ship is sunk', () => {
  gameboard.placeShip(2, [3, 3], 'horizontal');
  gameboard.placeShip(2, [8, 8], 'vertical');
  gameboard.recieveAttack(3, 3);
  gameboard.recieveAttack(3, 4);
  gameboard.recieveAttack(8, 8);
  expect(gameboard.allShips[0].isSunk).toBe(true);
  expect(gameboard.allShips[1].isSunk).toBe(false);
});

test('check all ships has sunk', () => {
  gameboard.placeShip(1, [0, 0], 'horizontal');
  gameboard.placeShip(2, [4, 0], 'horizontal');
  gameboard.recieveAttack(0, 0);
  gameboard.recieveAttack(4, 0);
  gameboard.recieveAttack(4, 1);
  expect(gameboard.checkAllShipsAreSunk()).toBe(true);
});
