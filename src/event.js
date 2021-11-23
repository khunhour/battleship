import UI from './UI';

const Event = (() => {
  const playgame = (e) => {
    console.log(e.target);
  };
  const startTileEvent = () => {
    const computerTiles = document.querySelectorAll('#computer-grid .tile');
    computerTiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        playgame();
        // need editing
        UI.render();
      });
    });
  };

  return { startTileEvent };
})();

export default Event;
