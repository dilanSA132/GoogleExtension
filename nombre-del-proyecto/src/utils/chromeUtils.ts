export const sendMessageToTab = (prompt: string, clickedType: string) => {
  let url;
  if (clickedType === "Gemini") {
    url = "https://gemini.google.com/app";
  } else {
    url = "https://chat.openai.com";
  }

  chrome.tabs.create({ url, active: false }, (newTab) => {
    if (chrome.runtime.lastError) {
      console.error(
        `Error al abrir la pestaña (${url}):`,
        chrome.runtime.lastError.message
      );
    } else {
      console.log(`Pestaña abierta con éxito (${url}):`, newTab);

      const listener = function (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo
      ) {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.tabs.update(newTab.id, { active: true });

          console.log(`La pestaña ha cargado completamente (${url}).`);

          if (prompt && typeof newTab.id === "number") {
            chrome.tabs.sendMessage(newTab.id, { prompt }, (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  `Error al enviar el mensaje a la pestaña (${url}):`,
                  chrome.runtime.lastError.message
                );
              } else {
                console.log(
                  `Mensaje enviado con éxito a la pestaña (${url}):`,
                  response
                );
              }
            });
          } else {
            console.error(
              `Error: ID de pestaña no válido o prompt vacío (${url}).`
            );
          }
          chrome.tabs.onUpdated.removeListener(listener);
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    }
  });
};
