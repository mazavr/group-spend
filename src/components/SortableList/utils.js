const ELEMENT_NODE_TYPE = 1;

if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype;
  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

export function closest(element, selector, rootNode) {
  while (element) {
    if (element === rootNode || element === document.body) {
      return null;
    }

    if (element.nodeType === ELEMENT_NODE_TYPE && element.matches(selector)) {
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
