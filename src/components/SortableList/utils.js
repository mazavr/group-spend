const ELEMENT_NODE_TYPE = 1;

function matches(element, selector) {
  if (typeof Element === 'undefined') {
    throw new Error('global Element is undefined');
  }

  let matchesFunction = Element.prototype.matches || Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

  return matchesFunction.call(element, selector);
}

export function closest(element, selector, rootNode) {
  while (element) {
    if (element === rootNode || element === document.body) {
      return null;
    }

    if (element.nodeType === ELEMENT_NODE_TYPE && matches(element, selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return element;
}

export function isBefore(currentNode, nextNode) {
  while (currentNode) {
    if (currentNode === nextNode) {
      return true;
    }
    currentNode = currentNode.nextSibling
  }

  return false;
}

export function getIndexOf(child) {
  let i = -1;

  while (child) {
    i++;
    child = child.previousSibling;
  }

  return i;
}
