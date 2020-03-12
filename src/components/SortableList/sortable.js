import {closest, getIndexOf, isBefore} from './utils';

function isTouchDevice(event) {
  return !!event.targetTouches;
}

function getCursorData(event) {
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
  let target = null;
  let startTargetIndex = null;

  let targetCursorX = 0;
  let targetCursorY = 0;

  let initialPageScrollY = 0;
  let initialPageScrollX = 0;

  function handleDragStart(event) {
    const dragHelper = closest(event.target, dragHelperSelector, listEl);

    if (!dragHelper) {
      return;
    }

    event.preventDefault();

    target = closest(dragHelper, itemSelector, listEl);
    clone = target.cloneNode(true);
    target.querySelectorAll('.js-drag-state').forEach(el => {
      el.classList.add('drag-state--drag');
    });
    startTargetIndex = getIndexOf(target);

    let boundRect = target.getBoundingClientRect();
    let cursor = getCursorData(event);

    targetCursorX = cursor.pageX - boundRect.left;
    targetCursorY = cursor.pageY - boundRect.top;
    initialPageScrollY = window.pageYOffset;
    initialPageScrollX = window.pageXOffset;

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

    clone.style.left = cursor.pageX - targetCursorX + initialPageScrollX - window.pageXOffset + 'px';
    clone.style.top = cursor.pageY - targetCursorY + initialPageScrollY - window.pageYOffset + 'px';

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

    target.querySelectorAll('.js-drag-state').forEach(el => {
      el.classList.remove('drag-state--drag');
    });

    target = null;
    clone = null;
  }

  listEl.addEventListener('touchstart', handleDragStart, {passive: false});
  listEl.addEventListener('mousedown', handleDragStart, false);

  return () => {
    listEl.removeEventListener('touchstart', handleDragStart, {passive: false});
    listEl.removeEventListener('mousedown', handleDragStart, false);
  }
}
