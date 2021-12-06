import announcementUI from './announcementUI';
import Event from './event';
import UI from './UI';

UI.createBoard();
announcementUI.displayWelcomeMsg();
Event.startButtonEvent();
Event.startPlaceShipsEvent();
Event.startTileEvent();
