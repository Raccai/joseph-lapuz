import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ProjectsContextProvider } from "./context/ProjectsContext";
import { AuthContextProvider } from './context/AuthContext';
import { AboutContextProvider } from './context/AboutContext';
import { CardsContextProvider } from './context/CardsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CardsContextProvider>
        <AboutContextProvider>
          <ProjectsContextProvider>
            <App />
          </ProjectsContextProvider>
        </AboutContextProvider>
      </CardsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);