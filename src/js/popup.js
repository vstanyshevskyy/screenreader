import "../css/popup.css";
import * as TtsEngines from './content/tts';

const onInputChange = (e) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.storage.sync.set({[e.target.name]: e.target.checked }, function() {
      chrome.tabs.sendMessage(activeTab.id, {
        message: "settingsChange",
        payload: {
          [e.target.name]: e.target.checked
        }
      });
    });
  });
}

function constructOptions() {
  let form = document.querySelector('.tts-list');
  const engines = TtsEngines.default;
  const enginesNames = Object.keys(engines);
  for (let engineKey of enginesNames) {
    const engine = engines[engineKey];
    const engineId = engine.id();
    chrome.storage.sync.get([engineId], (data) => {
      const isEnabled = data[engineId];
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = engine.id();
      checkbox.id = engine.id();
      checkbox.checked = isEnabled;

      const label = document.createElement('label');
      label.for = engine.id();
      label.name = engine.name();
      label.appendChild(checkbox);
      label.addEventListener('click', onInputChange);

      const span = document.createElement('span');
      span.innerText = engine.description();
      label.appendChild(span);

      form.appendChild(label);
    });
    
  }
}

constructOptions();