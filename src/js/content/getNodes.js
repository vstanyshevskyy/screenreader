import ElementsFactory from './elements/ElementsFactory';
import NodesList from './NodesList';

const factory = new ElementsFactory();

const getNodes = () => {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT, 
    { 
      acceptNode: function(node) {
        const element = factory.buildElement(node);
        if (element.isUnacceptable() || element.isHidden()) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!element.isEmpty() && (element.isTextNode() || element.isAcceptable())) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  const elements = [];

  while(treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    const element = factory.buildElement(node);
    if (element.isTextNode() && elements.length && element.node.parentNode.isSameNode(elements[elements.length - 1].node)) {
      continue;
    }
    elements.push(element);
  }

  const nodeList = new NodesList(elements);

  return nodeList;
};

export default getNodes;
