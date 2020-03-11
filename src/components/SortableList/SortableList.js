import React, {useRef} from 'react';
import {closest, getIndexOf, isBefore} from './utils';

let clone = null;
let target = null;
let startTargetIndex = null;

let targetCursorX = 0;
let targetCursorY = 0;

function isTouchDevice(event) {
  return !!event.targetTouches;
}

function getCursorData(event) {
  if (isTouchDevice(event)) {
    return event.targetTouches[0]
  }

  return {
    pageX: event.pageX,
    pageY: event.pageY,
    clientX: event.clientX,
    clientY: event.clientY
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
  element.style['touch-actions'] = 'none';
}

function SortableList({children, itemSelector, dragHelperSelector, sort}) {
  const listEl = useRef(null);

  function handleDragStart(event) {
    const dragHelper = closest(event.target, dragHelperSelector, listEl);

    if (!dragHelper) {
      return;
    }

    target = closest(dragHelper, itemSelector, listEl);
    startTargetIndex = getIndexOf(target);

    let boundRect = target.getBoundingClientRect();
    let cursor = getCursorData(event);

    targetCursorX = cursor.pageX - boundRect.left;
    targetCursorY = cursor.pageY - boundRect.top;

    clone = target.cloneNode(true);

    clone.querySelectorAll('select').forEach(select => {
      select.value = select.dataset.value;
    });

    applyDragStyles(clone, boundRect);

    target.parentNode.appendChild(clone);

    if (isTouchDevice(event)) {
      window.addEventListener('touchmove', handleDragMove, {passive: false});
      window.addEventListener('touchend', handleDragEnd, false);
      window.addEventListener('touchcancel', handleDragEnd, false);
    } else {
      window.addEventListener('mousemove', handleDragMove, false); //todo: handle scroll at the same time
      window.addEventListener('mouseup', handleDragEnd, false);
    }
  }

  function handleDragMove(event) {
    event.preventDefault(); // prevent scrolling and text select

    let cursor = getCursorData(event);

    clone.style.left = cursor.pageX - targetCursorX + 'px';
    clone.style.top = cursor.pageY - targetCursorY + 'px';

    let elementUnderCursor = closest(document.elementFromPoint(cursor.clientX, cursor.clientY), itemSelector, listEl);

    if (elementUnderCursor && elementUnderCursor !== target && elementUnderCursor.parentNode === target.parentNode) {
      if (isBefore(target, elementUnderCursor)) { // todo: remove blinking
        target.parentNode.insertBefore(target, elementUnderCursor.nextSibling);
      } else {
        target.parentNode.insertBefore(target, elementUnderCursor);
      }
    }
  }

  function handleDragEnd() {
    window.removeEventListener('touchmove', handleDragMove, {passive: false});
    window.removeEventListener('touchend', handleDragEnd);
    window.removeEventListener('touchcancel', handleDragEnd);

    window.removeEventListener('mousemove', handleDragMove, false);
    window.removeEventListener('mouseup', handleDragEnd, false);

    sort(startTargetIndex, getIndexOf(target));

    clone.remove();
    target = null;
    clone = null;
  }

  return (
    <div className={'sortable-list'}
         onMouseDown={handleDragStart}
         onTouchStart={handleDragStart}
         ref={listEl}>
      {children}
    </div>
  )
}

export default React.memo(SortableList);
