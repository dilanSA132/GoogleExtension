
export const sendMessageToTab = async (prompt: string, clickedType: string) => {
  let url;
  if (clickedType === "Gemini") {
    url = "https://gemini.google.com/app";
  } else {
    url = "https://chat.openai.com";
  }

  chrome.tabs.create({ url, active: false }, async (newTab) => {
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
            chrome.tabs.sendMessage(newTab.id, { prompt }, async (response) => {
              alert(`Mensaje enviado con éxito a la pestaña (${url}): ${response}`);
              if (response["Answer"]) {
                const answers = JSON.stringify(response["Answer"]);
                console.log("Respuesta ", answers);
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
