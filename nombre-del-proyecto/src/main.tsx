import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import Header  from './componentes/header.tsx'
import IaButton from './componentes/IaButton.tsx'
import PromptText from './componentes/prompsText.tsx'
import TypesButtons from './componentes/typesButton.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Header />
    <div className="flex flex-col items-center justify-start h-screen mt-8">
      <IaButton />
      <PromptText />
      <TypesButtons />
    </div>
   
  </React.StrictMode>,
)
