import Coordinates from './Coordinates';
import PlacingShips from './PlacingShips';
import UI from './UI';

const Player = require('./factories/playerFactory');

const Game = (() => {
  const human = new Player('human');
  const computer = new Player('computer');
  const startGame = () => {
    PlacingShips.placeShipRandomly(human);
    PlacingShips.placeShipRandomly(computer);
    UI.render(human);
    UI.render(computer);
  };

  const checkWinner = (player, enemy) => {
    const allShipsSunk = enemy.gameboard.checkAllShipsAreSunk();
    if (allShipsSunk) {
      UI.declareWinner(player);
      UI.disableBoard();
    }
  };

  const startAttackRound = (row, col) => {
    // human's turn to attack
    human.attack(computer, row, col);
    UI.render(computer);
    checkWinner(human, computer);

    // computer's turn to attack
    const coord = Coordinates.getCoord(computer, human);
    Coordinates.calculateNextBestCoord(computer, human, coord);
    computer.attack(human, coord[0], coord[1]);
    UI.render(human);
    checkWinner(computer, human);
  };

  const restartGame = () => {
    UI.restartBoard();
    human.restartPlayer();
    computer.restartPlayer();
    startGame();
  };

  return { startGame, startAttackRound, restartGame };
})();

export default Game;
