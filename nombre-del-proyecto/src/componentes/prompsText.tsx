import React from 'react';
import usePromptStore from '../stores/prompStore'; 

const PromptText = () => {
  const [promptDescription, setPromptDescription] = usePromptStore((state) => [state.promptDescription, state.setPromptDescription]);

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
    const description = event.target.value;
    setPromptDescription(description); 
  };

  return (
    <div className="mt-4 w-full">
      <label className="text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="prompt">
        Write your prompt here to send:
      </label>
      <textarea
        id="prompt"
        className="shadow appearance-none border rounded w-full py-2 px-3 ml-3 mr-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows={15}
        placeholder="Enter your prompt here..."
        value={promptDescription} 
        onChange={handlePromptChange} 
      ></textarea>
    </div>
  );
};

export default PromptText;
