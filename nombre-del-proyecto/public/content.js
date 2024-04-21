
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.prompt) {
    if (window.location.hostname === 'gemini.google.com') {
     handleGeminiPrompt(message.prompt);
    } else {
      handleRegularPrompt(message.prompt);
    }
    sendResponse({ received: true , "Answer": "results"});
  }
});
function handleGeminiPrompt(prompt) {
  const richTextarea = document.querySelector('rich-textarea');
  if (richTextarea) {
    const qlEditor = richTextarea.querySelector('.ql-editor');
    qlEditor.innerHTML = prompt;
    setTimeout(() => {
      const boton = document.querySelector('button[aria-label="Enviar mensaje"]');
      if (boton) {
        boton.click();
        console.log("click");
      } else {
        console.error("No se encontró el botón en la página de Gemini.");
      }
    }, 500);
    setTimeout(() => {
      const result = document.querySelector('.model-response-text.ng-star-inserted');
      if (result) {
        results = result.innerText;
        console.log("Resultados obtenidos", results);
      }
    }, 10000);
  }
}


function handleRegularPrompt(prompt) {
  const chatTextarea = document.getElementById('prompt-textarea');
  if (chatTextarea) {
    setTimeout(() => {
      chatTextarea.value = prompt;
      console.log("Entrada");
      const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      chatTextarea.dispatchEvent(inputEvent);
    }, 500);
    setTimeout(() => {
      const sendButton = document.querySelector('button[data-testid="send-button"]');
      if (sendButton) {
        sendButton.click();
        console.log("Botón de enviar clicado");
      } else {
        console.error("No se encontró el botón de enviar.");
      }
    }, 1500);
    
  }
}
