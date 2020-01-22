import BaseElement from './BaseElement';
import TextElement from './TextElement';

class ElementsFactory {
  constructor() {}
  buildElement(node) {
    if (node.nodeName === "#text") {
      return new TextElement(node);
    }
    return new BaseElement(node);
  }
}

export default ElementsFactory;
