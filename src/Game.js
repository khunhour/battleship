import UI from './UI';

const Player = require('./factories/playerFactory');

const Game = (() => {
  const name = 0;
  const human = new Player(name);
  const computer = new Player('computer');

  const placingShip = (player) => {
    player.gameboard.placeShip(5, 0, 0, 'horizontal');
    // sth wrong with placeship validation
    player.gameboard.placeShip(4, 3, 1, 'vertical');
    player.gameboard.placeShip(2, 8, 1, 'horizontal');

    player.gameboard.placeShip(2, 8, 8, 'vertical');
    player.gameboard.placeShip(2, 2, 9, 'vertical');
  };

  const startGame = () => {
    placingShip(human);
    placingShip(computer);
    UI.render(human);
    UI.render(computer);
  };

  const checkAllShipsSunk = (player) => {
    for (let i = 0; i < player.gameboard.allShips.length; i++) {
      if (!player.gameboard.allShips[i].isSunk) {
        return false;
      }
    }
    return true;
  };

  const checkWinner = (player, enemy) => {
    if (checkAllShipsSunk(enemy)) {
      UI.declareWinner(player);
    }
  };

  const getRandomCoord = (player) => {
    console.log('getRandomCoord');
    let randomNum = `0${Math.floor(Math.random() * 100)}`;
    randomNum = randomNum.slice(-2);
    const coord = randomNum.split('').map(Number);

    if (player.moves.includes(coord)) {
      return getRandomCoord();
    }
    player.moves.push(coord);
    return coord;
  };

  const getSmartCoord = (player, coord) => {
    console.log('getsmartCoord');
    const row = coord[0];
    const col = coord[1];
    const possibleMoves = [
      [row, col + 1],
      [row, col - 1],
      [row + 1, col],
      [row - 1, col],
    ];
    possibleMoves.forEach((move) => {
      // remove possible coords that are not within board range
      if (move[0] < 0 || move[0] > 9 || move[1] < 0 || move[1] > 9) {
        const index = possibleMoves.indexOf(move);
        possibleMoves.splice(index, 1);
      }
      // remove possible coords that already used
      if (player.moves.includes(move)) {
        const index = possibleMoves.indexOf(move);
        possibleMoves.splice(index, 1);
      }
    });

    possibleMoves.forEach((move) => {
      player.smartMoves.push(move);
    });
    console.log(player.smartMoves);
    if (possibleMoves.length === 0) {
      return getRandomCoord();
    }
    const smartCoord = player.smartMoves.shift();
    player.moves.push(smartCoord);
    return smartCoord;
  };

  const getCoord = (player, enemy) => {
    // console.log(player.smartMoves);
    // console.log('getCoord');
    if (player.moves.length === 0) return getRandomCoord(player);
    const lastCoord = player.moves[player.moves.length - 1];
    const row = lastCoord[0];
    const col = lastCoord[1];
    console.log('coord');
    console.log(row);
    console.log(col);
    if (enemy.gameboard.board[row][col].hasShip !== '') {
      return getSmartCoord(player, [row, col]);
    }
    if (player.smartMoves.length !== 0) {
      const smartMove = player.smartMoves[0];
      player.smartMoves.shift();
      return smartMove;
    }
    return getRandomCoord(player);
  };

  const startAttackRound = (row, col) => {
    // human's turn to attack
    human.attack(computer, row, col);
    UI.render(computer);
    checkWinner(human, computer);

    // computer's turn to attack
    const coord = getCoord(computer, human);
    // console.log(computer.smartMoves);
    computer.attack(human, coord[0], coord[1]);
    UI.render(human);
    checkWinner(computer, human);
  };
  return { startGame, startAttackRound };
})();

export default Game;
