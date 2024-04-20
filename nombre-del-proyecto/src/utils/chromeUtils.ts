export const sendMessageToTab = (prompt: string, clickedType: string) => {
  let url;
  if (clickedType === "Gemini") {
    url = "https://gemini.google.com/app";
  } else {
    url = "https://chat.openai.com";
  }
  chrome.tabs.create({ url, active: false }, (newTab) => {
    if (chrome.runtime.lastError) {
      alert(`Error: ${chrome.runtime.lastError.message}`);
    } else {
      const listener = function (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo
      ) {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.tabs.update(newTab.id, { active: true });
          if (prompt && typeof newTab.id === "number") {
            chrome.tabs.sendMessage(newTab.id, { prompt }, (response) => {
              if (chrome.runtime.lastError) {
                alert(`Error al enviar el mensaje a la pestaña (${url}): ${chrome.runtime.lastError.message}`);
              } else {
                alert(`Mensaje enviado con éxito a la pestaña (${url}): ${response}`);
              }
            });
          } else {
            alert(`Error: ID de pestaña no válido o prompt vacío (${url}).`);
          }
          chrome.tabs.onUpdated.removeListener(listener);
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    }
  });
};
