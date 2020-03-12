import {closest, getIndexOf, isBefore} from './utils';

function isTouchDevice(event) {
  return !!event.targetTouches;
}

function getPointerData(event) {
  const dataSrc = isTouchDevice(event)
    ? event.targetTouches[0]
    : event;

  return {
    pageX: dataSrc.pageX,
    pageY: dataSrc.pageY,
    clientX: dataSrc.clientX,
    clientY: dataSrc.clientY
  }
}

function applyDragStyles(element, boundRect) {
  element.style.position = 'fixed';
  element.style.left = boundRect.left + 'px';
  element.style.top = boundRect.top + 'px';
  element.style.width = boundRect.width + 'px';
  element.style['z-index'] = 1000;
  element.style.opacity = 0.8;
  element.style['pointer-events'] = 'none';
  element.style['touch-action'] = 'none';
}

export function makeSortable({dragHelperSelector, listEl, itemSelector, sort}) {
  let clone = null;
  let movingElement = null;
  let initialMovingElementIndex = null;

  let movingElementPointerX = 0;
  let movingElementPointerY = 0;

  let initialPageScrollY = 0;
  let initialPageScrollX = 0;

  let previousElementUnderPointer = null;

  function handleDragStart(event) {
    const dragHelper = closest(event.target, dragHelperSelector, listEl);

    if (!dragHelper) {
      return;
    }

    event.preventDefault();

    movingElement = closest(dragHelper, itemSelector, listEl);
    clone = movingElement.cloneNode(true);
    movingElement.querySelectorAll('.js-drag-state').forEach(el => {
      el.classList.add('drag-state--drag');
    });
    initialMovingElementIndex = getIndexOf(movingElement);

    const boundRect = movingElement.getBoundingClientRect();
    const pointer = getPointerData(event);

    movingElementPointerX = pointer.pageX - boundRect.left;
    movingElementPointerY = pointer.pageY - boundRect.top;
    initialPageScrollY = window.pageYOffset;
    initialPageScrollX = window.pageXOffset;

    clone.querySelectorAll('select').forEach(select => {
      select.value = select.dataset.value;
    });

    applyDragStyles(clone, boundRect);

    movingElement.parentNode.appendChild(clone);

    addDragProcessEventListeners(isTouchDevice(event), listEl);
  }

  function handleDragMove(event) {
    event.preventDefault(); // prevent scrolling and text select

    const pointer = getPointerData(event);

    clone.style.left = pointer.pageX - movingElementPointerX + initialPageScrollX - window.pageXOffset + 'px';
    clone.style.top = pointer.pageY - movingElementPointerY + initialPageScrollY - window.pageYOffset + 'px';

    const elementUnderPointer = closest(document.elementFromPoint(pointer.clientX, pointer.clientY), itemSelector, listEl);

    if (previousElementUnderPointer === elementUnderPointer) {
      return;
    }

    previousElementUnderPointer = elementUnderPointer;

    if (elementUnderPointer && elementUnderPointer !== movingElement && elementUnderPointer.parentNode === movingElement.parentNode) {
      if (isBefore(movingElement, elementUnderPointer)) {
        movingElement.parentNode.insertBefore(movingElement, elementUnderPointer.nextSibling);
      } else {
        movingElement.parentNode.insertBefore(movingElement, elementUnderPointer);
      }
    }
  }

  function addDragStartEventListeners(el) {
    el.addEventListener('touchstart', handleDragStart, {passive: false});
    el.addEventListener('mousedown', handleDragStart, false);
  }

  function removeDragStartEventListeners(el) {
    el.removeEventListener('touchstart', handleDragStart, {passive: false});
    el.removeEventListener('mousedown', handleDragStart, false);
  }

  function addDragProcessEventListeners(isTouchDevice, el) {
    if (isTouchDevice) {
      el.addEventListener('touchmove', handleDragMove, {passive: false});
      el.addEventListener('touchend', handleDragEnd, false);
      el.addEventListener('touchcancel', handleDragEnd, false);
    } else {
      window.addEventListener('mousemove', handleDragMove, false);
      window.addEventListener('mouseup', handleDragEnd, false);
    }
  }

  function removeDragProcessEventListeners(el) {
    el.removeEventListener('touchmove', handleDragMove, {passive: false});
    el.removeEventListener('touchend', handleDragEnd);
    el.removeEventListener('touchcancel', handleDragEnd);

    window.removeEventListener('mousemove', handleDragMove, false);
    window.removeEventListener('mouseup', handleDragEnd, false);
  }

  function handleDragEnd() {
    removeDragProcessEventListeners(listEl);

    clone.parentNode.removeChild(clone);
    clone = null;

    movingElement.querySelectorAll('.js-drag-state').forEach(el => {
      el.classList.remove('drag-state--drag');
    });

    sort(initialMovingElementIndex, getIndexOf(movingElement));
    movingElement = null;
  }

  addDragStartEventListeners(listEl);

  return () => {
    removeDragStartEventListeners(listEl);
    removeDragProcessEventListeners(listEl);
  }
}
