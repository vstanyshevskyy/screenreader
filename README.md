# Basic screenreader with Google Text to Speech (TTS) API support 
This is super-simple screen reader that gets the list of focusable elements and text nodes on page load, prints the content to console and reads that content using either system speech synthesis or Google TTS API.

IMPORTANT: IT'S STILL WORK IN PROGRESS, SO YOU SHOULDN'T RELY ON IT

## Motivation
I speak ukrainian, and in my spare time I work on the website for ukrainian NGO. Unfortunately despite the efforts I put into web accessibility there, the content there is still not available to 100% of visitors, because all the OS except ChromeOS don't have Ukrainian TTS voice.
Give Google TTS API low prices and great quality of the speech synthesised I believe such reader has to be done.

## Developing
1. Fork
2. Run `yarn`
7. Run `yarn run start`
8. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.

## Packing
After the development of your extension run the command

```
$ NODE_ENV=production yarn run build
```
Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.
