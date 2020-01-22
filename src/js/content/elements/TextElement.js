import BaseElement from './BaseElement';

class TextElement extends BaseElement {
  constructor(domNode) {
    super(domNode);
  }

  isTextNode() {
    return true;
  }

  isUnacceptable() {
    return this.node.parentNode.nodeName === 'SCRIPT';
  }

  isHidden() {
    const styles = window.getComputedStyle(this.node.parentNode, null);
    return styles.getPropertyValue('display') === 'hidden'
      || styles.getPropertyValue('display') === 'none';
  }

  isEmpty() {
    return !this.node.data.trim().length;
  }

  highlight() {
    var parent = this.node.parentNode;
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(this.node.nodeValue));
    this.node.replaceWith(span);
    span.setAttribute('data-sr-current', true);
    this.isHighlighted = true;
    this.wrapper = span;
  }

  fade() {
    if (!this.isHighlighted) {
      return;
    }
    this.isHighlighted = false;
    this.wrapper.parentNode.replaceChild(this.node, this.wrapper);
  }

  toString() {
    return this.node.textContent.trim();
  }
}

export default TextElement;
