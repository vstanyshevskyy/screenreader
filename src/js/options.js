import "../css/options.css";

const $saveButton = document.querySelector('#save_settings');
const $apiKey = document.querySelector('#api_key');
chrome.storage.sync.get(['api_key'], ({ api_key = "" }) => {
  $apiKey.value = api_key;
});
$saveButton.addEventListener('click', function(e) {
  e.preventDefault();
  const key = $apiKey.value.trim();
  chrome.storage.sync.set({ api_key: key }, function() {
    console.log('set api_key ' + key);
  })
});