const DragAndDrop = (() => {
  const dragStart = (event) => {
    event.dataTransfer.setData('text', event.target.className);
    // event.target.className = 'tile';
    console.log('dragging');
  };

  const dragOver = (e) => {
    console.log(e.target.className.includes('ship-mark'));
    const shipMark = e.dataTransfer.getData('text');
    if (e.target.className.includes('ship-mark')) {
      e.target.classList.add('can-not-drop');
    } else {
      e.target.classList.add('can-drop');
      e.preventDefault();
    }
  };

  const dragLeave = (e) => {
    console.log(e.target.classList);
    e.target.draggable = false;
    e.target.classList.remove('can-not-drop');
    e.target.classList.remove('can-drop');
  };

  const drop = (e) => {
    const className = e.dataTransfer.getData('text');
    e.target.className = className;
    e.target.draggable = true;
    e.preventDefault();
  };
  const activateDragStartEvent = () => {
    const ships = document.querySelectorAll('[draggable=true]');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', dragStart);
    });
  };

  const activateDragOverEvent = (div) => {
    div.addEventListener('dragleave', dragLeave);
    div.addEventListener('dragover', dragOver);
  };

  const activateDropEvent = (div) => {
    div.addEventListener('drop', drop);
  };
  return { activateDragStartEvent, activateDragOverEvent, activateDropEvent };
})();

export default DragAndDrop;
