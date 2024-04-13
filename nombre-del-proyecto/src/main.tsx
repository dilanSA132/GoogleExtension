import React from 'react'
import ReactDOM from 'react-dom/client'
import Counter from './componentes/count.tsx'
import './styles/index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="bottom-0"><Counter/></div>
    <p className="text-red-500">Este es un componente con estilos de Tailwind CSS.</p>    
  </React.StrictMode>,
)
