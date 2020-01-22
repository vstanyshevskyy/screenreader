import BaseTts from './BaseTts';

class ConsoleTts extends BaseTts {
  constructor(...args) {
    super(...args);
  }

  static id() {
    return 'console_tts';
  }

  static name() {
    return 'Console Tts Engine';
  }

  static description() {
    return `Console Tts Engine - for debugging`;
  }

  speak(text) {
    if (!this.isEnabled) {
      return;
    }
    console.log(text);
  }
}

export default ConsoleTts;
