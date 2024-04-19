import useButtonStore from '../stores/buttonStore'

const Header = () => {
  const selectedButton = useButtonStore((state) => state.selectedButton);

  return (
    <header className="bg-blue-500 text-white p-4 flex items-center">
      <div>
        <h1 className="text-xl font-bold mr-4">My Google Extension</h1>
      </div>
      <div className="ml-auto">
        <h1 className="text-xl font-bold">{selectedButton || "Ai powered"}</h1>
      </div>
    </header>
  );
};

export default Header;
