class BaseTts {
  constructor(lang) {
    this.isEnabled = false;
    this.lang = lang;
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  abort() {

  }
}

export default BaseTts;