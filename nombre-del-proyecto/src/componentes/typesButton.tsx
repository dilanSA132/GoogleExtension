import { useState } from 'react';
import useButtonStore from '../stores/buttonStore'; 
import usePromptStore from '../stores/prompStore'; 

const TypesButtons = () => {
  const clickedType = useButtonStore((state) => state.selectedButton); 
  const prompInfo = usePromptStore((state) => state.promptDescription); 
  const [selectedButton, setSelectedButton] = useState<number | undefined>(undefined);

  const sendMessageToGemini = (prompt: string | undefined) => {
    chrome.tabs.create({ url: 'https://gemini.google.com/app', active: false }, (newTab) => {
      if (chrome.runtime.lastError) {
        console.error("Error al abrir la pestaña de Gemini:", chrome.runtime.lastError.message);
      } else {
        console.log("Pestaña de Gemini abierta con éxito:", newTab);
        let tabLoaded = false;
        const listener = function(tabId: number, changeInfo: chrome.tabs.TabChangeInfo) {
          if (tabId === newTab.id && changeInfo.status === 'complete') {
            console.log("La pestaña de Gemini ha cargado completamente.");
            tabLoaded = true;
            if (prompt && typeof newTab.id === 'number') {
              chrome.tabs.sendMessage(newTab.id, { prompt }, (response) => {
                if (chrome.runtime.lastError) {
                  console.error("Error al enviar el mensaje a Gemini:", chrome.runtime.lastError.message);
                } else {
                  console.log("Mensaje enviado con éxito a Gemini:", response);
                }
              });
            } else {
              console.error("Error: ID de pestaña no válido.");
            }
            chrome.tabs.onUpdated.removeListener(listener);
          }
        };
        chrome.tabs.onUpdated.addListener(listener);
        chrome.tabs.get(newTab.id!, (tab) => {
          if (tab.status === 'complete') {
            console.log("La pestaña de Gemini ya estaba cargada.");
            tabLoaded = true;
            if (prompt && typeof newTab.id === 'number') {
              chrome.tabs.sendMessage(newTab.id!, { prompt }, (response) => {
                if (chrome.runtime.lastError) {
                  console.error("Error al enviar el mensaje a Gemini:", chrome.runtime.lastError.message);
                } else {
                  console.log("Mensaje enviado con éxito a Gemini:", response);
                }
              });
            } else {
              console.error("Error: ID de pestaña no válido.");
            }
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
        setTimeout(() => {
          if (!tabLoaded) {
            console.log("La pestaña de Gemini tardó demasiado en cargar. Cancelando.");
            chrome.tabs.onUpdated.removeListener(listener);
          }
        }, 10000);
      }
    });
  };
  
  
  const handleSubmit = () => {
    console.log(`Button clicked with type: ${clickedType}`);
    console.log(`Prompt: ${prompInfo}`);
    console.log(selectedButton);
    if (clickedType === 'Gemini' && selectedButton !== undefined) {
      sendMessageToGemini(prompInfo);
    } else if(clickedType === 'ChatGPT') {
    }
  };

  const handleButtonClick = (type:any) => {
    setSelectedButton(type); 
  };

  return (
    <div className="mt-4">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 ${clickedType === 'Reflection' ? 'opacity-50' : ''}`}
        onClick={() => handleButtonClick('Reflection')}
      >
        Reflection
      </button>
      <button
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-4 ${clickedType === 'Tool Use' ? 'opacity-50' : ''}`}
        onClick={() => handleButtonClick('Tool Use')}
      >
        Tool Use
      </button>
      <div className="flex justify-center">  
        <button
          className={`mt-8 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full items-center ${clickedType === 'Enviar' ? 'opacity-50' : ''}`}
          onClick={() => handleSubmit()}
          style={{ background: 'linear-gradient(90deg, #FF0080 0%, #7928CA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default TypesButtons;
