import { useState } from 'react';
import useButtonStore from '../stores/buttonStore'; 
import usePromptStore from '../stores/prompStore'; 

const TypesButtons = () => {
  const clickedType = useButtonStore((state) => state.selectedButton); 
  const prompInfo = usePromptStore((state) => state.promptDescription); 
  const [selectedButton, setSelectedButton] = useState<number | undefined>(undefined);

  const sendMessageToGemini = (prompt: string | undefined) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && typeof activeTab.id === 'number') {
        chrome.tabs.sendMessage(activeTab.id, { prompt }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error al enviar el mensaje:", chrome.runtime.lastError.message);
          } else {
            console.log("Mensaje enviado con éxito:", response);
          }
        });
      } else {
        console.error("Error: No se pudo obtener el ID de la pestaña activa.");
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
      // Lógica para enviar el prompt a ChatGPT
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
      <button
        className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mr-4 ${clickedType === 'Planning' ? 'opacity-50' : ''}`}
        onClick={() => handleButtonClick('Planning')}
      >
        Planning
      </button>
      <button
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4 ${clickedType === 'Multi-Agent' ? 'opacity-50' : ''}`}
        onClick={() => handleButtonClick('Multi-Agent')}
      >
        Multi-Agent
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
