import AcceptableTags from './AcceptableElements';
import i18n from '../i18n';

class BaseElement {
  constructor(domNode) {
    this.node = domNode;
    this.parent = this.node.parentNode;
    this.wrapper = null;
    this.isHighlighted = false;
  }

  isAcceptable() {
    return AcceptableTags.indexOf(this.node.tagName) > -1;
  }
  
  isTextNode() {
    return false;
  }
  
  isUnacceptable() {
    return this.node.nodeName === 'SCRIPT' || this.node.nodeName === 'NOSCRIPT';
  }
  
  isHidden() {
    let styles = window.getComputedStyle(this.node, null);
    return styles.getPropertyValue('visibility') === 'hidden'
      || styles.getPropertyValue('display') === 'none';
  };
  
  isEmpty() {
    const text = this.node.getAttribute('aria-label')
      || this.node.getAttribute('alt')
      || this.node.innerText
      || '';
    return !text.trim().length;
  }

  highlight() {
    this.node.setAttribute('data-sr-current', true);
    this.node.focus();
    this.isHighlighted = true;
  }

  fade() {
    if (!this.isHighlighted) {
      return;
    }
    this.isHighlighted = false;
    this.node.removeAttribute('data-sr-current', true);
    this.node.blur();
  }

  getContent() {
    const content = this.node.textContent.trim();

		if (this.node.getAttribute('aria-label') ) {
			return this.node.getAttribute('aria-label');
		} else if (this.node.getAttribute('alt') ) {
			return this.node.getAttribute('alt');
		}

		return content;
  }

  getRole() {
    const name = this.node.tagName;
    let role = name;

		if (this.node.getAttribute('role')) {
			role = this.node.getAttribute('role');
		}

		return role || 'default';
	}

  toString() {
    const content = this.getContent();
    const lang = document.documentElement.lang || 'en';
    const role = i18n[lang][this.getRole()] || '';
    return `${content}${role ? `, ${role}` : ''}`
  }
}

export default BaseElement;
