const announcementUI = (() => {
  const announcement = document.querySelector('.announcement');

  const displayWelcomeMsg = () => {
    announcement.textContent =
      'Welcome to BattleShip. Place 6 ships on your board.';
  };
  const declareWinner = (player) => {
    if (player.name === 'computer') {
      announcement.textContent = 'You Lose!';
    } else {
      announcement.textContent = 'You Won!';
    }
  };

  const displayStartingGameMsg = () => {
    announcement.textContent = 'Take turn dropping your bomb.';
  };
  return { displayWelcomeMsg, declareWinner, displayStartingGameMsg };
})();

export default announcementUI;
