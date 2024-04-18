chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.prompt) {
    console.log("Mensaje recibido desde la extensión:", message);
    const editor = document.querySelector('.ql-editor.ql-blank.textarea');
    if (editor) {
      editor.innerHTML = message.prompt;
      setTimeout(() => {
        const boton = document.querySelector('button[aria-label="Enviar mensaje"]');
        if (boton) {
          boton.click();
          console.log("click");
        } else {
          console.error("No se encontró el botón en la página de Gemini.");
        }
      }, 500); 
    } else {
      console.error("No se encontró el editor de texto en la página de Gemini.");
    }
    sendResponse({ received: true });
  }
});
