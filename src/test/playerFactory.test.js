const { test, expect } = require('@jest/globals');
const Player = require('../factories/playerFactory');

test('create new player template', () => {
  const human = new Player('human');
  expect(human.name).toBe('human');
  expect(human.smartMoves).toStrictEqual([]);
  expect(human.moves).toStrictEqual([]);
});

// test('attack enemy', () => {
//   const human = new Player('human');
//   const computer = new Player('computer');
//   jest.spyOn(computer.gameboard, 'recieveAttack');
//   human.attack(computer, 0, 0);
//   expect(computer.gameboard.recieveAttack).toHaveBeenCalledWith(0, 0);
// });

test('restart Player', () => {
  const computer = new Player('computer');
  computer.moves.push(2);
  computer.smartMoves.push(5);
  computer.restartPlayer();
  expect(computer.moves).toStrictEqual([]);
  expect(computer.smartMoves).toStrictEqual([]);
});
