import UI from './UI';

const Player = require('./factories/playerFactory');

const Game = (() => {
  const name = 0;
  const human = new Player(name);
  const computer = new Player('computer');

  const placingShip = (player) => {
    player.gameboard.placeShip(5, [0, 0], 'horizontal');
    // sth wrong with placeship validation
    player.gameboard.placeShip(4, [3, 1], 'vertical');
    player.gameboard.placeShip(2, [8, 1], 'horizontal');

    player.gameboard.placeShip(2, [8, 8], 'vertical');
    player.gameboard.placeShip(2, [2, 9], 'vertical');
  };
  const startGame = () => {
    placingShip(human);
    placingShip(computer);
    UI.render(human);
    UI.render(computer);
  };

  const startAttack = (row, col) => {
    human.attack(computer, [row, col]);
    UI.render(computer, row, col);
  };

  return { startGame, startAttack };
})();

export default Game;
