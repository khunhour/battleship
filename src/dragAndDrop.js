const DragAndDrop = (() => {
  const drag = (event) => {
    event.dataTransfer.setData('text', event.target.className);
    console.log('dragging');
  };

  const dragOver = (e) => {
    if (e.target.className === 'tile') {
      e.target.classList.add('can-drop');
    } else {
      e.target.classList.add('can-not-drop');
    }
    // const className = e.dataTransfer.getData('text');
    // e.target.className = className;
    e.preventDefault();
  };

  const mouseOut = (e) => {
    console.log(e.target.classList);
    e.target.classList.remove('can-drop can-not-drop');
  };

  const drop = (e) => {
    e.preventDefault();
    const className = e.dataTransfer.getData('text');
    e.target.className = className;
  };
  const activateDragStartEvent = () => {
    const ships = document.querySelectorAll('[draggable=true]');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', drag);
    });
  };

  const activateDragOverEvent = (div) => {
    div.addEventListener('mouseout', mouseOut);
    div.addEventListener('dragover', dragOver);
  };

  const activateDropEvent = (div) => {
    div.addEventListener('drop', drop);
  };
  return { activateDragStartEvent, activateDragOverEvent, activateDropEvent };
})();

function dragStart() {}

export default DragAndDrop;
