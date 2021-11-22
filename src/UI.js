const UI = (() => {
  const render = (humanBoard, computerBoard) => {
    // display sth
  };

  const createBoard = () => {
    const playerGrid = document.getElementById('player-grid');
    const computerGrid = document.getElementById('computer-grid');

    for (let i = 0; i < 100; i++) {
      const div = document.createElement('div');
      div.classList.add('tile');
      playerGrid.appendChild(div);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.dataset.row = i;
        div.dataset.col = j;
        computerGrid.appendChild(div);
      }
    }
  };

  return { createBoard };
})();

export default UI;
