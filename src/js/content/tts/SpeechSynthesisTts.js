import BaseTts from './BaseTts';

class SpeechSynthesisTts extends BaseTts {
  constructor(...args) {
    super(...args);
  }

  static id() {
    return 'speech_synthesis_tts';
  }

  static name() {
    return 'Speech Synthesis Tts - paid';
  }

  static description() {
    return `Console Tts Engine - free`;
  }

  getVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => v.lang.startsWith(this.lang));
  }

  speak(text) {
    if (!this.isEnabled || !speechSynthesis) {
      return;
    }
    const voice = this.getVoice();
    if (!voice) {
      return;
    }
    const ssu = new SpeechSynthesisUtterance(text);
    ssu.lang = voice.lang;

		speechSynthesis.cancel();
		speechSynthesis.speak(ssu);
  }
}

export default SpeechSynthesisTts;
