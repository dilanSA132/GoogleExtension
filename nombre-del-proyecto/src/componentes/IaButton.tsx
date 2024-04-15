import useButtonStore from '../stores/buttonStore';

const ButtonComponent = () => {
  const { selectedButton, setSelectedButton } = useButtonStore();

  return (
    <div>
      <button
        className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mr-4 items-center ${
          selectedButton === 'Gemini' ? 'bg-gray-700' : ''
        }`}
        onClick={() => setSelectedButton('Gemini')}
      >
        Gemini
      </button>
      <button
        className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full items-center ${
          selectedButton === 'ChatGPT' ? 'bg-gray-700' : ''
        }`}
        onClick={() => setSelectedButton('ChatGPT')}
      >
        ChatGPT
      </button>
    </div>
  );
};

export default ButtonComponent;
