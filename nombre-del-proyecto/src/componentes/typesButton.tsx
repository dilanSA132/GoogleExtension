import { useState } from 'react';
import useButtonStore from '../stores/buttonStore'; 
import usePromptStore from '../stores/prompStore'; 
import { sendMessageToTab } from '../utils/chromeUtils'; 

const TypesButtons: React.FC = () => {
  const clickedType = useButtonStore((state) => state.selectedButton); 
  const prompInfo = usePromptStore((state) => state.promptDescription); 
  const [selectedButton, setSelectedButton] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    console.log(clickedType);
    if ((clickedType === 'Gemini' || clickedType === 'ChatGPT') && selectedButton !== undefined) {
      if (selectedButton === 'Reflection') {
        sendMessageToTab(`Please analyze the following programming problem: ${prompInfo}. After analyzing the error, kindly propose a solution. Additionally, provide feedback on the correctness of your answer and elucidate any discrepancies if present.`, clickedType);
      } else if (selectedButton === 'Tool Use') {
        sendMessageToTab(`As per discussions on various reputable forums such as Stack Overflow, GitHub Issues, LinkedIn, and other programming-related platforms, you are requested to address the following error(s) provided below: Error(s) Encountered:${prompInfo}. Your response should be thorough and well-informed, drawing insights from these platforms and any other relevant programming resources. Additionally, please specify the tools and methodologies you employ in your analysis and resolution.`, clickedType);
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <input
          type="radio"
          id="reflection"
          name="type"
          value="Reflection"
          checked={selectedButton === 'Reflection'}
          onChange={() => setSelectedButton('Reflection')}
        />
        <label htmlFor="reflection" className="ml-2 mr-4">Reflection</label>

        <input
          type="radio"
          id="toolUse"
          name="type"
          value="Tool Use"
          checked={selectedButton === 'Tool Use'}
          onChange={() => setSelectedButton('Tool Use')}
        />
        <label htmlFor="toolUse" className="ml-2">Tool Use</label>
      </div>

      <div className="flex justify-center mt-8">  
        <button
          className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full items-center ${clickedType === 'Enviar' ? 'opacity-50' : ''}`}
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
