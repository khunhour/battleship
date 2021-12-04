/* eslint-disable prefer-destructuring */
import Game from './Game';
import PlacingShips from './PlacingShips';

const Event = (() => {
  const startTileEvent = () => {
    const computerTiles = document.querySelectorAll('#computer-grid .tile');
    computerTiles.forEach((tile) => {
      tile.addEventListener('click', (e) => {
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        Game.startAttackRound(row, col);
      });
    });
  };

  const startPlaceShipsEvent = () => {
    const humanGrid = document.querySelector('#human-grid');
    humanGrid.addEventListener('mouseover', Game.displayHoverEffect);
    humanGrid.addEventListener('mouseleave', PlacingShips.removeHoverShipUI);
    humanGrid.addEventListener('click', Game.placeShipManually);
  };

  const startButtonEvent = () => {
    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', () => {
      Game.startGame();
      startTileEvent();
    });

    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', () => {
      Game.restartGame();
      startTileEvent();
    });

    const randomize = document.getElementById('randomize');
    randomize.addEventListener('click', Game.randomizeShip);

    const reset = document.getElementById('reset');
    reset.addEventListener('click', Game.restartGame);
  };

  return { startButtonEvent, startPlaceShipsEvent };
})();

export default Event;
