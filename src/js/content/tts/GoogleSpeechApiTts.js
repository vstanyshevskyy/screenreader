import BaseTts from './BaseTts';

class GoogleSpeechApiTts extends BaseTts {
  constructor(lang, ...args) {
    super(...args);
    chrome.storage.sync.get(['api_key'], ({ api_key = "" }) => {
      this.apiKey = api_key;
    });

    this.lang = lang;
    this.player = new window.Audio();
  }

  static id() {
    return 'google_tts';
  }

  static name() {
    return 'Google Text to Speech Engine';
  }

  static description() {
    return 'Google Text to Speech Engine';
  }

  speak(text) {
    if (!this.isEnabled) {
      return;
    }

    const ttsReq = new Request(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`, {
      method: 'POST',
      headers: new Headers([
        ['cache-control', 'force-cache']
      ]),
      cache: 'force-cache',
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: this.lang,
          ssmlGender: "FEMALE"
        },
        audioConfig: {
          audioEncoding: "MP3",
          pitch: 0,
          speakingRate: 1
        }
      })
    });

    fetch(ttsReq)
      .then(response => response.json())
      .then(json => {
        this.player.src = `data:audio/mp3;base64,${json.audioContent}`;
        this.player.play();
      });
  }

  abort() {
    this.player.pause();
  }
}

export default GoogleSpeechApiTts;