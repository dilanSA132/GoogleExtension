// content.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Mensaje recibido desde la extensión:', message);
  });
  