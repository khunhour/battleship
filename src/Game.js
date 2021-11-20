const Player = require('./factories/playerFactory');

const Game = (() => {
  const init = (name) => {
    const human = new Player(name);
    const computer = new Player('computer');
  };
})();
