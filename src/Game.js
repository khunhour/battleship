import UI from './UI';

const Player = require('./factories/playerFactory');

const Game = (() => {
  const name = 0;
  const human = new Player(name);
  const computer = new Player('computer');

  const placingShip = (player) => {
    player.gameboard.placeShip(5,0, 0, 'horizontal');
    // sth wrong with placeship validation
    player.gameboard.placeShip(4,3, 1, 'vertical');
    player.gameboard.placeShip(2,8, 1, 'horizontal');

    player.gameboard.placeShip(2,8, 8, 'vertical');
    player.gameboard.placeShip(2,2, 9, 'vertical');
  };
  
  const startGame = () => {
    placingShip(human);
    placingShip(computer);
    UI.render(human);
    UI.render(computer);
  };

  const startAttackRound = (row, col) => {
    // human's turn to attack
    human.attack(computer, row, col);
    UI.render(computer);
    checkWinner(human, computer);

    // computer's turn to attack
    let coord = computer.getRandomCoord();
    computer.attack(human, coord[0], coord[1]);
    UI.render(human);
    checkWinner(computer, human);
  };

  const checkWinner = (player, enemy) =>{
    if(checkAllShipsSunk(enemy)){
      UI.declareWinner(player);
    }
  }

  const checkAllShipsSunk = (player) =>{
    for(let i=0; i<player.gameboard.allShips.length; i++){
      if(!player.gameboard.allShips[i].isSunk){
        return false;
      }
    }
    return true;
  }
  return { startGame, startAttackRound };
})();

export default Game;
