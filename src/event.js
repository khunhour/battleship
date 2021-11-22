const Event = (() => {
  const playgame = () => {
    const t = 1;
    return t;
  };
  const startTileEvent = () => {
    const computerTiles = document.querySelectorAll('#computer-grid .tile');
    computerTiles.forEach((tile) => {
      tile.addEventListener('click', playgame);
    });
  };

  return { startTileEvent };
})();

export default Event;
