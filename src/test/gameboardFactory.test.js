const { test, expect, beforeEach } = require('@jest/globals');
const Gameboard = require('../factories/gameboardFactory');

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test('initial board', () => {
  console.log(gameboard.board);
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
  console.log(gameboard.board);
  for (let i = 2; i < 7; i++) {
    expect(gameboard.board[3][i].hasShip).not.toBe('');
  }
  expect(gameboard.board[3][1].hasShip).toBe('');
  expect(gameboard.board[3][7].hasShip).toBe('');
  expect(gameboard.board[3][8].hasShip).toBe('');
});

test('if placement is not valid then nth will happen', () => {
  gameboard.placeShip(5, [8, 4], 'horizontal');
  expect(gameboard.board[8][4].hasShip).toBe('');
});

// test('recieve attak', () => {
//   gameboard.recieveAttack();
// });
