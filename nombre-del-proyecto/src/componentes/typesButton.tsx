import React, { useState } from 'react';
import useButtonStore from '../stores/buttonStore'; 
import usePromptStore from '../stores/prompStore'; 
import { sendMessageToTab } from '../utils/chromeUtils'; 

const TypesButtons: React.FC = () => {
  const clickedType = useButtonStore((state) => state.selectedButton); 
  const prompInfo = usePromptStore((state) => state.promptDescription); 
  const [selectedButton, setSelectedButton] = useState<string | undefined>(undefined);
  const setIsLoading = useButtonStore((state) => state.setIsLoading);

  const handleSubmit = () => {
    if ((clickedType === 'Gemini' || clickedType === 'ChatGPT') && selectedButton !== undefined) {
      setIsLoading(true); 
      setTimeout(() => {
        if (selectedButton === 'Reflection') {
          sendMessageToTab(`Please analyze the following programming problem: ${prompInfo}. After analyzing the error, kindly propose a solution. Additionally, provide feedback on the correctness of your answer and elucidate any discrepancies if present.`, clickedType);
        } else if (selectedButton === 'Tool Use') {
          sendMessageToTab(`As per discussions on various reputable forums such as Stack Overflow, GitHub Issues, LinkedIn, and other programming-related platforms, you are requested to address the following error(s) provided below: Error(s) Encountered:${prompInfo}. Your response should be thorough and well-informed, drawing insights from these platforms and any other relevant programming resources. Additionally, please specify the tools and methodologies you employ in your analysis and resolution.`, clickedType);
        }
      }, 5000); 
    }
  };

  return (
    <div className="mt-4 mb-4">
   
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-md text-white">
        <div className="flex items-center">
          <input
            type="radio"
            id="reflection"
            name="type"
            value="Reflection"
            checked={selectedButton === 'Reflection'}
            onChange={() => setSelectedButton('Reflection')}
            className="appearance-none rounded-full border-purple-500 w-5 h-5 mr-2 checked:bg-purple-500 checked:border-transparent border-2"
          />
          <label htmlFor="reflection" className="ml-2 mr-4">Reflection</label>

          <input
            type="radio"
            id="toolUse"
            name="type"
            value="Tool Use"
            checked={selectedButton === 'Tool Use'}
            onChange={() => setSelectedButton('Tool Use')}
            className="appearance-none rounded-full border-purple-500 w-5 h-5 mr-2 checked:bg-purple-500 checked:border-transparent border-2"
          />
          <label htmlFor="toolUse" className="ml-2">Tool Use</label>
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-4 ">  
        <button
          className={`bg-purple-500  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full items-center ${clickedType === 'Enviar' ? 'opacity-50' : ''}`}
          onClick={() => handleSubmit()}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default TypesButtons;
