import React from 'react';
import usePromptStore from '../stores/prompStore'; 

const PromptText = () => {
  const [promptDescription, setPromptDescription] = usePromptStore((state) => [state.promptDescription, state.setPromptDescription]);
  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
    const description = event.target.value;
    setPromptDescription(description); 
  };
  return (
    <div className="flex justify-center mt-2 mr-8">
      <div className="mt-4 w-full">
      <label className="text-white text-sm font-bold mb-2 ml-3" htmlFor="prompt">
          Write your prompt here to send:
        </label>
        <textarea
          id="prompt"
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 ml-3 bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-md text-white"
          rows={15}    
          placeholder="Enter your prompt here..."
          value={promptDescription} 
          onChange={handlePromptChange} 
        ></textarea>
      </div>
    </div>
  );
};
export default PromptText;
