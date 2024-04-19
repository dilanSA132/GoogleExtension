import React from 'react';
import ReactDOM from 'react-dom';
import useButtonStore from './stores/buttonStore';
import Header from './componentes/header.tsx';
import IaButton from './componentes/IaButton.tsx';
import PromptText from './componentes/prompsText.tsx';
import './styles/index.css';
import TypesButtons from './componentes/typesButton.tsx';
import SkeletonHeader from './utils/skeletonHeader.tsx';

const App = () => {
  const isLoading = useButtonStore((state) => state.isLoading);

  return (
    <React.StrictMode>
 
      <Header />
      {isLoading && <SkeletonHeader />}
      <div className="flex flex-col items-center justify-start h-screen mt-8 ml-4">
        {!isLoading && <IaButton />}
        {!isLoading && <PromptText />}
        {!isLoading && <TypesButtons />}
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
