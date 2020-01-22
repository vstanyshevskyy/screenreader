import getNodes from './content/getNodes';
import ConsoleTts from './content/tts/ConsoleTts';
import GoogleSpeechApiTts from './content/tts/GoogleSpeechApiTts';
import SpeechSynthesisTts from './content/tts/SpeechSynthesisTts';

const language = document.documentElement.lang || 'en';
const consoleTts = new ConsoleTts(language);
const googleTts = new GoogleSpeechApiTts(language);
const speechSynthesisTts = new SpeechSynthesisTts(language);
const tts = {
  [ConsoleTts.id()]: consoleTts,
  [GoogleSpeechApiTts.id()]: googleTts,
  [SpeechSynthesisTts.id()]: speechSynthesisTts
};

chrome.storage.sync.get(Object.keys(tts), (data) => {
  Object.keys(data).forEach(key => {
    if (data[key]) {
      tts[key].enable();
    } else {
      tts[key].disable();
    }
  })
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "settingsChange") {
      const ttsName = Object.keys(request.payload)[0];
      if (!tts[ttsName]) {
        return;
      }
      if (request.payload[ttsName]) {
        console.log(`Enabling ${ttsName}`);
        tts[ttsName].enable();
      } else {
        console.log(`Disabling ${ttsName}`);
        tts[ttsName].disable();
      }
    }
  }
);

(function(document) {
  consoleTts.enable();
  // googleTts.enable();
  const nodesList = getNodes();
  console.log(nodesList);

  let currentElement = nodesList.getCurrentElement();
  var keyboardHandler = function(e) {
    const keysMapping = {
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40
    };
    let elementChanged = false;

    if (e.altKey) {
      currentElement.fade();
      switch (e.keyCode) {
        case keysMapping.ARROW_DOWN:
          currentElement = nodesList.next();
          elementChanged = true;
          break;
        case keysMapping.ARROW_UP:
          currentElement = nodesList.previous();
          elementChanged = true;
          break;
      }
      if (elementChanged) {
        currentElement.highlight();
        Object.values(tts).forEach(engine => {
          engine.speak(currentElement.toString());
        });
      }
    }
  }
  document.addEventListener('keydown', keyboardHandler);
}(document) );