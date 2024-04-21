// TypesButtons.tsx

import React, { useState } from 'react';
import useButtonStore from '../stores/buttonStore'; 
import usePromptStore from '../stores/prompStore'; 
import { sendMessageToTab } from '../utils/chromeUtils'; 
import { saveDataToAirtable } from '../services/airtableregister';
import { getIPAddress } from '../services/ipAdreess';
import { constructEnglishMessage, constructSpanishMessage } from '../utils/messageUtils';
const TypesButtons: React.FC = () => {
  const clickedType = useButtonStore((state) => state.selectedButton); 
  const prompInfo = usePromptStore((state) => state.promptDescription); 
  const [selectedButton, setSelectedButton] = useState<string | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const setIsLoading = useButtonStore((state) => state.setIsLoading);
  const handleSubmit = async() => {
    if ((clickedType === 'Gemini' || clickedType === 'ChatGPT') && selectedButton !== undefined) {
      setIsLoading(true);
      setTimeout(async () => {
        let message;
        if (selectedLanguage === "English") {
          message = constructEnglishMessage(selectedButton, prompInfo);
        } else {
          message = constructSpanishMessage(selectedButton, prompInfo);
        }
        const ip = await getIPAddress();
        const dataToSave = { Promp: message, WorkFlow: selectedButton, IA: clickedType, Ip: ip, Idiom: selectedLanguage };
        saveDataToAirtable(dataToSave);
        sendMessageToTab(message, clickedType);
      }, 5000); 
    }
  };
  return (
    <div className="mt-2 mb-4">
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-md text-white">
        <div className="flex items-center">
          <input
            type="radio" id="reflection" name="type" value="Reflection"  checked={selectedButton === 'Reflection'}
            onChange={() => setSelectedButton('Reflection')}  
            className="appearance-none rounded-full border-purple-500 w-5 h-5 mr-2 checked:bg-purple-500 checked:border-transparent border-2" />
          <label htmlFor="reflection" className="ml-2 mr-4 mb-2">Reflection</label>
          <input type="radio" id="toolUse"  name="type" value="Tool Use" checked={selectedButton === 'Tool Use'}
            onChange={() => setSelectedButton('Tool Use')}
            className="appearance-none rounded-full border-purple-500 w-5 h-5 mr-2 checked:bg-purple-500 checked:border-transparent border-2" />
          <label htmlFor="toolUse" className="ml-2 mb-2">Tool Use</label>
        </div>
        <span className="mr-2 mt-4">Language:</span>
        <select className="mr-2 mt-1 bg-purple-500 text-white"value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Spanish">Español</option>
        </select>
      </div>
      <div className="flex justify-center mt-1 mb-4 ">  
        <button
          className={`bg-purple-500  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full items-center ${clickedType === 'Enviar' ? 'opacity-50' : ''}`}
          onClick={() => handleSubmit()} > SEND
        </button>
      </div>
    </div>
  );
};
export default TypesButtons;
