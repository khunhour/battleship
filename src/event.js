/* eslint-disable prefer-destructuring */
import Game from './Game';
import UI from './UI';

const Event = (() => {
  const playgame = (e) => {
    const i = e;
  };
  const startTileEvent = () => {
    const computerTiles = document.querySelectorAll('#computer-grid .tile');
    computerTiles.forEach((tile) => {
      tile.addEventListener('click', (e) => {
        playgame(e);
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        Game.startAttackRound(row, col);
      });
    });
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
  };

  return { startButtonEvent };
})();

export default Event;
