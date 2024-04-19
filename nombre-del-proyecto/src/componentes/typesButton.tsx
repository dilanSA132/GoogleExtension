import React, { useState } from 'react';
import useButtonStore from '../stores/buttonStore'; 
import usePromptStore from '../stores/prompStore'; 
import { sendMessageToTab } from '../utils/chromeUtils'; 

const TypesButtons: React.FC = () => {
  const clickedType = useButtonStore((state) => state.selectedButton); 
  const prompInfo = usePromptStore((state) => state.promptDescription); 
  const [selectedButton, setSelectedButton] = useState<string | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const setIsLoading = useButtonStore((state) => state.setIsLoading);
  const handleSubmit = () => {
    if ((clickedType === 'Gemini' || clickedType === 'ChatGPT') && selectedButton !== undefined) {
      setIsLoading(true); 
      setTimeout(() => {
        let message;
        if (selectedLanguage === "English") {
          if (selectedButton === 'Reflection') {
            message = `Please analyze the following programming problem: ${prompInfo}. After analyzing the error, kindly propose a solution. Additionally, provide feedback on the correctness of your answer and elucidate any discrepancies if present. Please answer in English`;
          } else {
            message = `As per discussions on various reputable forums such as Stack Overflow, GitHub Issues, LinkedIn, and other programming-related platforms, you are requested to address the following error(s) provided below: Error(s) Encountered:${prompInfo}. Your response should be thorough and well-informed, drawing insights from these platforms and any other relevant programming resources. Additionally, please specify the tools and methodologies you employ in your analysis and resolution. Please answer in Spanish`;
          }
        } else {
          if (selectedButton === 'Reflection') {
            message = `Por favor, analiza el siguiente problema de programación: ${prompInfo}. Después de analizar el error, por favor propón una solución. Además, proporciona retroalimentación sobre la corrección de tu respuesta y aclara cualquier discrepancia si es necesario. Por favor responde en español`;
          } else {
            message = `Según discusiones en varios foros de renombre como Stack Overflow, GitHub Issues, LinkedIn y otras plataformas relacionadas con la programación, se te solicita que abordes el(s) siguiente(s) error(es) proporcionado(s) a continuación: Error(es) encontrados:${prompInfo}. Tu respuesta debe ser exhaustiva y bien informada, extrayendo información de estas plataformas y de cualquier otro recurso de programación relevante. Además, especifica las herramientas y metodologías que utilizas en tu análisis y resolución. Por favor responde en español`;
          }
        }
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
          onClick={() => handleSubmit()} > Enviar
        </button>
      </div>
    </div>
  );
};
export default TypesButtons;
