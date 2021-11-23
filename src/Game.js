const Player = require('./factories/playerFactory');

const Game = (() => {
  const name = 0;
  const human = new Player(name);
  const computer = new Player('computer');

  const startGame = () => {
    // sth
  };

  return { startGame };
})();
