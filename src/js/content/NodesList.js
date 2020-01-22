class NodesList {
  constructor(list) {
    this.list = list;
    this.index = 0;
  }

  getCurrentElement() {
    return this.list[this.index];
  }

  next() {
    if (this.index < this.list.length) {
      this.index++;
    }
    return this.getCurrentElement();
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    }
    return this.getCurrentElement();
  }
}

export default NodesList;